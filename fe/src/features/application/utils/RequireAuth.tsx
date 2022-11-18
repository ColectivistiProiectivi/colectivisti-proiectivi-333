import { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppDispatch } from '../../../redux/hooks'
import { displaySnackbar } from '../slice'

interface RequireAuthProps {
  redirectTo: string
  message?: string
}

/**
 * This component is a wrapper for Page Components
 * @param children is the Page Component rendered if user IS logged in
 * @param redirectTo is the path the user will be redirected towards in the alternative case
 * @param message is the message displayed in a snackbar informing the user what happened
 */

export const RequireAuth: FC<PropsWithChildren<RequireAuthProps>> = ({ children, redirectTo, message }) => {
  const dispatch = useAppDispatch()
  const isAuthenticated = !!localStorage.getItem('user')

  if (!isAuthenticated) {
    dispatch(
      displaySnackbar({
        open: true,
        type: 'warning',
        message: message || 'You do not have permission to access this page',
      })
    )

    return <Navigate to={redirectTo} />
  }

  return <>{children}</>
}
