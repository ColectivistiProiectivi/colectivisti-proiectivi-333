import dayjs from 'dayjs'
import React, { useEffect, useMemo, useState } from 'react'
import { styled, Tabs, Tab, Typography, css } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAssignmentsData, selectAssignmentsError, selectAssignmentsLoading } from './selectors'
import { fetchAssingments } from './actions'

import { Loader } from '../common/Loader'
import { AssignmentCard } from './AssignmentCard'
import { Assignment } from '../../types/Assignment'

export enum AssignmentCategory {
  NOT_STARTED,
  ONGOING,
  FINISHED,
}

const AssignmentsPage: React.FC = () => {
  const dispatch = useAppDispatch()

  const assignmentsLoading = useAppSelector(selectAssignmentsLoading)
  const assignmentsError = useAppSelector(selectAssignmentsError)
  const assignmentsData = useAppSelector(selectAssignmentsData)

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

  // Load assignments data on page load
  useEffect(() => {
    dispatch(fetchAssingments())
  }, [])

  const [selectedCategory, setSelectedCategory] = useState(AssignmentCategory.NOT_STARTED)

  const handleCategorySelection = (_event: React.SyntheticEvent, newSelectedCategory: AssignmentCategory) => {
    setSelectedCategory(newSelectedCategory)
  }

  if (assignmentsLoading) {
    return <Loader fullscreen={true} />
  }

  if (assignmentsError || !assignmentsData) {
    return null
  }

  const renderAssignments = (assignments?: Assignment[], categoryIndex?: number) => {
    if (assignments?.length && categoryIndex === selectedCategory) {
      return (
        <Assignments key={categoryIndex} role="tabpanel">
          {assignments.map(assignment => (
            <AssignmentCard
              key={assignment.id}
              title={assignment.title}
              description={assignment.description}
              maxGrade={assignment.maximumGrade}
              startDate={assignment.startDate}
              deadline={assignment.deadline}
              assignedTo={assignment.assignedTo}
              category={selectedCategory}
            />
          ))}
        </Assignments>
      )
    }

    if (categoryIndex === selectedCategory) {
      return (
        <EmptyAssignmentsText key={categoryIndex} variant="body1">
          No assignments here yet
        </EmptyAssignmentsText>
      )
    }

    return null
  }

  return (
    <Container>
      <Title variant="overline">Assignments</Title>
      <Tabs value={selectedCategory} onChange={handleCategorySelection} indicatorColor="secondary">
        <StyledTab label="Not started" aria-selected={AssignmentCategory.NOT_STARTED === selectedCategory} />
        <StyledTab label="Ongoing" aria-selected={AssignmentCategory.ONGOING === selectedCategory} />
        <StyledTab label="Finished" aria-selected={AssignmentCategory.FINISHED === selectedCategory} />
      </Tabs>
      {[assignmentsNotStarted, assignmentsOngoing, assignmentsFinished].map(renderAssignments)}
    </Container>
  )
}

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const Title = styled(Typography)`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
`

const Assignments = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 50%;
  margin-top: 20px;
`

const EmptyAssignmentsText = styled(Typography)`
  margin: 20px 0;
`

const StyledTab = styled(Tab)`
  ${props =>
    props['aria-selected'] &&
    css`
      color: ${props.theme.palette.secondary.main} !important;
    `}
`

export default AssignmentsPage
