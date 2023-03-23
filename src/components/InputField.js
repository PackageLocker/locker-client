import React from 'react'
import TextField from '@mui/material/TextField';

const InputField = ({ label, value, setValue, inputProps, error = false, errMsg = '', id }) => {
  return (
    <TextField
      required
      id={id}
      variant='standard'
      sx={{ m: 1, width: '30ch' }}
      error={error}
      helperText={errMsg}
      label={label}
      value={value}
      onChange={setValue}
      InputProps={inputProps}
    />
  )
}

export default InputField
