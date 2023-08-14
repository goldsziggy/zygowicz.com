import React from "react"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

const style = {
  position: "absolute" as "absolute",
  top: { xs: "10%", sm: "50%" },
  left: { xs: "10%", sm: "50%" },
  transform: { xs: "translate(-5%, -5%)", sm: "translate(-50%, -50%)" },
  "max-width": 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

const ErrorModal = ({ open, handleClose }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => handleClose(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Grid container>
            <Grid item xs={12}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                What is this?
              </Typography>
            </Grid>
            <Grid item xs={12} mt="1rem">
              <Typography id="transition-modal-description" variant="caption" display="block">
                This experience leverages a ChatGPT Microservice to pull out a hypothetical
                convesation between a potentail persona and someone to act as a advocate/hype-person
                for me.
              </Typography>

              <Typography
                id="transition-modal-description"
                variant="caption"
                display="block"
                mt="2rem"
              >
                <strong>If its ChatGPT, why can't I ask my own questions?</strong>
                <br />
                Free-form text is actually a lazy design pattern. While it is cool to be free-form;
                it actually shows that the developer/designer did not know how they wanted their
                user to interact with the GenAI.
              </Typography>

              <Typography
                id="transition-modal-description"
                variant="caption"
                display="block"
                mt="2rem"
              >
                <strong>So then why does it look like a chat?</strong>
                <br />
                My goal here isn't to hide/mask that it is ChatGPT, but infact emphasize that. So I
                give you a chat-box with a starter prompt and guided help.
              </Typography>

              <Typography
                id="transition-modal-description"
                variant="caption"
                display="block"
                mt="2rem"
              >
                <strong>Can I see the code for this?</strong>
                <br />
                Sure thing! Feel free to check it out on{" "}
                <a href="https://github.com/goldsziggy/zygowicz.com">GitHub</a>
              </Typography>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end" mt="4rem">
              <Button
                onClick={() => {
                  handleClose(false)
                }}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  )
}

export default ErrorModal
