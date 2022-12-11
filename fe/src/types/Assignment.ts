import { Dayjs } from 'dayjs'

export interface AssignedUser {
  userId: number
  score?: number
}

export interface Assignment {
  id: number
  title: string
  startDate: Dayjs
  deadline: Dayjs
  assignedTo: AssignedUser[]
  description: string
  maximumGrade: number // default 10
}

export interface AssignmentDto {
  id: number
  title: string
  startDate: string
  deadline: string
  assignedTo: AssignedUser[]
  description: string
  maximumGrade: number
}
