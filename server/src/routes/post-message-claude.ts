import Anthropic from "@anthropic-ai/sdk"
import { ChatGPTAPI } from "chatgpt"
import companies from "../companies.json" assert { type: "json" }
import getSystemMessage from "../system-message.js"
import { getData, setData } from "../utils/data.js"

const anthropic = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"], // This is the default and can be omitted
})

const getMessage = (message, persona) => {
  // if message is a number
  const optionsMessage =
    ' The options array MUST be 3 generated possible follow-up responses asking for information about Matthew Zygowicz based on the "textResponse".'

  if (Number.isInteger(message)) {
    const companyName = companies[message] || ""
    const companyContext = `The individual you are messaging to works for the company: ${companyName}.`

    switch (persona) {
      case "employee":
        return `${companyContext}. textReponse: . You WILL intiate by greeting the person and expressing excitement for the new potential co-worker while keeping within the character limit.${optionsMessage}`
      case "family":
        return `${companyContext}. textReponse: . You WILL intiate by greeting the person and expressing excitement for Matthew while keeping within the character limit.${optionsMessage}`
      case "technologist":
        return `${companyContext}. textReponse:  You WILL intiate by greeting the person and by expressing excitement for Matthew while keeping within the character limit. ${optionsMessage}`
      case "recruiter":
      default:
        return `${companyContext}. textReponse: A recruiter from ${companyName} that has come across Matthew's resume, you WILL intiate by greeting the person and by hyping up matthew  while keeping within the 250 character limit. ${optionsMessage}`
      // return `${companyContext}. textReponse: You are direct messaging a co-worker from the company that has come across Matthew's resume, you WILL intiate by greeting the person and by expressing excitement for the canidate  while keeping within the character limit. ${optionsMessage}`
    }
  }

  return `The individual replies with: ${message}.  textReponse: Reply answering the question keeping your answer less then 250 characters. ${optionsMessage}`
}

const generatedMessage = async (prompt: string, systemMessage: string, attempts: number) => {
  const message = await anthropic.messages.create({
    system: systemMessage,
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
    model: "claude-3-haiku-20240307",
  })
  console.log(message)
  // return message
  const { textResponse, options } = JSON.parse(message.content[0].text)
  setData(message.id, options, attempts)

  return { text: textResponse, options, parentId: message.id }
}

// @TODO: add logging?  But should I... its not exactly a production service..
const postMessage = async (req, res) => {
  const { message, persona, parentId: parentMessageId } = req.body
  try {
    const systemMessage = getSystemMessage(persona)

    // == This block is for when the user is just starting == //
    if (!parentMessageId) {
      const msg = getMessage(message, persona)

      const { text, options, parentId } = await generatedMessage(msg, systemMessage, 1)

      return res.json({ text, options, parentId })
    }
    // == This block is for when the user replies to a previous message == //
    const data = getData(parentMessageId)
    if (!data || data.expires <= Date.now() || data.attempts > 4) {
      throw new Error("No data found for your responses")
    }

    const inputText = data.options[message % data.options.length]
    if (!inputText) {
      throw new Error("No input text found")
    }

    const msg = getMessage(inputText, persona)
    const { text, options, parentId } = await generatedMessage(
      msg,
      systemMessage,
      data.attempts + 1
    )
    return res.json({ text, options, parentId })
  } catch (error) {
    console.log(error)
    return res.status(500).json({})
  }
}

export default postMessage
