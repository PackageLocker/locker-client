import React, { useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Header from '../components/Header';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import DeleteDiaglog from '../components/DeleteDiaglog';
import Typography from '@mui/material/Typography';

const PackageDetails = () => {
  const { state } = useLocation();
  const { data } = state;
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [alert, setAlert] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleConfirm = async () => {
    try {
      setIsDeleting(true);
      await axiosPrivate.delete('delete', {
        data: {
          locker_id: data.locker_id
        }
      });
      navigate('/');
    } catch (err) {
      setDeleteError(err.message);
      console.log(`Error: ${err.message}`);
      if (err.response.status === 401) {
        navigate('/login', { state: { from: location }, replace: true })
      }
    } finally {
      setAlert(false);
      setIsDeleting(false);
    }
  }

  return (
    <div>
      <Header text={`Locker ${data.locker_id}`} root={false} id={data.locker_id} />
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
          <ListItemText>Package # {data.package_id}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Delivery Time: {new Date(data.timestamp).toLocaleString()}</ListItemText>
        </ListItem>
      </List>
      <Button
        onClick={() => setAlert(true)}
        variant="outlined"
        color="error"
        disabled={isDeleting}
        sx={{ mx: 2 }}
      >
        DELETE
      </Button>
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
