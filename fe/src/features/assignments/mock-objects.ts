import { BaseUser, Role } from '../../types/User'
import { AssignmentDto, Submission } from '../../types/Assignment'

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

export const mockAssignments: AssignmentDto[] = [
  {
    id: 1,
    authorId: 1,
    title: 'Do the math',
    studentIds: [1, 2],
    submissions: mockSubmissions,
    startDate: '01/12/2022',
    deadline: '25/12/2023',
    description: '1 + 1 = ?',
    maximumGrade: 10,
  },
  {
    id: 2,
    authorId: 1,
    title: 'Big brain, much wow',
    studentIds: [2, 3, 4],
    submissions: mockSubmissions,
    startDate: '10/12/2022',
    deadline: '12/12/2023',
    description: 'How many legs does the chicken have?',
    maximumGrade: 10,
  },
  {
    id: 3,
    authorId: 1,
    title: 'Do the equation',
    studentIds: [3, 2, 1, 5],
    submissions: mockSubmissions,
    startDate: '22/12/2023',
    deadline: '30/12/2023',
    description: 'How many chicken does the man have?',
    maximumGrade: 10,
  },
  {
    id: 4,
    authorId: 1,
    title: 'Mandatory lab',
    studentIds: [4, 3, 1],
    submissions: mockSubmissions,
    startDate: '22/12/2022',
    deadline: '30/12/2022',
    description: 'How many chicken does the man have?',
    maximumGrade: 10,
  },
  {
    id: 5,
    authorId: 1,
    title: 'Mandatory lab',
    studentIds: [4, 2],
    submissions: mockSubmissions,
    startDate: '01/12/2022',
    deadline: '05/12/2022',
    description: 'How many chicken does the man have?',
    maximumGrade: 10,
  },
]
