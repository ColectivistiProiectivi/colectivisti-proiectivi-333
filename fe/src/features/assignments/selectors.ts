import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'

const getAssignmentsState = (state: RootState) => state.assignmentsState

export const selectAssignmentsLoading = createSelector(
  [getAssignmentsState],
  assignmentsState => assignmentsState.assignmentsLoading
)

export const selectAssignmentsSuccess = createSelector(
  [getAssignmentsState],
  assignmentsState => assignmentsState.assignmentsSuccess
)

export const selectAssignmentsError = createSelector(
  [getAssignmentsState],
  assignmentsState => assignmentsState.assignmentsError
)

export const selectAssignmentsData = createSelector(
  [getAssignmentsState],
  assignmentsState => assignmentsState.assignmentsData
)

export const selectMentorStudents = createSelector(
  [getAssignmentsState],
  assignmentsState => assignmentsState.mentorStudents
)

export const selectMentorStudentsLoading = createSelector(
  [getAssignmentsState],
  assignmentsState => assignmentsState.mentorStudentsLoading
)

export const selectMentorStudentsError = createSelector(
  [getAssignmentsState],
  assignmentsState => assignmentsState.mentorStudentsError
)
