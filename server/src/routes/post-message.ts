import { ChatGPTAPI } from "chatgpt"
import companies from "../companies.json" assert { type: "json" }
import getSystemMessage from "../system-message.js"
import { getData, setData } from "../utils/data.js"

const openAIKey = process.env.OPENAI_API_KEY

const getMessage = (message) => {
  // if message is a number
  if (Number.isInteger(message)) {
    const companyName = companies[message] || ""
    return `The individual you talking to works for the company: ${companyName}.`
  }

  return `The individual replies with: ${message}.  Please reply answering the question keeping your answer less then 300 characters.`
}
const getUserOptions = async (api, parentMessageId, systemMessage) => {
  const conversation = await api.sendMessage(
    "Given the above message, generate 3 possible responses asking for information that the individual you are talking to.  Each response will be less than 10 words long, and shall be seperated by a new line.",
    {
      parentMessageId,
      systemMessage,
    }
  )

  const { text } = conversation

  console.log({ text })
  return text.split("\n")
  // if (/(1,2,3)/.exec(text)) return text.split(",")
}

const postMessage = async (req, res) => {
  const { message, persona, parentId: parentMessageId } = req.body
  const api = new ChatGPTAPI({
    apiKey: openAIKey,
  })
  const systemMessage = getSystemMessage(persona)

  // == This block is for when the user is just starting == //
  if (!parentMessageId) {
    const msg = getMessage(message)
    const conversation = await api.sendMessage(msg, {
      parentMessageId,
      systemMessage,
    })

    const { text, id } = conversation
    const options = await getUserOptions(api, parentMessageId, systemMessage)
    setData(id, options, 1)
    console.log({ id, options })
    return res.json({
      text,
      options,
      parentId: id,
    })
  }
  // == This block is for when the user replies to a previous message == //
  const data = getData(parentMessageId)
  console.log({ data })
  if (!data || data.expires <= Date.now() || data.attempts > 4) {
    throw new Error("No data found for your responses")
  }

  const inputText = data.options[message % data.options.length]
  if (!inputText) {
    throw new Error("No input text found")
  }
  const msg = getMessage(inputText)
  const conversation = await api.sendMessage(msg, {
    parentMessageId,
    systemMessage,
  })
  const { text, id } = conversation
  const options = await getUserOptions(api, parentMessageId, systemMessage)
  setData(id, options, data.attempts + 1)
  return res.json({
    text,
    options,
    parentId: id,
  })
}

export default postMessage
