import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AnnouncementDto } from '../../types/Announcements'
import { fetchAddAnnouncement, fetchAnnouncements, fetchDeleteAnnouncements, fetchFilterAnnouncements } from './actions'

export interface AnnouncementsState {
  announcementsData?: AnnouncementDto[]
  announcementsLoading: boolean
  announcementsSuccess: boolean
  announcementsError: boolean
  announcementsSearchResultsLoading: boolean
  announcementsSearchResultsError: boolean
  announcementsSearchResultsSuccess: boolean
  deleteAnnouncementSuccess: boolean
  deleteAnnouncementError: boolean
  deleteAnnouncementLoading: boolean
  addAnnouncementSuccess: boolean
}

const initialState: AnnouncementsState = {
  announcementsData: undefined,
  announcementsLoading: false,
  announcementsSuccess: false,
  announcementsError: false,
  announcementsSearchResultsLoading: false,
  announcementsSearchResultsError: false,
  announcementsSearchResultsSuccess: false,
  deleteAnnouncementSuccess: false,
  deleteAnnouncementError: false,
  deleteAnnouncementLoading: false,
  addAnnouncementSuccess: false,
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
      .addCase(fetchAnnouncements.fulfilled, (state, action: PayloadAction<AnnouncementDto[]>) => {
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
      .addCase(fetchFilterAnnouncements.rejected, state => {
        state.announcementsSearchResultsLoading = true
        state.announcementsSearchResultsError = true
        state.announcementsSearchResultsSuccess = false
      })
      .addCase(fetchFilterAnnouncements.fulfilled, (state, action: PayloadAction<AnnouncementDto[]>) => {
        state.announcementsData = action.payload
        state.announcementsSearchResultsLoading = false
        state.announcementsSearchResultsError = false
        state.announcementsSearchResultsSuccess = true
      })

      .addCase(fetchFilterAnnouncements.pending, state => {
        state.announcementsSearchResultsLoading = true
        state.announcementsSearchResultsError = false
        state.announcementsSearchResultsSuccess = false
      })
      .addCase(fetchDeleteAnnouncements.rejected, state => {
        state.deleteAnnouncementSuccess = false
        state.deleteAnnouncementError = true
        state.deleteAnnouncementLoading = false
      })
      .addCase(fetchDeleteAnnouncements.fulfilled, state => {
        state.deleteAnnouncementSuccess = true
        state.deleteAnnouncementError = false
        state.deleteAnnouncementLoading = false
      })
      .addCase(fetchDeleteAnnouncements.pending, state => {
        state.deleteAnnouncementSuccess = false
        state.deleteAnnouncementError = false
        state.deleteAnnouncementLoading = true
      })
      .addCase(fetchAddAnnouncement.fulfilled, state => {
        state.addAnnouncementSuccess = true
      })
  },
})

export default announcementsSlice.reducer
