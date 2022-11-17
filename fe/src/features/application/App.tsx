import React from 'react'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { theme } from './theme'

import { LoadingScreen } from './LoadingScreen'
import WelcomePage from '../welcome/WelcomePage'
import LoginPage from '../login/LoginPage'
import ResultsPage from '../results/ResultsPage'

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
      <LoadingScreen>
        <RegisterPage />
      </LoadingScreen>
    ),
  },
  {
    path: '/login',
    element: (
      <LoadingScreen>
        <LoginPage />
      </LoadingScreen>
    ),
  },
  {
    path: '/results',
    element: (
      <LoadingScreen>
        <ResultsPage />
      </LoadingScreen>
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
        </ThemeProvider>
      </StyledEngineProvider>
    </React.Fragment>
  )
}

export default App
