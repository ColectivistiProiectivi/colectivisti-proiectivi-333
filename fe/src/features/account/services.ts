import { InterestArea, Study, UserDto } from '../../types/User'
import { axiosInstance } from '../../api'
import { AxiosResponse } from 'axios'
import { Response } from '../../types/Response'
import { ProfileSubmitType } from './ProfilePage'

export const fetchUserCall = async (): Promise<AxiosResponse<Response<UserDto>>> => axiosInstance.get('/users/profile')

export const updateUserCall = async (usersFormData: ProfileSubmitType): Promise<AxiosResponse<Response<UserDto>>> =>
  axiosInstance.put('/users/profile', usersFormData, { headers: { 'Content-Type': 'multipart/form-data' } })

export const fetchUserAvatarCall = async (): Promise<AxiosResponse<Blob>> =>
  axiosInstance.get('/users/profile/picture', { responseType: 'blob' })

export const fetchCompletedStudiesOptionsCall = async (): Promise<AxiosResponse<Response<Study[]>>> =>
  axiosInstance.get('/studies')

export const fetchInterestAreasOptionsCall = async (): Promise<AxiosResponse<Response<InterestArea[]>>> =>
  axiosInstance.get('/interest-areas')
