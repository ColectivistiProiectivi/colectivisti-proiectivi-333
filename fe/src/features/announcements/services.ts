import { AxiosResponse } from 'axios'
import { axiosInstance } from '../../api'
import { AnnouncementDto, Submission, UpdateSubmission } from '../../types/Announcements'

export const fetchAnnouncementsCall = async (): Promise<AxiosResponse<AnnouncementDto[]>> =>
  axiosInstance.get('/announcements')

export const fetchFilterAnnouncementsCall = async (text: string): Promise<AxiosResponse<AnnouncementDto[]>> =>
  axiosInstance.get(`/announcements/filter?q=${text}`)

export const fetchDeleteAnnouncementsCall = async (id: number) => axiosInstance.delete(`/announcements/${id}`)

export const fetchAddAnnouncementCall = async (ann: Submission) => axiosInstance.post('/announcements/', ann)

export const fetchUpdateAnnouncementCall = async (ann: UpdateSubmission) =>
  axiosInstance.put(`/announcements/${ann.id}`, ann)
