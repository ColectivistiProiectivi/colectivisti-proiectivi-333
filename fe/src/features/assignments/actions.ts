import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createAssignmentCall,
  deleteAssignmentCall,
  fetchAssignmentsCall,
  fetchMentorStudentsCall,
  updateAssignmentCall,
} from './services'
import { convertFromAsignmentDto, convertFromAssignmentsDto } from './utils'
import { AssignmentRequestDto } from '../../types/Assignment'

export const fetchAssignments = createAsyncThunk('fetchAssignments', async () => {
  const response = await fetchAssignmentsCall()

  return convertFromAssignmentsDto(response.data.value)
})

export const fetchMentorStudents = createAsyncThunk('fetchMentorStudents', async () => {
  const response = await fetchMentorStudentsCall()

  return response.data.value
})

export const createAssignment = createAsyncThunk('createAssignment', async (assignment: AssignmentRequestDto) => {
  const response = await createAssignmentCall(assignment)

  return convertFromAsignmentDto(response.data)
})

export const updateAssignment = createAsyncThunk(
  'updateAssignment',
  async (assignmentUpdateData: { assignment: AssignmentRequestDto; assignmentId: number }) => {
    const response = await updateAssignmentCall(assignmentUpdateData)

    return convertFromAsignmentDto(response.data)
  }
)

export const deleteAssignment = createAsyncThunk('deleteAssignment', async (assignmentId: number) => {
  const response = await deleteAssignmentCall(assignmentId)

  return response.data
})
