import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAppointment, deleteAppointment, fetchAppointments, updateAppointment } from './actions'
import { Appointment } from '../../types/Appointment'

export interface AppointmentsState {
  appointmentsData: Appointment[]
  appointmentsLoading: boolean
  appointmentsSuccess: boolean
  appointmentsError: boolean
  createAppointmentLoading: boolean
  createAppointmentError: boolean
  updateAppointmentLoading: boolean
  updateAppointmentError: boolean
  deleteAppointmentLoading: boolean
  deleteAppointmentError: boolean
}

const initialState: AppointmentsState = {
  appointmentsData: [],
  appointmentsLoading: false,
  appointmentsSuccess: false,
  appointmentsError: false,
  createAppointmentLoading: false,
  createAppointmentError: false,
  updateAppointmentLoading: false,
  updateAppointmentError: false,
  deleteAppointmentLoading: false,
  deleteAppointmentError: false,
}

export const appointmentsSlice = createSlice({
  name: 'appointmentsState',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAppointments.rejected, state => {
        state.appointmentsSuccess = false
        state.appointmentsError = true
        state.appointmentsLoading = false
      })
      .addCase(fetchAppointments.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
        state.appointmentsData = action.payload
        state.appointmentsSuccess = true
        state.appointmentsError = false
        state.appointmentsLoading = false
      })
      .addCase(fetchAppointments.pending, state => {
        state.appointmentsSuccess = false
        state.appointmentsError = false
        state.appointmentsLoading = true
      })
      .addCase(createAppointment.pending, state => {
        state.createAppointmentLoading = true
        state.createAppointmentError = false
      })
      .addCase(createAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
        state.appointmentsData = [...state.appointmentsData, action.payload]

        state.createAppointmentLoading = false
        state.createAppointmentError = false
      })

      .addCase(updateAppointment.pending, state => {
        state.updateAppointmentLoading = true
        state.updateAppointmentError = false
      })
      .addCase(updateAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
        state.appointmentsData = state.appointmentsData.map(assignment =>
          assignment.id === action.payload.id ? action.payload : assignment
        )

        state.updateAppointmentLoading = false
        state.updateAppointmentError = false
      })

      .addCase(deleteAppointment.pending, state => {
        state.updateAppointmentLoading = true
        state.updateAppointmentError = false
      })
      .addCase(deleteAppointment.fulfilled, (state, action: PayloadAction<number>) => {
        // Note: action.payload is the id of the removed assignment
        state.appointmentsData = state.appointmentsData.filter(assignment => assignment.id !== action.payload)

        state.updateAppointmentLoading = true
        state.updateAppointmentError = false
      })
  },
})

export default appointmentsSlice.reducer
