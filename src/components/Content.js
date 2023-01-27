import React, { useState } from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { getPackges } from '../packages'

const Content = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState(getPackges());
  const [alert, setAlert] = useState(false);

  const handleClick = (available, lockerId) => {
    available ? navigate('new/' + lockerId) : setAlert(true);
  }

  const handleCancel = () => {
    setAlert(false);
  }

  const handleConfirm = () => {
    // TODO: delete entry
    setAlert(false);
  }

  return (
    <>
      <List>
        {packages.map((item) => {
          return (
            <div key={item.locker_id}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="add" onClick={() => handleClick(item.available, item.locker_id)}>
                    {item.available ? <AddCircleOutlineIcon /> : <DeleteIcon />}
                  </IconButton>
                }
              >
                <ListItemButton disabled={item.available} onClick={() => navigate('details/' + item.locker_id)}>
                  <ListItemIcon>
                    {item.locker_id}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
              <Divider />
              <Dialog
                open={alert}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Delete entry from locker #{item.locker_id}?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Please confirm that this locker is empty.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCancel}>Cancel</Button>
                  <Button onClick={handleConfirm} color="error">
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          )
        })}
      </List>
    </>
  )
}

export default Content