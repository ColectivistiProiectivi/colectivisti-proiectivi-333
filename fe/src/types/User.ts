export enum Role {
  STUDENT = 'STUDENT',
  MENTOR = 'MENTOR',
}

export interface BaseUser {
  fullName: string
  email: string
  password: string
  role: Role
}

export interface User extends BaseUser {
  profilePicture: string
  completedStudies: string[]
  ongoingStudy: string
  interestAreas: string[]
  description: string
  birthdate: string
}

export type UserDto = Partial<User>

export interface RegisterUserDTO {
  fullName: string
  username: string
  password: string
  role: Role
}

export interface LoginUserDTO {
  email: string
  password: string
}

export interface LoginResponseBody {
  value: string // JWT token
  email: string
}

export interface AuthProps {
  jwtToken: string
  user: string
}
