import { Dayjs } from 'dayjs'
import { BaseUser } from './User'

export interface Assignment {
  id: number
  title: string
  author: BaseUser
  startDate: Dayjs
  deadline: Dayjs
  submissions: Submission[]
  studentIds: number[]
  description: string
  maximumGrade: number
}

export interface AssignmentResponseDto {
  id: number
  title: string
  author: BaseUser
  startDate: string
  deadline: string
  students: BaseUser[]
  submissions: Submission[]
  description: string
  maximumGrade: number
}

export interface AssignmentRequestDto {
  title: string
  authorId: number
  startDate: string
  deadline: string
  studentIds: number[]
  submissions: Submission[]
  description: string
  maximumGrade: number
}

export interface Submission {
  studentId: number
  homeworkURL: string
  grade: number
  feedback: string
}
