import { Dayjs } from 'dayjs'

export interface UserAppointment {
  id: number
  fullName: string
}

export interface Appointment {
  id: number
  student: UserAppointment
  mentor: UserAppointment
  date: Dayjs
  locationDetails: string
}

export interface AppointmentResponseDto {
  id: number
  student: UserAppointment
  mentor: UserAppointment
  date: string
  locationDetails: string
}

export interface AppointmentRequestDto {
  id: number
  student: UserAppointment
  mentor: UserAppointment
  date: string
  locationDetails: string
}
