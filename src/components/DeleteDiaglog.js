import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const DeleteDiaglog = ({ locker_id, open, handleCancel, handleConfirm, isDeleting }) => {

  return (
    <Dialog
      id="delete-dialog"
      open={open}
      onClose={handleCancel}
      aria-labelledby={`Delete entry from locker ${locker_id}?`}
      aria-describedby={`Please confirm that locker ${locker_id} is empty.`}
    >
      <DialogTitle>
        Delete entry from locker #{locker_id}?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Please confirm that locker ${locker_id} is empty.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button id="cancel" onClick={handleCancel} disabled={isDeleting}>Cancel</Button>
        <Button id="confirm" onClick={handleConfirm} color="error" disabled={isDeleting}>
          {isDeleting ? <CircularProgress size={20} /> : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDiaglog
