import { BaseUser, Role } from '../../types/User'

export const mockStudentsWithUpcomingAppointments: Partial<BaseUser>[] = [
  {
    fullName: 'George',
    email: 'george@email.com',
    role: Role.STUDENT,
  },
  {
    fullName: 'Andrew',
    email: 'andrew@email.com',
    role: Role.STUDENT,
  },
  {
    fullName: 'Theodore',
    email: 'theodore@email.com',
    role: Role.STUDENT,
  },
]
