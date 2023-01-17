import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAnnouncementsCall } from './services'
import { convertFromAnnouncementsDto } from './utils'

export const fetchAnnouncements = createAsyncThunk('fetchAnnouncements', async () => {
  const response = await fetchAnnouncementsCall()

  return convertFromAnnouncementsDto(response.data.value)
})
