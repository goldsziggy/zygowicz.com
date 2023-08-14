import React from "react"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import AccountBoxIcon from "@mui/icons-material/AccountBox"
import { motion } from "framer-motion"
import { Message } from "../common-types"

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
export default ChatMessage
