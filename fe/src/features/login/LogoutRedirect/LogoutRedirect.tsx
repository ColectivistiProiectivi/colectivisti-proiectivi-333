import React, { useEffect } from 'react'
import { useAppDispatch } from '../../../redux/hooks'
import { deauthenticate, displaySnackbar } from '../../application/slice'
import { Navigate } from 'react-router-dom'
import { resetUserData } from '../../account/slice'

interface LogoutRedirectProps {
  redirectAfterLogoutTo: string
}

export const LogoutRedirect: React.FC<LogoutRedirectProps> = ({ redirectAfterLogoutTo }) => {
  const dispatch = useAppDispatch()
  const isAuthenticated = !!localStorage.getItem('jwtToken')

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(deauthenticate())
      dispatch(resetUserData())

      dispatch(
        displaySnackbar({
          open: true,
          type: 'info',
          message: 'You have been signed out!',
        })
      )
    }
  }, [])

  return <Navigate to={redirectAfterLogoutTo} />
}
