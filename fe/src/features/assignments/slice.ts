import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Assignment } from '../../types/Assignment'
import { createAssignment, deleteAssignment, fetchAssignments, fetchMentorStudents, updateAssignment } from './actions'
import { BaseUser } from '../../types/User'

export interface AssignmentsState {
  assignmentsData: Assignment[]
  assignmentsLoading: boolean
  assignmentsSuccess: boolean
  assignmentsError: boolean
  mentorStudents: BaseUser[]
  mentorStudentsLoading: boolean
  mentorStudentsError: boolean
  createAssignmentLoading: boolean
  createAssignmentError: boolean
  updateAssignmentLoading: boolean
  updateAssignmentError: boolean
  deleteAssignmentLoading: boolean
  deleteAssignmentError: boolean
}

const initialState: AssignmentsState = {
  assignmentsData: [],
  assignmentsLoading: false,
  assignmentsSuccess: false,
  assignmentsError: false,
  mentorStudents: [],
  mentorStudentsLoading: false,
  mentorStudentsError: false,
  createAssignmentLoading: false,
  createAssignmentError: false,
  updateAssignmentLoading: false,
  updateAssignmentError: false,
  deleteAssignmentLoading: false,
  deleteAssignmentError: false,
}

export const assignmentsSlice = createSlice({
  name: 'assignmentsState',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAssignments.rejected, state => {
        state.assignmentsSuccess = false
        state.assignmentsError = true
        state.assignmentsLoading = false
      })
      .addCase(fetchAssignments.fulfilled, (state, action: PayloadAction<Assignment[]>) => {
        state.assignmentsData = action.payload
        state.assignmentsSuccess = true
        state.assignmentsError = false
        state.assignmentsLoading = false
      })
      .addCase(fetchAssignments.pending, state => {
        state.assignmentsSuccess = false
        state.assignmentsError = false
        state.assignmentsLoading = true
      })

      .addCase(fetchMentorStudents.pending, state => {
        state.mentorStudentsLoading = true
        state.mentorStudentsError = false
      })
      .addCase(fetchMentorStudents.fulfilled, (state, action: PayloadAction<BaseUser[]>) => {
        state.mentorStudents = action.payload

        state.mentorStudentsLoading = false
        state.mentorStudentsError = false
      })
      .addCase(fetchMentorStudents.rejected, state => {
        state.mentorStudentsLoading = false
        state.mentorStudentsError = true
      })

      .addCase(createAssignment.pending, state => {
        state.createAssignmentLoading = true
        state.createAssignmentError = false
      })
      .addCase(createAssignment.fulfilled, (state, action: PayloadAction<Assignment>) => {
        // TODO: Use this for update
        // state.assignmentsData = state.assignmentsData.map(assignment =>
        //   assignment.id === action.payload.id ? action.payload : assignment
        // )
        state.assignmentsData = [...state.assignmentsData, action.payload]

        state.createAssignmentLoading = false
        state.createAssignmentError = false
      })

      .addCase(updateAssignment.pending, state => {
        state.updateAssignmentLoading = true
        state.updateAssignmentError = false
      })
      .addCase(updateAssignment.fulfilled, (state, action: PayloadAction<Assignment>) => {
        state.assignmentsData = state.assignmentsData.map(assignment =>
          assignment.id === action.payload.id ? action.payload : assignment
        )

        state.updateAssignmentLoading = false
        state.updateAssignmentError = false
      })

      .addCase(deleteAssignment.pending, state => {
        state.updateAssignmentLoading = true
        state.updateAssignmentError = false
      })
      .addCase(deleteAssignment.fulfilled, (state, action: PayloadAction<number>) => {
        // Note: action.payload is the id of the removed assignment
        state.assignmentsData = state.assignmentsData.filter(assignment => assignment.id !== action.payload)

        state.updateAssignmentLoading = true
        state.updateAssignmentError = false
      })
  },
})

export default assignmentsSlice.reducer
