import { AlertColor } from '@mui/material'
import { createSlice } from '@reduxjs/toolkit'
import { addUser } from '../registration/actions'

export interface AppState {
  snackbarOpen: boolean
  snackbarType: AlertColor
  snackbarMessage: string
}

const initialState: AppState = {
  snackbarOpen: false,
  snackbarType: 'warning',
  snackbarMessage: '',
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
      .addCase(addUser.rejected, state => {
        state.snackbarOpen = true
        state.snackbarType = 'error'
        state.snackbarMessage = 'An unexpected error has occured while signing up'
      })
      .addCase(addUser.fulfilled, state => {
        state.snackbarOpen = true
        state.snackbarType = 'success'
        state.snackbarMessage = 'You have been successfully signed up!'
      })
  },
})

export const { closeSnackbar } = appSlice.actions

export default appSlice.reducer
