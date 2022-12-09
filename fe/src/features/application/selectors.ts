import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'

const getAppState = (state: RootState) => state.appState

export const selectSnackbarOpen = createSelector([getAppState], appState => appState.snackbarOpen)

export const selectSnackbarType = createSelector([getAppState], appState => appState.snackbarType)

export const selectSnackbarMessage = createSelector([getAppState], appState => appState.snackbarMessage)

export const selectSidebarExpanded = createSelector([getAppState], appState => appState.sidebarExpanded)
