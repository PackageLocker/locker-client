import React, { useState } from 'react'
import Header from '../components/Header';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import DeleteDiaglog from '../components/DeleteDiaglog';
import { useNavigate, useLocation } from "react-router-dom";
import api from '../api/posts'

const PackageDetails = () => {
  const { state } = useLocation();
  const { data } = state;
  const navigate = useNavigate();

  const [alert, setAlert] = useState(false);

  const handleConfirm = async () => {
    try {
      await api.delete('delete', {
        data: {
          locker_id: data.locker_id
        }
      });
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
    setAlert(false);
  }

  return (
    <div>
      <Header text={`Locker ${data.locker_id}`} root={false} />
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
      </List>
      <Button onClick={() => setAlert(true)} variant="outlined" color="error">DELETE</Button>
      <DeleteDiaglog
        id={data.locker_id}
        open={alert}
        handleCancel={() => setAlert(false)}
        handleConfirm={handleConfirm}
      />
    </div >
  )
}

export default PackageDetails
