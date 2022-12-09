import React from 'react'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { theme } from './theme'

import { LoadingScreen, AlreadyAuth, RequireAuth } from './utils'
import { Snackbar } from '../common/Snackbar'
import { LogoutRedirect } from '../login/LogoutRedirect'

const WelcomePage = React.lazy(() => import('../welcome/WelcomePage'))
const ProfilePage = React.lazy(() => import('../account/ProfilePage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AlreadyAuth redirectTo="/profile">
        <LoadingScreen>
          <WelcomePage />
        </LoadingScreen>
      </AlreadyAuth>
    ),
  },
  {
    path: '/profile',
    element: (
      <RequireAuth redirectTo="/">
        <LoadingScreen>
          <ProfilePage />
        </LoadingScreen>
      </RequireAuth>
    ),
  },
  {
    path: '/logout',
    element: (
      <RequireAuth redirectTo="/">
        <LoadingScreen>
          <LogoutRedirect redirectAfterLogoutTo="/" />
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
