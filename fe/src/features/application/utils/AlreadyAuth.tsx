import { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

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

export const AlreadyAuth: FC<PropsWithChildren<AlreadyAuthProps>> = ({ children, redirectTo }) => {
  const isAuthenticated = !!localStorage.getItem('jwtToken')

  if (isAuthenticated) {
    return <Navigate to={redirectTo} />
  }

  return <>{children}</>
}
