import { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppDispatch } from '../../../redux/hooks'
import { displaySnackbar } from '../slice'

interface AlreadyAuthProps {
  redirectTo: string
  message?: string
}

/**
 * This component is a wrapper for Page Components (the opposite for RequireAuth)
 * @param children is the Page Component rendered if user is NOT logged in
 * @param redirectTo is the path the user will be redirected towards in the alternative case
 * @param message is the message displayed in a snackbar informing the user what happened
 */

export const AlreadyAuth: FC<PropsWithChildren<AlreadyAuthProps>> = ({ children, redirectTo, message }) => {
  const dispatch = useAppDispatch()
  const isAuthenticated = !!localStorage.getItem('user')

  if (isAuthenticated) {
    dispatch(
      displaySnackbar({
        open: true,
        type: 'warning',
        message: message || 'You are already logged in!',
      })
    )

    return <Navigate to={redirectTo} />
  }

  return <>{children}</>
}
