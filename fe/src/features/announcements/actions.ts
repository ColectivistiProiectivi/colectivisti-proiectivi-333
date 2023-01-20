import { createAsyncThunk } from '@reduxjs/toolkit'
import { Submission, UpdateSubmission } from '../../types/Announcements'
import {
  fetchAddAnnouncementCall,
  fetchAnnouncementsCall,
  fetchDeleteAnnouncementsCall,
  fetchFilterAnnouncementsCall,
  fetchUpdateAnnouncementCall,
} from './services'

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

export const fetchAddAnnouncement = createAsyncThunk('fetchAddAnnouncement', async (ann: Submission) => {
  const response = await fetchAddAnnouncementCall(ann)

  return response.data
})

export const fetchUpdateAnnouncement = createAsyncThunk('fetchUpdateAnnouncement', async (ann: UpdateSubmission) => {
  const response = await fetchUpdateAnnouncementCall(ann)

  return response.data
})
