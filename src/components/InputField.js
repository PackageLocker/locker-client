import React from 'react'
import TextField from '@mui/material/TextField';

const InputField = ({ label, value, setValue, inputProps }) => {

  let errorMessage = "";
  let error = false;

  if (label === "Name" && value === "") {
    errorMessage = "This field is required";
    error = true;
  } 
  if (label === "Email" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
    errorMessage = "Please enter a valid email address";
    error = true;
  }
  if (label === "Student ID" && value.length !== 7) {
    errorMessage = "Please enter a valid student ID";
    error = true;
  }
  if (label === "Package #" && value.length <= 6) {
    errorMessage = "Please enter a valid package ID";
    error = true;
  }
  
  return (
    <>
      <TextField
        required
        variant='standard'
        sx={{ m: 1, width: '30ch' }}
        label={label}
        value={value}
        error={error}
        helperText={errorMessage}
        onChange={setValue}
        InputProps={inputProps}
      />
    </>
  )
}

export default InputField;