import axios from "axios"

const DOMAIN = process.env.REACT_APP_DOMAIN || "http://localhost:8080"
const URL = "/api/message"

type PostChatMessageProps = {
  message: number
  persona: string
  parentId: string
  isDebug?: boolean
}

type PostChatMessageResponse = {
  text: string
  options: string[]
  parentId: string
}

const mockData = {
  text: "Matthew Zygowicz should be hired for the Engineering Management role because he has a successful track record of managing high-performing teams, implementing strategic solutions, and mitigating risks. He is skilled in data-driven decision-making, collaboration with product teams, and mentorship. Additionally, he has experience leading engineer book clubs, coaching test engineers, and modernizing monitoring infrastructure. Matthew's expertise and passion for continuous improvement make him a valuable addition to the team.",
  options: [
    "What specific information do you need about Matthew? ",
    "Can you please clarify what details you're looking for? ",
    "Is there something specific you want to know about Matthew's qualifications?",
  ],
  parentId: "chatcmpl-7nC0yIHXoveGNKojYTMTE1SLGkLbN",
}

export const postChatMessage = async ({
  parentId,
  persona,
  message,
  isDebug,
}: PostChatMessageProps): Promise<PostChatMessageResponse> => {
  if (isDebug) {
    return new Promise((resolve) => setTimeout(() => resolve(mockData), 5000))
  }
  return axios.post(DOMAIN + URL, { message, persona, parentId }).then(({ data }) => {
    const { text, options, parentId } = data
    return { text, options, parentId }
  })
}
