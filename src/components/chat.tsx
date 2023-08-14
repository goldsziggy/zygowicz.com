import React from "react"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import AccountBoxIcon from "@mui/icons-material/AccountBox"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { motion } from "framer-motion"

import { Message } from "../common-types"

type ChatProps = {
  messages: Message[]
  isLoading: boolean
  options: string[]
  handleSubmit: any
}

// type ChatMessageProps extends Message type
interface ChatMessageProps extends Message {
  isLoading?: boolean
}

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "100%",
  },
}
const loadingCircleTransition = {
  duration: 0.75,
  yoyo: Infinity,
  repeat: Infinity,
  ease: "linear",
}
const loadingContainer = {
  width: "2rem",
  height: "2rem",
  display: "flex",
  margin: "auto",
  justifyContent: "space-around",
}

const loadingCircle = {
  display: "block",
  width: "0.5rem",
  height: "0.5rem",
  backgroundColor: "black",
  borderRadius: "0.25rem",
}

const ChatMessage = ({ text, isAI, isLoading }: ChatMessageProps) => {
  return (
    <Grid container mt=".5rem" justifyContent={isAI ? "flex-start" : "flex-end"}>
      {isAI ? (
        <Grid item xs={2} justifyContent="center" alignItems="center" display="flex">
          <SmartToyIcon />
        </Grid>
      ) : null}
      <Grid item xs={9} display="flex" flexGrow={1}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
          {isLoading ? (
            <motion.div
              style={loadingContainer}
              variants={loadingContainerVariants}
              initial="start"
              animate="end"
            >
              <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
              />
              <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
              />
              <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
              />
            </motion.div>
          ) : null}
        </Paper>
      </Grid>
      {!isAI ? (
        <Grid item xs={2} justifyContent="center" alignItems="center" display="flex">
          <AccountBoxIcon />
        </Grid>
      ) : null}
    </Grid>
  )
}

const Chat = ({ messages, isLoading, options, handleSubmit }: ChatProps) => {
  // building a chat box with Material UI
  const messagesEndRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  })

  return (
    <Paper sx={{ height: "100%" }} elevation={3}>
      <Grid container height="100%">
        <Grid item xs={12} display="flex" flexDirection="column" height="100%" overflow="auto">
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

        <Grid item xs={12} alignSelf="flex-end" sx={{}}>
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
