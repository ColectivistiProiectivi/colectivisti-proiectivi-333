import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

interface ConfirmationDialogProps {
  isOpened: boolean
  handleClose: () => void
  handleConfirmAction: () => void
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpened,
  handleClose,
  handleConfirmAction,
}) => {
  const handleConfirm = () => {
    handleConfirmAction()
    handleClose()
  }

  return (
    <Dialog open={isOpened} onClose={handleClose} disableScrollLock={true}>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this item?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm} autoFocus color="error">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
