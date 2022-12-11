import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllUsersCall, fetchUserCall } from './services'

export const fetchUserData = createAsyncThunk('fetchUserData', async () => {
  const response = await fetchUserCall()

  return response.data.value
})

export const fetchAllUsers = createAsyncThunk('fetchAllUsers', async () => {
  const response = await fetchAllUsersCall()

  return response.data
})
