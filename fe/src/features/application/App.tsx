import React from 'react'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { theme } from './theme'

import { LoadingScreen } from './LoadingScreen'

const RegisterPage = React.lazy(() => import('../registration/RegisterPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Work in progress...</div>,
  },
  {
    path: '/register',
    element: (
      <LoadingScreen>
        <RegisterPage />
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
