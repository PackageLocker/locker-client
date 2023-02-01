import React, { useState, useEffect } from 'react'
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
import DeleteDiaglog from '../components/DeleteDiaglog';
import api from '../api/posts'

const Content = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const [id, setId] = useState();
  const [packages, setPackages] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/packages');
      setPackages(response.data);
      console.log(response.data);
    } catch (err) {
      if (err.response) {
        // Not in the 200 response range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [])

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

  const handleConfirm = async () => {
    try {
      await api.delete('delete', {
        data: {
          locker_id: id
        }
      });
      setPackages([]);
      await fetchPosts();
    } catch (err) {
      console.log(`Error: ${err.message}`);
    } finally {
      setAlert(false);
      setId();
    }
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
                <ListItemButton
                  disabled={item.available}
                  onClick={() => navigate(
                    `details/${item.locker_id}`,
                    {
                      state: {
                        data: item
                      }
                    })
                  }>
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