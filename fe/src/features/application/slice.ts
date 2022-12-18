import { AlertColor } from '@mui/material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addUser } from '../registration/actions'
import { authenticateUser } from '../login/actions'
import { AuthProps } from '../../types/User'
import { updateUserData } from '../account/actions'

export interface AppState {
  snackbarOpen: boolean
  snackbarType: AlertColor
  snackbarMessage: string
  registerLoading: boolean
  registerComplete: boolean
  loginLoading: boolean
  loginComplete: boolean
  sidebarExpanded: boolean
}

const initialState: AppState = {
  snackbarOpen: false,
  snackbarType: 'warning',
  snackbarMessage: '',
  registerLoading: false,
  registerComplete: false,
  loginLoading: false,
  loginComplete: false,
  sidebarExpanded: true,
}

export const appSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    displaySnackbar: (state, action) => {
      state.snackbarOpen = action.payload.open
      state.snackbarType = action.payload.type
      state.snackbarMessage = action.payload.message
    },
    closeSnackbar: state => {
      state.snackbarOpen = false
    },
    resetAuthState: state => {
      state.registerComplete = false
      state.registerLoading = false
      state.loginLoading = false
      state.loginComplete = false
    },
    authenticate: (_, action: PayloadAction<AuthProps>) => {
      localStorage.setItem('jwtToken', action.payload.jwtToken)
      localStorage.setItem('user', action.payload.user)
    },
    deauthenticate: _ => {
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('user')
    },
    toggleSidebar: state => {
      state.sidebarExpanded = !state.sidebarExpanded
    },
  },
  extraReducers: builder => {
    builder
      // Register
      .addCase(addUser.rejected, state => {
        state.snackbarOpen = true
        state.snackbarType = 'error'
        state.snackbarMessage = 'An unexpected error has occured while signing up'
        state.registerLoading = false
      })
      .addCase(addUser.fulfilled, state => {
        state.snackbarOpen = true
        state.snackbarType = 'success'
        state.snackbarMessage = 'You have been successfully signed up!'
        state.registerLoading = false
        state.registerComplete = true
      })

      .addCase(addUser.pending, state => {
        state.registerLoading = true
      })

      // Login
      .addCase(authenticateUser.rejected, state => {
        state.snackbarOpen = true
        state.snackbarType = 'error'
        state.snackbarMessage = 'An unexpected error has occured while logging in'
        state.loginLoading = false
        state.loginComplete = false
      })
      .addCase(authenticateUser.fulfilled, state => {
        state.snackbarOpen = true
        state.snackbarType = 'success'
        state.snackbarMessage = 'You have been successfully signed in! You will be redirected shortly...'
        state.loginLoading = false
        state.loginComplete = true
      })
      .addCase(authenticateUser.pending, state => {
        state.loginLoading = true
        state.loginComplete = false
      })

      // Update profile
      .addCase(updateUserData.fulfilled, state => {
        state.snackbarOpen = true
        state.snackbarType = 'success'
        state.snackbarMessage = 'Your profile has been updated!'
      })
      .addCase(updateUserData.rejected, state => {
        state.snackbarOpen = true
        state.snackbarType = 'error'
        state.snackbarMessage = 'Something went wrong updating your profile.'
      })
  },
})

export const { displaySnackbar, closeSnackbar, resetAuthState, authenticate, deauthenticate, toggleSidebar } =
  appSlice.actions

export default appSlice.reducer
