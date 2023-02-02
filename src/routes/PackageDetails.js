import React, { useState } from 'react'
import Header from '../components/Header';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import DeleteDiaglog from '../components/DeleteDiaglog';
import Typography from '@mui/material/Typography';
import { useNavigate, useLocation } from "react-router-dom";
import api from '../api/posts'

const PackageDetails = () => {
  const { state } = useLocation();
  const { data } = state;
  const navigate = useNavigate();

  const [alert, setAlert] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleConfirm = async () => {
    try {
      setIsDeleting(true);
      await api.delete('delete', {
        data: {
          locker_id: data.locker_id
        }
      });
      navigate('/');
    } catch (err) {
      setDeleteError(err.message);
      console.log(`Error: ${err.message}`);
    } finally {
      setAlert(false);
      setIsDeleting(false);
    }
  }

  return (
    <div>
      <Header text={`Locker ${data.locker_id}`} root={false} />
      {deleteError && <Typography variant="overline" color="error">{`Delete Error: ${deleteError}`}</Typography>}
      <List>
        <ListItem>
          <ListItemText>Name: {data.name}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Email: {data.email}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Student ID: {data.student_id}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Package #{data.package_id}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Delivery Time: {new Date(data.timestamp).toLocaleString()}</ListItemText>
        </ListItem>
      </List>
      <Button onClick={() => setAlert(true)} variant="outlined" color="error">DELETE</Button>
      <DeleteDiaglog
        id={data.locker_id}
        open={alert}
        handleCancel={() => setAlert(false)}
        handleConfirm={handleConfirm}
        isDeleting={isDeleting}
      />
    </div >
  )
}

export default PackageDetails
