import React, { useState } from "react"
import Grid from "@mui/material/Grid" // Grid version
import HelpIcon from "@mui/icons-material/Help"
import TopBar from "./components/topbar"
import Chat from "./components/chat"
import MeImage from "./me.jpg"
import IntroModal from "./components/intro-modal"
import ErrorModal from "./components/error-modal"
import HelpModal from "./components/help-modal"
import { postChatMessage } from "./services"
import { Message } from "./common-types"

// @TODO: if I have time/care to, this should really be using React Context
function App() {
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [options, setOptions] = useState<string[]>([])
  const [persona, setPersona] = useState("recruiter")
  const [parentId, setParentId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)

  const handleSubmit = async ({ message, userText }) => {
    setTimeout(() => setIsLoading(true), 250)
    setIsIntroModalOpen(false)
    if (userText) {
      setMessages([...messages, { text: userText, isAI: false }])
    }
    await postChatMessage({ message, persona, parentId, isDebug: false })
      .then(({ text, options, parentId }) => {
        console.log({ text, options, parentId })
        if (userText) {
          setMessages([...messages, { text: userText, isAI: false }, { text, isAI: true }])
        } else {
          setMessages([...messages, { text, isAI: true }])
        }
        setOptions(options)
        setIsLoading(false)
        setParentId(parentId)
      })
      .catch((err) => {
        setIsLoading(false)
        setIsError(true)
      })
  }

  return (
    <>
      <IntroModal
        handleSubmit={handleSubmit}
        open={isIntroModalOpen}
        persona={persona}
        setPersona={setPersona}
      />
      <ErrorModal open={isError} />
      <HelpModal open={isHelpOpen} handleClose={setIsHelpOpen} />
      <HelpIcon
        sx={{
          position: "fixed",
          top: "4.5rem",
          left: "1rem",
          pointer: "cursor",
        }}
        onClick={() => setIsHelpOpen(true)}
      />
      <Grid container spacing={2} height="100%" justifyContent="center">
        <Grid item xs={12}>
          <TopBar avatarUrl={MeImage} resumeName="Matthew Zygowicz" />
        </Grid>
        <Grid item xs={12} sm={8} height="80%" display="flex" justifyContent="center">
          <Chat
            isLoading={isLoading}
            options={options}
            messages={messages}
            handleSubmit={handleSubmit}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App
