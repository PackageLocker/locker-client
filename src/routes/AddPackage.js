import React, { useState } from 'react'
import Header from '../components/Header';
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Html5QrcodePlugin from "../components/Html5QrcodePlugin";
import InputField from '../components/InputField';

const AddPackage = () => {
  const { lockerId } = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [packageId, setPackageId] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);

  const onNewScanResult = (decodedText, decodedResult) => {
    setPackageId(decodedText);
    console.log(decodedText, decodedResult);
    setScannerOpen(false);
  }

  const handleAddPackage = async () => {
    try {
      setIsPosting(true);
      const newPackage = {
        locker_id: lockerId,
        package_id: packageId,
        name: name,
        student_id: studentId,
        email: email,
        timestamp: Date.now()
      }
      await axiosPrivate.post('new', newPackage)
      navigate('/');
    } catch (err) {
      setPostError(err.message);
      console.log(`Error: ${err.message}`);
    } finally {
      setIsPosting(false);
    }
  }

  const qrboxFunction = (viewfinderWidth, viewfinderHeight) => {
    let minEdgePercentage = 0.95;
    let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
    let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
    return {
      width: qrboxSize,
      height: Math.floor(qrboxSize / 1.6)
    };
  }

  return (
    <>
      <Header text={`Locker ${lockerId}`} root={false} id={lockerId} />
      {postError && <Typography variant="overline" color="error">{`Post Error: ${postError}`}</Typography>}
      <Box
        component="form"
        sx={{ my: 2, mx: 1, width: '30ch' }}
        noValidate
        autoComplete="off"
      >
        <InputField
          label="Name"
          value={name}
          setValue={(event) => setName(event.target.value)}
        />
        <InputField
          label="Email"
          value={email}
          setValue={(event) => setEmail(event.target.value)}
        />
        <InputField
          label="Student ID"
          value={studentId}
          setValue={(event) => setStudentId(event.target.value)}
        />
        <InputField
          label="Package #"
          value={packageId}
          setValue={(event) => setPackageId(event.target.value)}
          inputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton edge="end" aria-label="scanner" onClick={() => setScannerOpen(true)}>
                <QrCodeScannerIcon />
              </IconButton>
            </InputAdornment>,
          }}
        />
      </Box>

      <Dialog
        open={scannerOpen}
        onClose={() => setScannerOpen(false)}
        fullWidth={true}
      >
        <Html5QrcodePlugin
          fps={10}
          qrbox={qrboxFunction}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />
        <DialogActions>
          <Button onClick={() => setScannerOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {isPosting &&
        <Box sx={{ height: 20 }}>
          <CircularProgress size={20} />
        </Box>}
      <Button
        onClick={handleAddPackage}
        variant="outlined"
        color="inherit"
        disabled={isPosting || name === "" || email === "" || studentId === "" || packageId === ""}
        sx={{ mx: 2 }}
      >
        Submit
      </Button>
    </>
  )
}

export default AddPackage
