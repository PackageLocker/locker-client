import React from 'react'
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

const Content = ({ packages }) => {
  const navigate = useNavigate();

  return (
    <List>
      {packages.map((item) => {
        return (
          <div key={item.locker_id}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="add">
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
  )
}

export default Content