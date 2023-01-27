import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";

const Header = ({ text, root }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        {root ? <></> :
          <IconButton edge="start" aria-label="back" color="inherit" onClick={() => navigate('/')}>
            <ArrowBackIosIcon />
          </IconButton>
        }
        <Typography variant="h6" component="div">
          {text}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
