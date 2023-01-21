import { createAsyncThunk } from '@reduxjs/toolkit'
import { Submission, UpdateSubmission } from '../../types/Announcements'
import {
  addAnnouncementCall,
  fetchAnnouncementsCall,
  deleteAnnouncementsCall,
  fetchFilterAnnouncementsCall,
  updateAnnouncementCall,
} from './services'

export const fetchAnnouncements = createAsyncThunk('fetchAnnouncements', async () => {
  const response = await fetchAnnouncementsCall()

  return response.data
})

export const fetchFilterAnnouncements = createAsyncThunk('fetchFilterAnnouncements', async (text: string) => {
  const response = await fetchFilterAnnouncementsCall(text)

  return response.data
})

export const deleteAnnouncement = createAsyncThunk('deleteAnnouncement', async (id: number) => {
  const response = await deleteAnnouncementsCall(id)

  return response.data
})

export const addAnnouncement = createAsyncThunk('addAnnouncement', async (ann: Submission) => {
  const response = await addAnnouncementCall(ann)

  return response.data
})

export const updateAnnouncement = createAsyncThunk('updateAnnouncement', async (ann: UpdateSubmission) => {
  const response = await updateAnnouncementCall(ann)

  return response.data
})
