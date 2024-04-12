import React from "react"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { motion } from "framer-motion"
import { Message } from "../common-types"
import ChatMessage from "./chat-message"

type ChatProps = {
  messages: Message[]
  isLoading: boolean
  options: string[]
  handleSubmit: any
}

const Chat = ({ messages, isLoading, options, handleSubmit }: ChatProps) => {
  const messagesEndRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  })

  return (
    <Paper
      sx={{ height: "100dvh", maxHeight: "800px", maxWidth: "800px", width: "100%" }}
      elevation={3}
    >
      <Grid container sx={{ height: "100dvh", overflow: "auto" }}>
        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="column"
          sx={{ height: { sm: "66%", md: "66%" }, maxHeight: { sm: "535px" } }}
          overflow="auto"
        >
          {messages.map((message, index) => (
            <motion.div
              key={index}
              className={`message-bubble-container`}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <ChatMessage key={index} text={message.text} isAI={message.isAI} />
            </motion.div>
          ))}
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <ChatMessage isLoading={isLoading} text="Thinking" isAI={true} />{" "}
            </motion.div>
          ) : null}
          <div ref={messagesEndRef} />
        </Grid>

        <Grid
          item
          xs={12}
          alignSelf="flex-end"
          sx={{ height: { sm: "100%", md: "33%" }, maxHeight: { sm: "535px" } }}
        >
          <Typography variant="h6" textAlign="center">
            Select your Follow-up
          </Typography>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} justifyContent="center" alignItems="center" display="flex">
              <ToggleButtonGroup
                orientation="vertical"
                exclusive
                onChange={(evt, message) => {
                  handleSubmit({ message: options.findIndex((o) => message), userText: message })
                }}
              >
                {options.map((option, index) => (
                  <ToggleButton
                    value={option}
                    disabled={isLoading}
                    key={index}
                    sx={{
                      backgroundColor: "rgba(33, 33, 33, 0.33)",
                      border: "3px solid #e1f5fe",
                      color: "#212121",
                    }}
                  >
                    {option}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Chat
