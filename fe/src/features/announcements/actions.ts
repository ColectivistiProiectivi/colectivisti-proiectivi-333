import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAnnouncementsCall, fetchDeleteAnnouncementsCall, fetchFilterAnnouncementsCall } from './services'

export const fetchAnnouncements = createAsyncThunk('fetchAnnouncements', async () => {
  const response = await fetchAnnouncementsCall()

  return response.data
})

export const fetchFilterAnnouncements = createAsyncThunk('fetchFilterAnnouncements', async (text: string) => {
  const response = await fetchFilterAnnouncementsCall(text)

  return response.data
})

export const fetchDeleteAnnouncements = createAsyncThunk('fetchDeleteAnnouncements', async (id: number) => {
  const response = await fetchDeleteAnnouncementsCall(id)

  return response.data
})
