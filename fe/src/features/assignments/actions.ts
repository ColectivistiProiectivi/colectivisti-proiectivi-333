import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAssignmentsCall } from './services'
import { convertFromAssignmentsDto } from './utils'

export const fetchAssingments = createAsyncThunk('fetchAssignments', async () => {
  const response = await fetchAssignmentsCall()

  return convertFromAssignmentsDto(response.data.value)
})
