import React, { useState } from 'react'
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Header from '../components/Header';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import InputField from '../components/InputField';
import Html5QrcodePlugin from "../components/Html5QrcodePlugin";
import packages from '../data/packages.json'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';

const AddPackage = () => {
  const { lockerId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [scannerOpen, setScannerOpen] = useState(false);

  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(true);
  const [nameErr, setNameErr] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [emailErr, setEmailErr] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentIdValid, setStudentIdValid] = useState(true);
  const [studentIdErr, setStudentIdErr] = useState("");
  const [packageId, setPackageId] = useState("");
  const [packageIdValid, setPackageIdValid] = useState(true);
  const [packageIdErr, setPackageIdErr] = useState("");

  const [data, setData] = useState(null);

  const handleName = (e) => {
    setName(e.target.value);
    if (!e.target.value) {
      setNameValid(false);
      setNameErr("Name cannot be empty.");
    } else {
      setNameValid(true);
      setNameErr("");
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (!e.target.value) {
      setEmailValid(false);
      setEmailErr("Email cannot be empty.");
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
      setEmailValid(false);
      setEmailErr("Invalid Email address.");
    } else {
      setEmailValid(true);
      setEmailErr("");
    }
  }

  const handleStudentId = (e) => {
    setStudentId(e.target.value);
    if (!e.target.value) {
      setStudentIdValid(false);
      setStudentIdErr("Student ID cannot be empty.");
    } else if (!/^[0-9]+$/.test(e.target.value)) {
      setStudentIdValid(false);
      setStudentIdErr("Student ID can only contain numbers.");
    } else {
      setStudentIdValid(true);
      setStudentIdErr("");
    }
  }

  const handlePackageId = (e) => {
    setPackageId(e.target.value);
    if (!e.target.value) {
      setPackageIdValid(false);
      setPackageIdErr("Package number cannot be empty.");
    } else {
      setPackageIdValid(true);
      setPackageIdErr("");
    }
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
      setPostError(err.response.data);
      console.log(`Error: ${err.response.data}`);
      if (err.response.status === 401) {
        navigate('/login', { state: { from: location }, replace: true })
      }
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

  const onNewScanResult = (decodedText, decodedResult) => {
    setPackageId(decodedText);
    const found = packages.find(i => i.package_id === decodedText);
    if (found) {
      setData(found);
    } else {
      setData(null);
      setScannerOpen(false);
    }
  }

  const fillInfo = () => {
    setName(data.name);
    setEmail(data.email);
    setStudentId(data.student_id);
    setScannerOpen(false);
    setData(null);
  }

  const handleCloseScanner = () => {
    setData(null);
    setScannerOpen(false);
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
          setValue={handleName}
          error={!nameValid}
          errMsg={nameErr}
        />
        <InputField
          label="Email"
          value={email}
          setValue={handleEmail}
          error={!emailValid}
          errMsg={emailErr}
        />
        <InputField
          label="Student ID"
          value={studentId}
          setValue={handleStudentId}
          error={!studentIdValid}
          errMsg={studentIdErr}
        />
        <InputField
          label="Package #"
          value={packageId}
          setValue={handlePackageId}
          error={!packageIdValid}
          errMsg={packageIdErr}
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
        onClose={handleCloseScanner}
        fullWidth={true}
      >
        {data ?
          <>
            <DialogTitle>
              Package Info Found!
            </DialogTitle>
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
            </List>
          </>
          :
          <Html5QrcodePlugin
            fps={10}
            qrbox={qrboxFunction}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
          />
        }
        <DialogActions>
          <Button onClick={handleCloseScanner}>Cancel</Button>
          {data && <Button onClick={fillInfo}>Fill</Button>}
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
        disabled={isPosting || !nameValid || !emailValid || !studentIdValid || !packageIdValid}
        sx={{ mx: 2 }}
      >
        Submit
      </Button>
    </>
  )
}

export default AddPackage
