import { AxiosResponse } from 'axios'
import { axiosInstance } from '../../api'
import { AnnouncementDto } from '../../types/Announcements'

export const fetchAnnouncementsCall = async (): Promise<AxiosResponse<AnnouncementDto[]>> =>
  axiosInstance.get('/announcements')

export const fetchFilterAnnouncementsCall = async (text: string): Promise<AxiosResponse<AnnouncementDto[]>> =>
  axiosInstance.get(`/announcements/filter?q=${text}`)

export const fetchDeleteAnnouncementsCall = async (id: number) => axiosInstance.delete(`/announcements/${id}`)
