import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'

const getUserState = (state: RootState) => state.userState

export const selectUserData = createSelector([getUserState], userState => userState.userData)

export const selectUserDataLoading = createSelector([getUserState], userState => userState.userDataLoading)

export const selectUserDataError = createSelector([getUserState], userState => userState.userDataError)

export const selectUserAvatar = createSelector([getUserState], userState => userState.userAvatar)

export const selectUserAvatarLoading = createSelector([getUserState], userState => userState.userAvatarLoading)

export const selectUpdateUserLoading = createSelector([getUserState], userState => userState.updateUserLoading)

export const selectCompletedStudiesOptions = createSelector(
  [getUserState],
  userState => userState.completedStudiesOptions
)

export const selectCompletedStudiesOptionsLoading = createSelector(
  [getUserState],
  userState => userState.completedStudiesOptionsLoading
)

export const selectInterestAreasOptions = createSelector([getUserState], userState => userState.interestAreasOptions)

export const selectInterestAreasOptionsLoading = createSelector(
  [getUserState],
  userState => userState.interestAreasOptionsLoading
)
