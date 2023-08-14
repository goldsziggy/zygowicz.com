import React, { useState, useEffect } from "react"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import InputAdornment from "@mui/material/InputAdornment"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import companies from "../companies.json"

const CompanyInput = ({ setCompanyValue }) => {
  const [value, setValue] = useState("N/A")

  useEffect(() => {
    const index = companies.findIndex((company) => company === value)
    setCompanyValue(index)
  }, [value])

  return (
    <Autocomplete
      disablePortal
      id="company-input"
      options={companies}
      onChange={(c, val) => {
        setValue(val || "N/A")
      }}
      value={value}
      renderInput={(params) => (
        <TextField variant="standard" {...params} label="Company Name" value={value} />
      )}
    />
  )
}

export default CompanyInput
