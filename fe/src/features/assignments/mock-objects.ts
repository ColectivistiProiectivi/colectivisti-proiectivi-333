import { BaseUser, Role } from '../../types/User'
import { AssignmentResponseDto, Submission } from '../../types/Assignment'

export const mockStudentsWithUpcomingAppointments: BaseUser[] = [
  {
    id: 1,
    fullName: 'George',
    email: 'george@email.com',
    role: Role.STUDENT,
  },
  {
    id: 2,
    fullName: 'Andrew',
    email: 'andrew@email.com',
    role: Role.STUDENT,
  },
  {
    id: 3,
    fullName: 'Theodore',
    email: 'theodore@email.com',
    role: Role.STUDENT,
  },
]

export const mockSubmissions: Submission[] = [
  {
    studentId: 1,
    homeworkURL: 'https://wetransfer.com',
    grade: 9,
    feedback: 'Good approach!',
  },
  {
    studentId: 2,
    homeworkURL: 'https://wetransfer.com',
    grade: 7,
    feedback: 'The final result was slightly off. Pay attention!',
  },
  {
    studentId: 3,
    homeworkURL: 'https://wetransfer.com',
    grade: 10,
    feedback: 'Nice job!',
  },
]

export const mockStudent1: BaseUser = {
  id: 2,
  fullName: 'Tudor',
  role: Role.STUDENT,
  email: 'tudor@email.com',
}

export const mockStudent2: BaseUser = {
  id: 2,
  fullName: 'Andrei',
  role: Role.STUDENT,
  email: 'Andrei@email.com',
}

export const mockAssignments: AssignmentResponseDto[] = [
  {
    id: 1,
    author: {
      id: 1,
      fullName: 'Minuta',
      role: Role.MENTOR,
      email: 'minuta@email.com',
    },
    title: 'Do the math',
    students: [mockStudent1, mockStudent2],
    submissions: mockSubmissions,
    startDate: '01/12/2022',
    deadline: '25/12/2023',
    description: '1 + 1 = ?',
    maximumGrade: 10,
  },
  {
    id: 2,
    author: {
      id: 1,
      fullName: 'Minuta',
      role: Role.MENTOR,
      email: 'minuta@email.com',
    },
    title: 'Big brain, much wow',
    students: [mockStudent1, mockStudent2],
    submissions: mockSubmissions,
    startDate: '10/12/2022',
    deadline: '12/12/2023',
    description: 'How many legs does the chicken have?',
    maximumGrade: 10,
  },
  {
    id: 3,
    author: {
      id: 1,
      fullName: 'Minuta',
      role: Role.MENTOR,
      email: 'minuta@email.com',
    },
    title: 'Do the equation',
    students: [mockStudent1, mockStudent2],
    submissions: mockSubmissions,
    startDate: '22/12/2023',
    deadline: '30/12/2023',
    description: 'How many chicken does the man have?',
    maximumGrade: 10,
  },
  {
    id: 4,
    author: {
      id: 1,
      fullName: 'Minuta',
      role: Role.MENTOR,
      email: 'minuta@email.com',
    },
    title: 'Mandatory lab',
    students: [mockStudent1, mockStudent2],
    submissions: mockSubmissions,
    startDate: '22/12/2022',
    deadline: '30/12/2022',
    description: 'How many chicken does the man have?',
    maximumGrade: 10,
  },
  {
    id: 5,
    author: {
      id: 1,
      fullName: 'Minuta',
      role: Role.MENTOR,
      email: 'minuta@email.com',
    },
    title: 'Mandatory lab',
    students: [mockStudent1, mockStudent2],
    submissions: mockSubmissions,
    startDate: '01/12/2022',
    deadline: '05/12/2022',
    description: 'How many chicken does the man have?',
    maximumGrade: 10,
  },
]
