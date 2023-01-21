import { createAsyncThunk } from '@reduxjs/toolkit'
import { createAppointmentCall, deleteAppointmentCall, fetchAppointmentsCall, updateAppointmentCall } from './services'
import { convertFromAppointmentDto, convertFromAppointmentsDto } from './utils'
import { AppointmentRequestDto } from '../../types/Appointment'

export const fetchAppointments = createAsyncThunk('fetchAppointments', async () => {
  const response = await fetchAppointmentsCall()

  return convertFromAppointmentsDto(response.data.value)
})

export const createAppointment = createAsyncThunk('createAppointment', async (assignment: AppointmentRequestDto) => {
  const response = await createAppointmentCall(assignment)

  return convertFromAppointmentDto(response.data)
})

export const updateAppointment = createAsyncThunk(
  'updateAppointment',
  async (assignmentUpdateData: { assignment: AppointmentRequestDto; assignmentId: number }) => {
    const response = await updateAppointmentCall(assignmentUpdateData)

    return convertFromAppointmentDto(response.data)
  }
)

export const deleteAppointment = createAsyncThunk('deleteAppointment', async (assignmentId: number) => {
  const response = await deleteAppointmentCall(assignmentId)

  return response.data
})
