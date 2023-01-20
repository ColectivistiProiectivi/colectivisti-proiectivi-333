import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Assignment, AssignmentResponseDto } from '../../types/Assignment'
import { AssignmentCategory } from './AssignmentsPage'

dayjs.extend(customParseFormat)

export const convertFromAssignmentsDto = (assignmentsDto: AssignmentResponseDto[]): Assignment[] => {
  return assignmentsDto.map(assignmentDto => ({
    ...assignmentDto,
    authorId: assignmentDto.author.id,
    studentIds: assignmentDto.students.map(student => student.id),
    deadline: dayjs(assignmentDto.deadline, 'YYYY-MM-DD HH:mm'),
    startDate: dayjs(assignmentDto.startDate, 'YYYY-MM-DD HH:mm'),
  }))
}

export const convertFromAsignmentDto = (assignmentDto: AssignmentResponseDto): Assignment => {
  return {
    ...assignmentDto,
    author: assignmentDto.author,
    studentIds: assignmentDto.students.map(student => student.id),
    deadline: dayjs(assignmentDto.deadline, 'YYYY-MM-DD HH:mm'),
    startDate: dayjs(assignmentDto.startDate, 'YYYY-MM-DD HH:mm'),
  }
}

export const getAssignmentsFiltered = (assignmentsData?: Assignment[]) => {
  const assignmentFilterPredicate = (category_: AssignmentCategory, assignment_: Assignment) => {
    const { startDate, deadline } = assignment_
    const now = dayjs()

    if (category_ === AssignmentCategory.NOT_STARTED) {
      return now.isBefore(startDate)
    }

    if (category_ === AssignmentCategory.ONGOING) {
      return (now.isAfter(startDate) || now.isSame(startDate)) && now.isBefore(deadline)
    }

    return now.isAfter(deadline)
  }

  const assignmentsNotStarted = assignmentsData && [
    ...assignmentsData.filter(assignment => assignmentFilterPredicate(AssignmentCategory.NOT_STARTED, assignment)),
  ]

  const assignmentsOngoing = assignmentsData && [
    ...assignmentsData.filter(assignment => assignmentFilterPredicate(AssignmentCategory.ONGOING, assignment)),
  ]

  const assignmentsFinished = assignmentsData && [
    ...assignmentsData.filter(assignment => assignmentFilterPredicate(AssignmentCategory.FINISHED, assignment)),
  ]

  return { assignmentsNotStarted, assignmentsOngoing, assignmentsFinished }
}
