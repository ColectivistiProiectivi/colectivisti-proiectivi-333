import React from 'react'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { theme } from './theme'

import { LoadingScreen, AlreadyAuth, RequireAuth } from './utils'
import { Snackbar } from '../common/Snackbar'
import { LogoutRedirect } from '../login/LogoutRedirect'

const RegisterPage = React.lazy(() => import('../registration/RegisterPage'))
const LoginPage = React.lazy(() => import('../login/LoginPage'))
const WelcomePage = React.lazy(() => import('../welcome/WelcomePage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <LoadingScreen>
        <WelcomePage />
      </LoadingScreen>
    ),
  },
  {
    path: '/register',
    element: (
      <AlreadyAuth redirectTo="/" message="You already have an account!">
        <LoadingScreen>
          <RegisterPage />
        </LoadingScreen>
      </AlreadyAuth>
    ),
  },
  {
    path: '/login',
    element: (
      <AlreadyAuth redirectTo="/">
        <LoadingScreen>
          <LoginPage />
        </LoadingScreen>
      </AlreadyAuth>
    ),
  },
  {
    path: '/logout',
    element: (
      <RequireAuth redirectTo="/">
        <LoadingScreen>
          <LogoutRedirect redirectAfterLogoutTo="/login" />
        </LoadingScreen>
      </RequireAuth>
    ),
  },
])

const App = () => {
  return (
    <React.Fragment>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
          <CssBaseline />
          <Snackbar />
        </ThemeProvider>
      </StyledEngineProvider>
    </React.Fragment>
  )
}

export default App
