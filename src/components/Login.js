import React, { useEffect, useRef, useState } from 'react'
import Typography from '@mui/material/Typography';
import InputField from './InputField';
import Header from './Header';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';

const Login = () => {
  // const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // useEffect(() => {
  //   userRef.current.focus();
  // }, [])

  // useEffect(() => {
  //   setErrMsg('');
  // }, [user, pwd])

  const handleClickShowPassword = () => setShowPwd((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    console.log("login!")
  }

  return (
    <div>
      <Header text="Sign In" root={true} />
      <div>
        {errMsg && <Typography variant="overline" color="error">{`${errMsg}`}</Typography>}

        <InputField
          label="Username"
          value={user}
          setValue={(event) => setUser(event.target.value)}
        />
        <TextField
          required
          variant='standard'
          sx={{ m: 1, width: '30ch' }}
          label="Password"
          value={pwd}
          onChange={(event) => setPwd(event.target.value)}
          type={showPwd ? 'text' : 'password'}
          InputProps={{
            endAdornment:
              <InputAdornment position="end" >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPwd ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
          }}
        />
        <div>
          <Button
            onClick={handleSubmit}
            variant="outlined"
            color="inherit"
            disabled={isFetching || user === "" || pwd === ""}
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div >
  )
}

export default Login
