import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'

interface DeleteAnnouncement {
  open: boolean
  handleAcceptDelete: () => void
  onClose: () => void
}

export const ConfirmationModal: React.FC<DeleteAnnouncement> = ({ open, onClose, handleAcceptDelete }) => {
  const handleConfirm = () => {
    handleAcceptDelete()
    onClose()
  }

  if (!open) return null

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
        <DialogActions>
          <Button onClick={handleConfirm} autoFocus>
            Yes
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
