import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';
import axios from '../api/posts'
import { useNavigate, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import InputField from '../components/InputField';
import Header from '../components/Header';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const handleClickShowPassword = () => setShowPwd((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    try {
      setIsFetching(true);
      const response = await axios.post('auth', {}, {
        auth: {
          username: user,
          password: pwd
        }
      });
      const accessToken = response?.data?.token;
      setAuth({ user, pwd, accessToken });
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 401) {
        setErrMsg(`Unauthorized: ${err.response.data}`);
      } else {
        setErrMsg('Login Failed');
      }
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <>
      <Header text="Sign In" root={true} />
      {errMsg && <Typography variant="overline" color="error">{`${errMsg}`}</Typography>}
      <div>
        <InputField
          label="Username"
          value={user}
          setValue={(event) => setUser(event.target.value)}
        />
        <br />
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
      </div>
      <Button
        onClick={handleSubmit}
        variant="outlined"
        color="inherit"
        disabled={isFetching || user === "" || pwd === ""}
        sx={{ mt: 2 }}
      >
        Sign In
      </Button>
    </>
  )
}

export default Login
