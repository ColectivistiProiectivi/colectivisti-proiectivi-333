export interface User {
  fullName: string
  email: string
  password: string
  isMentor: boolean
  profilePic?: File
  interestAreas?: string[]
}
