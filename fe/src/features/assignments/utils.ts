import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Assignment, AssignmentDto } from '../../types/Assignment'

dayjs.extend(customParseFormat)

export const convertFromAssignmentsDto = (assignmentsDto: AssignmentDto[]): Assignment[] => {
  return assignmentsDto.map(assignmentDto => ({
    ...assignmentDto,
    deadline: dayjs(assignmentDto.deadline, 'DD/MM/YYYY'),
    startDate: dayjs(assignmentDto.startDate, 'DD/MM/YYYY'),
  }))
}
