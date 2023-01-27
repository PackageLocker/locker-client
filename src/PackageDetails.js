import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";

const PackageDetails = () => {
  const navigate = useNavigate();
  const { lockerId } = useParams();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" aria-label="back" color="inherit" onClick={() => navigate('/')}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Locker {lockerId}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default PackageDetails
