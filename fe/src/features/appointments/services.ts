import { Response } from '../../types/Response'
import { AppointmentRequestDto, AppointmentResponseDto } from '../../types/Appointment'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '../../api'

export const fetchAppointmentsCall = async (): Promise<AxiosResponse<Response<AppointmentResponseDto[]>>> =>
  axiosInstance.get('/appointments')

export const createAppointmentCall = async (
  assignment: AppointmentRequestDto
): Promise<AxiosResponse<AppointmentResponseDto>> => axiosInstance.post('/appointments', assignment)

export const updateAppointmentCall = async ({
  assignment,
  assignmentId,
}: {
  assignment: AppointmentRequestDto
  assignmentId: number
}): Promise<AxiosResponse<AppointmentResponseDto>> => axiosInstance.put(`/appointments/${assignmentId}`, assignment)

export const deleteAppointmentCall = async (assignmentId: number): Promise<AxiosResponse<number>> =>
  axiosInstance.delete(`/appointments/${assignmentId}`)
