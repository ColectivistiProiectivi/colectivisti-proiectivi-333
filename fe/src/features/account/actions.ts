import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUserCall } from './services'

export const fetchUserData = createAsyncThunk('fetchUserData', async () => {
  const response = await fetchUserCall()

  return response.data.value
})
