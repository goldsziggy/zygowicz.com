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

const ErrorModal = ({ open }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      // onClose={handleClose}
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
                Oops! Error Encountered.
              </Typography>
            </Grid>
            <Grid item xs={12} mt="1rem">
              <Typography id="transition-modal-description" variant="caption" display="block">
                This server is running on minimum resources for cost-saving, and the error can be
                due to either an unexpected response from ChatGPT, or simply my credit limit ran
                out.
              </Typography>

              <Typography
                id="transition-modal-description"
                variant="caption"
                mt="2rem"
                display="block"
              >
                Please check out <a href="linkedin.com/in/matt-zygowicz">LinkedIn</a> or{" "}
                <a href="github.com/goldsziggy">GitHub</a> and let me know if its having issues, or
                simply to remark how cool of an idea this is
              </Typography>

              <Typography
                id="transition-modal-description"
                variant="caption"
                display="block"
                mt="2rem"
              >
                Please refresh the page, or click Reload below to refresh and try again.
              </Typography>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end" mt="4rem">
              <Button
                onClick={() => {
                  window.location.reload()
                }}
              >
                Refresh
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  )
}

export default ErrorModal
