import { AlertColor } from '@mui/material'
import { createSlice } from '@reduxjs/toolkit'
import { addUser } from '../registration/actions'
import { authenticateUser } from '../login/actions'

export interface AppState {
  snackbarOpen: boolean
  snackbarType: AlertColor
  snackbarMessage: string
  registerLoading: boolean
  loginLoading: boolean
  loginComplete: boolean
}

const initialState: AppState = {
  snackbarOpen: false,
  snackbarType: 'warning',
  snackbarMessage: '',
  registerLoading: false,
  loginLoading: false,
  loginComplete: false,
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
  },
})

export const { displaySnackbar, closeSnackbar } = appSlice.actions

export default appSlice.reducer
