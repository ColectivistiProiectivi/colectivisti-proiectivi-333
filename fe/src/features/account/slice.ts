import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InterestArea, Study, UserDto } from '../../types/User'
import {
  fetchCompletedStudiesOptions,
  fetchInterestAreasOptions,
  fetchUserAvatar,
  fetchUserData,
  updateUserData,
} from './actions'

export interface UserData {
  userData?: UserDto
  userDataLoading: boolean
  userDataComplete: boolean
  userDataError: boolean
  userAvatar?: Blob
  userAvatarLoading: boolean
  updateUserLoading: boolean
  completedStudiesOptions?: Study[]
  completedStudiesOptionsLoading: boolean
  interestAreasOptions?: InterestArea[]
  interestAreasOptionsLoading: boolean
}

const initialState: UserData = {
  userData: undefined,
  userDataLoading: false,
  userDataComplete: false,
  userDataError: false,
  userAvatar: undefined,
  userAvatarLoading: false,
  updateUserLoading: false,
  completedStudiesOptions: undefined,
  completedStudiesOptionsLoading: false,
  interestAreasOptions: undefined,
  interestAreasOptionsLoading: false,
}

export const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    resetUserData: _ => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserData.pending, state => {
        state.userDataError = false
        state.userDataComplete = false
        state.userDataLoading = true
      })
      .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserDto>) => {
        state.userData = action.payload

        state.userDataComplete = true
        state.userDataLoading = false
        state.userDataError = false
      })
      .addCase(fetchUserData.rejected, state => {
        state.userDataError = true
        state.userDataLoading = false
        state.userDataComplete = false
      })

      .addCase(fetchUserAvatar.pending, state => {
        state.userAvatarLoading = true
      })
      .addCase(fetchUserAvatar.fulfilled, (state, action: PayloadAction<Blob>) => {
        state.userAvatar = action.payload
        state.userAvatarLoading = false
      })
      .addCase(fetchUserAvatar.rejected, state => {
        state.userAvatarLoading = false
      })

      .addCase(updateUserData.pending, state => {
        state.updateUserLoading = true
      })
      .addCase(updateUserData.fulfilled, (state, action: PayloadAction<UserDto>) => {
        state.userData = action.payload
        state.updateUserLoading = false
      })
      .addCase(updateUserData.rejected, state => {
        state.updateUserLoading = false
      })

      .addCase(fetchCompletedStudiesOptions.pending, state => {
        state.completedStudiesOptionsLoading = true
      })
      .addCase(fetchCompletedStudiesOptions.fulfilled, (state, action: PayloadAction<Study[]>) => {
        state.completedStudiesOptions = action.payload
        state.completedStudiesOptionsLoading = false
      })
      .addCase(fetchCompletedStudiesOptions.rejected, state => {
        state.completedStudiesOptionsLoading = false
      })

      .addCase(fetchInterestAreasOptions.pending, state => {
        state.interestAreasOptionsLoading = true
      })
      .addCase(fetchInterestAreasOptions.fulfilled, (state, action: PayloadAction<Study[]>) => {
        state.interestAreasOptions = action.payload
        state.interestAreasOptionsLoading = false
      })
      .addCase(fetchInterestAreasOptions.rejected, state => {
        state.interestAreasOptionsLoading = false
      })
  },
})

export const { resetUserData } = userSlice.actions

export default userSlice.reducer
