import React from "react"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import CompanyInput from "./company-input"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  "max-width": 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

const IntroModal = ({ open, handleSubmit, persona, setPersona }) => {
  const [companyValue, setCompanyValue] = React.useState("")

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
                GPT Assistant Form
              </Typography>
            </Grid>
            <Grid item xs={12} mt="1rem">
              <Typography id="transition-modal-description" variant="caption">
                This <strong>Resume/Portfolio site</strong> is driven by <strong>ChatGPT</strong>.
                As such you can add additional context if you'd like! Please fill out the profile
                info of who my AI Assistant is talking to.
              </Typography>
            </Grid>
            <Grid item xs={12} mt="4rem">
              <CompanyInput setCompanyValue={setCompanyValue} />
            </Grid>
            <Grid item xs={12} mt="2rem">
              <Typography mb="1rem" variant="body2">
                Persona/Job Profile:
              </Typography>
              <ToggleButtonGroup
                color="primary"
                value={persona}
                exclusive
                onChange={(evt, persona) => setPersona(persona)}
                aria-label="Platform"
              >
                <ToggleButton value="recruiter">Recruiter</ToggleButton>
                <ToggleButton value="employee">Employee</ToggleButton>
                <ToggleButton value="technologist">Technologist</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end" mt="4rem">
              <Button
                onClick={() =>
                  handleSubmit({ message: companyValue, persona: persona || "recruiter" })
                }
              >
                Skip
              </Button>
              <Button
                onClick={() =>
                  handleSubmit({ message: companyValue, persona: persona || "recruiter" })
                }
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  )
}

export default IntroModal
