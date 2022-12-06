import { UserDto } from '../../types/User'
import { axiosInstance } from '../../api'
import { AxiosResponse } from 'axios'
import { Response } from '../../types/Response'

export const fetchUserCall = async (): Promise<AxiosResponse<Response<UserDto>>> => axiosInstance.get('/users/profile')
