import { AxiosResponse } from 'axios'
import { axiosInstance } from '../../api'
import { AnnouncementDto, Submission, UpdateSubmission } from '../../types/Announcements'

export const fetchAnnouncementsCall = async (): Promise<AxiosResponse<AnnouncementDto[]>> =>
  axiosInstance.get('/announcements')

export const fetchFilterAnnouncementsCall = async (text: string): Promise<AxiosResponse<AnnouncementDto[]>> =>
  axiosInstance.get(`/announcements/filter?q=${text}`)

export const deleteAnnouncementsCall = async (id: number) => axiosInstance.delete(`/announcements/${id}`)

export const addAnnouncementCall = async (ann: Submission): Promise<AxiosResponse<AnnouncementDto>> =>
  axiosInstance.post('/announcements/', ann)

export const updateAnnouncementCall = async (ann: UpdateSubmission): Promise<AxiosResponse<AnnouncementDto>> =>
  axiosInstance.put(`/announcements/${ann.id}`, ann)
