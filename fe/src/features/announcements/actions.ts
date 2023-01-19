import { createAsyncThunk } from '@reduxjs/toolkit'
import { AnnouncementDto } from '../../types/Announcements'
import { fetchAnnouncementsCall } from './services'

export const fetchAnnouncements = createAsyncThunk('fetchAnnouncements', async () => {
  const response = await fetchAnnouncementsCall()

  return response.data
})

export const fetchAnnouncementsSearchResults = createAsyncThunk(
  'fetchAnnouncementsSearchResults',
  async (searchResults: AnnouncementDto) => {
    return searchResults
  }
)
