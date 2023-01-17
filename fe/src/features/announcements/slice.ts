import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Announcement } from '../../types/Announcements'
import { fetchAnnouncements } from './actions'

export interface AnnouncementsState {
  announcementsData?: Announcement[]
  announcementsLoading: boolean
  announcementsSuccess: boolean
  announcementsError: boolean
}

const initialState: AnnouncementsState = {
  announcementsData: undefined,
  announcementsLoading: false,
  announcementsSuccess: false,
  announcementsError: false,
}

export const announcementsSlice = createSlice({
  name: 'assignmentsState',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAnnouncements.rejected, state => {
        state.announcementsSuccess = false
        state.announcementsError = true
        state.announcementsLoading = false
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action: PayloadAction<Announcement[]>) => {
        state.announcementsData = action.payload
        state.announcementsSuccess = true
        state.announcementsError = false
        state.announcementsLoading = false
      })

      .addCase(fetchAnnouncements.pending, state => {
        state.announcementsSuccess = false
        state.announcementsError = false
        state.announcementsLoading = true
      })
  },
})

export default announcementsSlice.reducer
