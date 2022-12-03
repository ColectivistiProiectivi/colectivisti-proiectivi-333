import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'

const getUserState = (state: RootState) => state.userState

export const selectUserData = createSelector([getUserState], userState => userState.userData)

export const selectUserDataLoading = createSelector([getUserState], userState => userState.userDataLoading)

export const selectUserDataError = createSelector([getUserState], userState => userState.userDataError)
