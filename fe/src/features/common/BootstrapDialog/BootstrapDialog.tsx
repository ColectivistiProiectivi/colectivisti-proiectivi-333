import { Dialog, DialogTitle, IconButton, Slide, styled } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React from 'react'
import { TransitionProps } from '@mui/material/transitions'

export const DialogTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(6),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

export interface DialogTitleProps {
  children?: React.ReactNode
  onClose: () => void
}

export const BootstrapDialogTitle: React.FC<DialogTitleProps> = props => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, mb: 4, p: 2, textAlign: 'center' }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}
