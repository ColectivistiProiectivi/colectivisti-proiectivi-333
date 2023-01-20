import { Assignment } from '../../types/Assignment'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { AssignmentCategory } from './AssignmentsPage'

export const useAssignmentsFiltered = (assignmentsData?: Assignment[]) => {
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

  const assignmentsNotStarted = useMemo(
    () =>
      assignmentsData && [
        ...assignmentsData.filter(assignment => assignmentFilterPredicate(AssignmentCategory.NOT_STARTED, assignment)),
      ],
    [assignmentsData]
  )

  const assignmentsOngoing = useMemo(
    () =>
      assignmentsData && [
        ...assignmentsData.filter(assignment => assignmentFilterPredicate(AssignmentCategory.ONGOING, assignment)),
      ],
    [assignmentsData]
  )

  const assignmentsFinished = useMemo(
    () =>
      assignmentsData && [
        ...assignmentsData.filter(assignment => assignmentFilterPredicate(AssignmentCategory.FINISHED, assignment)),
      ],
    [assignmentsData]
  )

  return { assignmentsNotStarted, assignmentsOngoing, assignmentsFinished }
}
