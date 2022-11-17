export enum Role {
  STUDENT = 'STUDENT',
  MENTOR = 'MENTOR',
}

export interface User {
  fullName: string
  email: string
  password: string
  role: Role
  profilePic?: File
  interestAreas?: string[]
}

export interface RegisterUserDTO {
  fullName: string
  username: string
  password: string
  role: Role
}
