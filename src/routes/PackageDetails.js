import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import Header from '../components/Header';
import { getDetails } from '../packages'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button } from '@mui/material';
import DeleteDiaglog from '../components/DeleteDiaglog';
import { useNavigate } from "react-router-dom";

const PackageDetails = () => {
  const [alert, setAlert] = useState(false);
  const [id, setId] = useState();

  const { lockerId } = useParams();
  const data = getDetails(lockerId);
  const navigate = useNavigate();

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
    // TODO: delete entry
    setAlert(false);
    setId();
  }
  return (
    <div>
      <Header text={"Locker " + lockerId} root={false} />
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
      <Button onClick={() => handleClick(data.available, data.locker_id)} variant="outlined" color="error">DELETE</Button>
      <DeleteDiaglog
        id={id}
        open={alert}
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
      />
    </div >
  )
}

export default PackageDetails
