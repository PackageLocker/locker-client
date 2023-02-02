import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DeleteDiaglog = ({ id, open, handleCancel, handleConfirm, isDeleting }) => {

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Delete entry from locker #{id}?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {isDeleting ? "Deleting..." : `Please confirm that locker ${id} is empty.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} disabled={isDeleting}>Cancel</Button>
        <Button onClick={handleConfirm} color="error" disabled={isDeleting}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDiaglog
