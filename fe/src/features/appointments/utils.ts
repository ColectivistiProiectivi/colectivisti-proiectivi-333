import { Appointment, AppointmentResponseDto } from '../../types/Appointment'
import dayjs from 'dayjs'

export const convertFromAppointmentsDto = (appointmentsDto: AppointmentResponseDto[]): Appointment[] => {
  return appointmentsDto.map(appointmentDto => ({
    ...appointmentDto,
    date: dayjs(appointmentDto.date, 'YYYY-MM-DD HH:mm'),
  }))
}

export const convertFromAppointmentDto = (appointmentDto: AppointmentResponseDto): Appointment => {
  return {
    ...appointmentDto,
    date: dayjs(appointmentDto.date, 'YYYY-MM-DD HH:mm'),
  }
}
