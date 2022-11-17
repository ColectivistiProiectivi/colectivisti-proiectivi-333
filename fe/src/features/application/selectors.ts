import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'

const getSnackbarState = (state: RootState) => state.appState

export const selectSnackbarOpen = createSelector([getSnackbarState], snackbarState => snackbarState.snackbarOpen)

export const selectSnackbarType = createSelector([getSnackbarState], snackbarState => snackbarState.snackbarType)

export const selectSnackbarMessage = createSelector([getSnackbarState], snackbarState => snackbarState.snackbarMessage)
