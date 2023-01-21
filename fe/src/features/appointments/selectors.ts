import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'

const getAppointmentsState = (state: RootState) => state.appointmentsState

export const selectAppointmentsLoading = createSelector(
  [getAppointmentsState],
  appointmentsState => appointmentsState.appointmentsLoading
)

export const selectAppointmentsSuccess = createSelector(
  [getAppointmentsState],
  appointmentsState => appointmentsState.appointmentsSuccess
)

export const selectAppointmentsError = createSelector(
  [getAppointmentsState],
  appointmentsState => appointmentsState.appointmentsError
)

export const selectAppointmentsData = createSelector(
  [getAppointmentsState],
  appointmentsState => appointmentsState.appointmentsData
)
