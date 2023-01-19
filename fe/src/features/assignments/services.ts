import { Response } from '../../types/Response'
import { AssignmentDto } from '../../types/Assignment'
import { mockAssignments } from './mock-objects'

type mockAxiosResponse<T> = {
  data: T
}

const mockAssignmentResponse: mockAxiosResponse<Response<AssignmentDto[]>> = {
  data: {
    value: mockAssignments,
    errorMessage: undefined,
  },
}

export const fetchAssignmentsCall = async (): Promise<mockAxiosResponse<Response<AssignmentDto[]>>> =>
  mockAssignmentResponse
