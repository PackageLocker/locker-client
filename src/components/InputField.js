import React from 'react'
import TextField from '@mui/material/TextField';

const InputField = ({ label, value, setValue, inputProps }) => {
  return (
    <>

      <TextField
        required
        variant='standard'
        sx={{ m: 1, width: '30ch' }}
        label={label}
        value={value}
        onChange={setValue}
        InputProps={inputProps}
      />
    </>
  )
}

export default InputField
