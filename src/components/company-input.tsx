import React, { useState, useEffect } from "react"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import companies from "../companies.json"

const CompanyInput = ({ setCompanyValue, foundCompany = "N/A" }) => {
  const [value, setValue] = useState(foundCompany)

  useEffect(() => {
    setValue(foundCompany)
  }, [foundCompany])

  useEffect(() => {
    const index = companies.findIndex((company) => company === value)
    setCompanyValue(index)
  }, [value, setCompanyValue])

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
