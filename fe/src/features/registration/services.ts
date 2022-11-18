import { RegisterUserDTO, User } from '../../types/User'
import { axiosInstance } from '../../api'

export const addUserCall = async (user: RegisterUserDTO): Promise<User> => axiosInstance.post('/register', user)
