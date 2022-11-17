import React from 'react'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { Snackbar as MuiSnackbar } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectSnackbarMessage, selectSnackbarOpen, selectSnackbarType } from '../../application/selectors'
import { closeSnackbar } from '../../application/slice'

const autoHideDurations = 5000

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const Snackbar = () => {
  const snackbarOpen = useAppSelector(selectSnackbarOpen)
  const snackbarType = useAppSelector(selectSnackbarType)
  const snackbarMessage = useAppSelector(selectSnackbarMessage)

  const dispatch = useAppDispatch()

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(closeSnackbar())
  }

  return (
    <>
      <MuiSnackbar
        open={snackbarOpen}
        autoHideDuration={autoHideDurations}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={snackbarType}>
          {snackbarMessage}
        </Alert>
      </MuiSnackbar>
    </>
  )
}
