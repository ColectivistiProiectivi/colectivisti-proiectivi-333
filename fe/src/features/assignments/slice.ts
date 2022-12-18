import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Assignment } from '../../types/Assignment'
import { fetchAssingments } from './actions'

export interface AssignmentsState {
  assignmentsData?: Assignment[]
  assignmentsLoading: boolean
  assignmentsSuccess: boolean
  assignmentsError: boolean
}

const initialState: AssignmentsState = {
  assignmentsData: undefined,
  assignmentsLoading: false,
  assignmentsSuccess: false,
  assignmentsError: false,
}

export const assignmentsSlice = createSlice({
  name: 'assignmentsState',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAssingments.rejected, state => {
        state.assignmentsSuccess = false
        state.assignmentsError = true
        state.assignmentsLoading = false
      })
      .addCase(fetchAssingments.fulfilled, (state, action: PayloadAction<Assignment[]>) => {
        state.assignmentsData = action.payload
        state.assignmentsSuccess = true
        state.assignmentsError = false
        state.assignmentsLoading = false
      })

      .addCase(fetchAssingments.pending, state => {
        state.assignmentsSuccess = false
        state.assignmentsError = false
        state.assignmentsLoading = true
      })
  },
})

export default assignmentsSlice.reducer
