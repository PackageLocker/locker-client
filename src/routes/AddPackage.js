import React, { useState } from 'react'
import Header from '../components/Header';
import { useNavigate, useParams } from "react-router-dom";
import Html5Qrcode from '../components/Html5Qrcode'
import api from '../api/posts'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const AddPackage = () => {
  const { lockerId } = useParams();
  const navigate = useNavigate();
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState(null);

  const handleAddPackage = async () => {
    try {
      setIsPosting(true);
      const newPackage = {
        locker_id: lockerId,
        package_id: "12345",
        name: `John Doe${lockerId}`,
        student_id: "1234567",
        email: `jd${lockerId}@calvin.edu`,
        timestamp: Date.now()
      }
      await api.post('new', newPackage)
      navigate('/');
    } catch (err) {
      setPostError(err.message);
      console.log(`Error: ${err.message}`);
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <>
      <Header text={"Locker " + lockerId} root={false} />
      {postError && <Typography variant="overline" color="error">{`Post Error: ${postError}`}</Typography>}
      <Html5Qrcode />
      {isPosting &&
        <Box sx={{ height: 20 }}>
          <CircularProgress size={20} />
        </Box>}
      <Button onClick={handleAddPackage} variant="outlined" color="inherit" disabled={isPosting}>Post</Button>
    </>
  )
}

export default AddPackage
