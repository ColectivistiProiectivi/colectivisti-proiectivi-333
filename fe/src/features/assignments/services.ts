import { Response } from '../../types/Response'
import { AssignmentDto } from '../../types/Assignment'

type mockAxiosResponse<T> = {
  data: T
}

const mockAssignmentResponse: mockAxiosResponse<Response<AssignmentDto[]>> = {
  data: {
    value: [
      {
        id: 1,
        title: 'Do the math',
        assignedTo: [
          { userId: 1, score: 9 },
          { userId: 2, score: 3 },
        ],
        startDate: '01/12/2022',
        deadline: '25/12/2022',
        description: '1 + 1 = ?',
        maximumGrade: 10,
      },
      {
        id: 2,
        title: 'Big brain, much wow',
        assignedTo: [{ userId: 2, score: 7 }],
        startDate: '10/12/2022',
        deadline: '12/12/2022',
        description: 'How many legs does the chicken have?',
        maximumGrade: 10,
      },
      {
        id: 3,
        title: 'Do the equation',
        assignedTo: [{ userId: 3, score: 5 }],
        startDate: '22/12/2022',
        deadline: '30/12/2022',
        description: 'How many chicken does the man have?',
        maximumGrade: 10,
      },
      {
        id: 4,
        title: 'Mandatory lab',
        assignedTo: [{ userId: 4, score: 2 }],
        startDate: '22/12/2022',
        deadline: '30/12/2022',
        description: 'How many chicken does the man have?',
        maximumGrade: 10,
      },
      {
        id: 5,
        title: 'Mandatory lab',
        assignedTo: [{ userId: 4, score: 2 }],
        startDate: '01/12/2022',
        deadline: '05/12/2022',
        description: 'How many chicken does the man have?',
        maximumGrade: 10,
      },
    ],
    errorMessage: undefined,
  },
}

export const fetchAssignmentsCall = async (): Promise<mockAxiosResponse<Response<AssignmentDto[]>>> =>
  mockAssignmentResponse
