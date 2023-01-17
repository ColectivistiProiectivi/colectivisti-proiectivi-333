import React, { useEffect, useState } from 'react'
import { styled, Tabs, Tab, Typography, css, Button } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAssignmentsData, selectAssignmentsError, selectAssignmentsLoading } from './selectors'
import { fetchAssingments } from './actions'

import { Loader } from '../common/Loader'
import { MentorAssignmentCard } from './MentorAssignmentCard'
import { Assignment } from '../../types/Assignment'
import { useAssignmentsFiltered } from './hooks'
import { useAccountRole } from '../common/hooks/useAccountRole'
import { Role } from '../../types/User'

import AddIcon from '@mui/icons-material/Add'
import { CreateAssignmentModal } from './CreateAssignmentModal'

export enum AssignmentCategory {
  NOT_STARTED,
  ONGOING,
  FINISHED,
}

const AssignmentsPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const role = useAccountRole()

  const assignmentsLoading = useAppSelector(selectAssignmentsLoading)
  const assignmentsError = useAppSelector(selectAssignmentsError)
  const assignmentsData = useAppSelector(selectAssignmentsData)

  const { assignmentsNotStarted, assignmentsOngoing, assignmentsFinished } = useAssignmentsFiltered(assignmentsData)

  // Create Assignment Section [Mentor]

  const [createAssignmentOpen, setCreateAssignmentOpen] = useState(false)
  const shouldOpenCreateAssignmentModal = role === Role.MENTOR && createAssignmentOpen

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

  if (assignmentsError || !assignmentsData || !role) {
    return null
  }

  const renderAssignments = (assignments?: Assignment[], categoryIndex?: number) => {
    if (categoryIndex !== selectedCategory) {
      return null
    }

    if (assignments?.length) {
      return (
        <Assignments key={categoryIndex} role="tabpanel">
          {assignments.map(assignment => (
            <MentorAssignmentCard
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

    return (
      <EmptyAssignmentsText key={categoryIndex} variant="body1">
        No assignments here yet
      </EmptyAssignmentsText>
    )
  }

  return (
    <Container>
      <Title variant="overline">Assignments</Title>
      {role === Role.MENTOR && (
        <CreateAssignmentButton variant="outlined" color="secondary" onClick={() => setCreateAssignmentOpen(true)}>
          <AddIcon /> Create Assignment
        </CreateAssignmentButton>
      )}
      <CreateAssignmentModal
        isOpened={shouldOpenCreateAssignmentModal}
        handleClose={() => setCreateAssignmentOpen(false)}
        editMode={false}
      />
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
  gap: 60px;
`

const Title = styled(Typography)`
  font-weight: bold;
  font-size: 24px;
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

const CreateAssignmentButton = styled(Button)`
  padding: 30px;
  width: 500px;
  display: flex;
  gap: 5px;

  font-size: 16px;
`

export default AssignmentsPage
