import React, { useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Header = ({ text, root, id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const handleConfirm = async () => {
    try {
      setIsOpening(true);
      await axiosPrivate.post('unlock', { locker_id: id })
    } catch (err) {
      console.log(`Error: ${err.message}`);
      if (err.response.status === 401) {
        navigate('/login', { state: { from: location }, replace: true })
      }
    } finally {
      setOpen(false);
      setIsOpening(false);
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {root ? <></> :
            <IconButton id="back" edge="start" aria-label="back" color="inherit" onClick={() => navigate('/')}>
              <ArrowBackIosIcon />
            </IconButton>
          }
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {text}
          </Typography>
          {!root && <IconButton
            size="large"
            color="inherit"
            aria-label="unlock"
            onClick={() => setOpen(true)}
          >
            <LockOpenIcon />
          </IconButton>}
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          Unlock locker {id}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`This action will force open locker ${id}. Please make sure the locker information is up to date after opening.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={isOpening}>Cancel</Button>
          <Button onClick={handleConfirm} color="error" disabled={isOpening}>
            {isOpening ? <CircularProgress size={20} /> : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </>

  )
}

export default Header
