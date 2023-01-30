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
import { getPackges } from '../packages'
import DeleteDiaglog from '../components/DeleteDiaglog';

const Content = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const [id, setId] = useState();
  const [packages, setPackages] = useState(getPackges());

  const handleClick = (available, lockerId) => {
    if (available) {
      navigate('new/' + lockerId);
    }
    else {
      setAlert(true);
      setId(lockerId);
    }
  }

  const handleCancel = () => {
    setAlert(false);
    setId();
  }

  const handleConfirm = () => {
    setAlert(false);
    setId();
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

            </div>
          )
        })}
      </List>
      <DeleteDiaglog
        id={id}
        open={alert}
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
      />
    </>
  )
}

export default Content