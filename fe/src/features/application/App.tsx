import React from 'react'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { theme } from './theme'

import { LoadingScreen, AlreadyAuth } from './utils'
import { Snackbar } from '../common/Snackbar'
import { LogoutRedirect } from '../login/LogoutRedirect'
import { Layout } from '../layout'
import { paths } from '../../api'

const WelcomePage = React.lazy(() => import('../welcome/WelcomePage'))
const ProfilePage = React.lazy(() => import('../profile/ProfilePage'))

const router = createBrowserRouter([
  {
    path: paths.LANDING_PAGE,
    element: (
      <AlreadyAuth redirectTo={paths.PROFILE}>
        <LoadingScreen>
          <WelcomePage />
        </LoadingScreen>
      </AlreadyAuth>
    ),
  },
  {
    element: <Layout />,
    children: [
      {
        path: paths.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: paths.LOGOUT,
        element: <LogoutRedirect redirectAfterLogoutTo={paths.LANDING_PAGE} />,
      },
    ],
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
