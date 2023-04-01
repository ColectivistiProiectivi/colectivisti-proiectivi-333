import React from 'react'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { theme } from './theme'

import { LoadingScreen, AlreadyAuth } from './utils'
import { Snackbar } from '../common/Snackbar'
import { LogoutRedirect } from '../login/LogoutRedirect'
import { NotFound } from '../layout/errorPages'
import { Layout } from '../layout'
import { paths } from '../../api'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const WelcomePage = React.lazy(() => import('../welcome/WelcomePage'))
const ProfilePage = React.lazy(() => import('../account/ProfilePage'))
const AssignmentsPage = React.lazy(() => import('../assignments/AssignmentsPage'))
const AnnouncementsPage = React.lazy(() => import('../announcements/AnnouncementsPage'))
const AppointmentsPage = React.lazy(() => import('../appointments/AppointmentsPage'))

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: paths.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: paths.ASSIGNMENTS,
        element: <AssignmentsPage />,
      },
      {
        path: paths.ANNOUNCEMENTS,
        element: <AnnouncementsPage />,
      },
      {
        path: paths.APPOINTMENTS,
        element: <AppointmentsPage />,
      },
      {
        path: paths.LOGOUT,
        element: <LogoutRedirect redirectAfterLogoutTo={paths.LANDING_PAGE} />,
      },
    ],
  },
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
    path: '*',
    element: <NotFound />,
  },
])

const App = () => {
  return (
    <React.Fragment>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router} />
            <CssBaseline />
            <Snackbar />
          </LocalizationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </React.Fragment>
  )
}

export default App
