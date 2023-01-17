import { AnnouncementDto } from '../../types/Announcements'
import { Response } from '../../types/Response'

type mockAxiosResponse<T> = {
  data: T
}

const mockAnnouncementResponse: mockAxiosResponse<Response<AnnouncementDto[]>> = {
  data: {
    value: [
      {
        id: 1,
        title: 'Do the math',
        createdAtDate: '17/01/2023',
        user: { id: 1, fullName: 'Catinas Teodora', profilePicture: 'profile/picture' },
        interestAreas: { id: 1, name: 'Maths' },
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.',
        price: 60,
      },
      {
        id: 2,
        title: 'Do the math',
        createdAtDate: '17/01/2023',
        user: { id: 1, fullName: 'Catinas Teodora', profilePicture: 'profile/picture' },
        interestAreas: { id: 1, name: 'Maths' },
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.',
        price: 60,
      },
      {
        id: 3,
        title: 'Do the math',
        createdAtDate: '17/01/2023',
        user: { id: 1, fullName: 'Catinas Teodora', profilePicture: 'profile/picture' },
        interestAreas: { id: 1, name: 'Maths' },
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.',
        price: 60,
      },
      {
        id: 4,
        title: 'Do the math',
        createdAtDate: '17/01/2023',
        user: { id: 1, fullName: 'Catinas Teodora', profilePicture: 'profile/picture' },
        interestAreas: { id: 1, name: 'Maths' },
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.',
        price: 60,
      },
      {
        id: 5,
        title: 'Do the math',
        createdAtDate: '17/01/2023',
        user: { id: 1, fullName: 'Catinas Teodora', profilePicture: 'profile/picture' },
        interestAreas: { id: 1, name: 'Maths' },
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.',
        price: 60,
      },
    ],
    errorMessage: undefined,
  },
}

export const fetchAnnouncementsCall = async (): Promise<mockAxiosResponse<Response<AnnouncementDto[]>>> =>
  mockAnnouncementResponse
