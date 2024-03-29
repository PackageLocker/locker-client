import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDiaglog from './DeleteDiaglog';
import Typography from '@mui/material/Typography';

const Content = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const [alert, setAlert] = useState(false);
  const [id, setId] = useState();
  const [packages, setPackages] = useState([]);
  const [isFetchLoading, setIsFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await axiosPrivate.get('/packages');
      setPackages(response.data);
    } catch (err) {
      if (err.response) {
        // Not in the 200 response range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
      if (err.response.status === 401) {
        navigate('/login', { state: { from: location }, replace: true })
      }
      setFetchError(err.message);
    } finally {
      setIsFetchLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = (available, lockerId) => {
    if (available) {
      navigate(`new/${lockerId}`);
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
      setIsDeleting(true);
      const item = packages.find(i => i.locker_id === id);
      await axiosPrivate.delete('delete', {
        data: {
          locker_id: id,
          package_id: item.package_id,
          name: item.name,
          student_id: item.student_id,
          email: item.email,
          timestamp: Date.now()
        }
      });
      setPackages([]);
      await fetchPosts();
    } catch (err) {
      setDeleteError(err.message);
      console.log(`Error: ${err.message}`);
      if (err.response.status === 401) {
        navigate('/login', { state: { from: location }, replace: true })
      }
    } finally {
      setAlert(false);
      setId();
      setIsDeleting(false);
    }
  }

  return (
    <>
      {isFetchLoading && <Typography variant="overline">Loading Packages...</Typography>}
      {fetchError && <Typography variant="overline" color="error" id="fetchErr">{`Error: ${fetchError}`}</Typography>}
      {deleteError && <Typography variant="overline" color="error" id="deleteErr">{`Delete Error: ${deleteError}`}</Typography>}
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
                  onClick={() => item.available ?
                    navigate(`new/${item.locker_id}`)
                    :
                    navigate(`details/${item.locker_id}`,
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
        locker_id={id}
        open={alert}
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
        isDeleting={isDeleting}
      />
    </>
  )
}

export default Content