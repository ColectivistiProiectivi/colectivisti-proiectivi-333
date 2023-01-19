import { Dayjs } from 'dayjs'

export interface Assignment {
  id: number
  title: string
  authorId: number
  startDate: Dayjs
  deadline: Dayjs
  submissions: Submission[]
  studentIds: number[]
  description: string
  maximumGrade: number
}

export interface AssignmentDto {
  id: number
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
