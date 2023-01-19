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

// export const selectAnnouncementsResultsLoading = createSelector(
//   [getAnnouncementsState],
//   announcementsState => announcementsState.announcementsSearchResultsLoading
// )

// export const selectAnnouncementsResultsError = createSelector(
//   [getAnnouncementsState],
//   announcementsState => announcementsState.announcementsSearchResultsError
// )
