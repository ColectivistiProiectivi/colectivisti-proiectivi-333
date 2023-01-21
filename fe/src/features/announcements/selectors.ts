import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'

const getAnnouncementsState = (state: RootState) => state.announcementsState

export const selectAnnouncementsLoading = createSelector(
  [getAnnouncementsState],
  announcementsState => announcementsState.announcementsLoading
)

export const selectAnnouncementsSuccess = createSelector(
  [getAnnouncementsState],
  announcementsState => announcementsState.announcementsSuccess
)

export const selectAnnouncementsError = createSelector(
  [getAnnouncementsState],
  announcementsState => announcementsState.announcementsError
)

export const selectAnnouncementsData = createSelector(
  [getAnnouncementsState],
  announcementsState => announcementsState.announcementsData
)

export const selectAnnouncementsResultsLoading = createSelector(
  [getAnnouncementsState],
  announcementsState => announcementsState.announcementsSearchResultsLoading
)

export const selectAnnouncementsResultsError = createSelector(
  [getAnnouncementsState],
  announcementsState => announcementsState.announcementsSearchResultsError
)

export const selectAnnouncementsResultsSuccess = createSelector(
  [getAnnouncementsState],
  announcementsState => announcementsState.announcementsSearchResultsSuccess
)

export const selectDeleteAnnouncementError = createSelector(
  [getAnnouncementsState],
  announcementsState => announcementsState.deleteAnnouncementError
)

export const selectDeleteAnnouncementLoading = createSelector(
  [getAnnouncementsState],
  announcementsState => announcementsState.deleteAnnouncementLoading
)

export const selectDeleteAnnouncementSuccess = createSelector(
  [getAnnouncementsState],
  announcementsState => announcementsState.deleteAnnouncementSuccess
)

export const selectAddAnnouncementSuccess = createSelector(
  [getAnnouncementsState],
  announcementsState => announcementsState.addAnnouncementSuccess
)
