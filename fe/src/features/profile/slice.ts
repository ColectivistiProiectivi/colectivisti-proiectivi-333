import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserDto } from '../../types/User'
import { fetchUserData } from './actions'

export interface UserData {
  userData?: UserDto
  userDataLoading: boolean
  userDataComplete: boolean
  userDataError: boolean
}

const initialState: UserData = {
  userData: undefined,
  userDataLoading: false,
  userDataComplete: false,
  userDataError: false,
}

export const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {},
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
  },
})

export default userSlice.reducer
