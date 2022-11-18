import { useAppDispatch } from '../../../redux/hooks'
import { displaySnackbar } from '../../application/slice'
import { Navigate } from 'react-router-dom'

interface LogoutRedirectProps {
  redirectAfterLogoutTo: string
}

export const LogoutRedirect: React.FC<LogoutRedirectProps> = ({ redirectAfterLogoutTo }) => {
  const dispatch = useAppDispatch()
  const isAuthenticated = !!localStorage.getItem('user')

  if (isAuthenticated) {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('user')

    dispatch(
      displaySnackbar({
        open: true,
        type: 'info',
        message: 'You have been signed out!',
      })
    )
  }

  return <Navigate to={redirectAfterLogoutTo} />
}
