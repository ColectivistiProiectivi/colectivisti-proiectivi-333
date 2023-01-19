import React, { useEffect, useState } from 'react'
import { styled, Tabs, Tab, Typography, css, Button } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAssignmentsData, selectAssignmentsError, selectAssignmentsLoading } from './selectors'
import { fetchAssingments } from './actions'

import { Loader } from '../common/Loader'
import { MentorAssignmentCard } from './MentorAssignmentCard'
import { Assignment } from '../../types/Assignment'
import { useAssignmentsFiltered } from './hooks'
import { Role } from '../../types/User'

import AddIcon from '@mui/icons-material/Add'
import { CreateAssignmentModal } from './CreateAssignmentModal'
import { selectUserData } from '../account/selectors'
import { ViewAssignmentModal } from './ViewAssignmentModal'
import { mockStudentsWithUpcomingAppointments } from './mock-objects'

export enum AssignmentCategory {
  NOT_STARTED,
  ONGOING,
  FINISHED,
}

const AssignmentsPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector(selectUserData)
  const role = userData?.role
  const userId = userData?.id

  const assignmentsLoading = useAppSelector(selectAssignmentsLoading)
  const assignmentsError = useAppSelector(selectAssignmentsError)
  const assignmentsData = useAppSelector(selectAssignmentsData)

  const { assignmentsNotStarted, assignmentsOngoing, assignmentsFinished } = useAssignmentsFiltered(assignmentsData)

  // Students that made at least one appointment with the current mentor (requires BE endpoint)
  const [students, _setStudents] = useState(() => mockStudentsWithUpcomingAppointments)

  // Create Assignment Section [Mentor]
  const [createAssignmentOpen, setCreateAssignmentOpen] = useState(false)
  const shouldOpenCreateAssignmentModal = role === Role.MENTOR && createAssignmentOpen

  // Update Assignment Section [Mentor]
  const [updatedAssignment, setUpdatedAssignment] = useState<Assignment | undefined>(undefined)

  const handleOpenAssignmentWhenUpdate = (assignment: Assignment) => {
    setUpdatedAssignment(assignment)
    setCreateAssignmentOpen(true)
  }

  const handleCloseCreateAssignment = () => {
    setCreateAssignmentOpen(false)
    setUpdatedAssignment(undefined)
  }

  // View Assignment Section [Mentor]
  // The boolean determining the user sees the modal or not
  const [viewAssignmentOpen, setViewAssignmentOpen] = useState(false)

  // The selected object
  const [viewedAssignment, setViewedAssignment] = useState<Assignment | undefined>(undefined)
  const shouldOpenViewAssignmentModal = role === Role.MENTOR && viewAssignmentOpen

  const handleOpenViewAssignmentModal = (assignment: Assignment) => {
    setViewedAssignment(assignment)
    setViewAssignmentOpen(true)
  }

  const handleCloseViewAssignment = () => {
    setViewAssignmentOpen(false)
    setViewedAssignment(undefined)
  }

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

  if (assignmentsError || !assignmentsData || !role || !userId) {
    return null
  }

  const renderAssignments = (assignments?: Assignment[], categoryIndex?: number) => {
    if (categoryIndex !== selectedCategory) {
      return null
    }

    if (assignments?.length) {
      return (
        <Assignments key={categoryIndex} role="tabpanel">
          {assignments.map((assignment, idx) => (
            <MentorAssignmentCard
              key={idx}
              id={assignment.id}
              title={assignment.title}
              authorId={userId}
              description={assignment.description}
              maximumGrade={assignment.maximumGrade}
              startDate={assignment.startDate}
              deadline={assignment.deadline}
              studentIds={assignment.studentIds}
              submissions={assignment.submissions}
              category={selectedCategory}
              onViewClick={() => handleOpenViewAssignmentModal(assignment)}
              onUpdateClick={() => handleOpenAssignmentWhenUpdate(assignment)}
              onDeleteClick={() => null} // TODO: Implement delete
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
        handleClose={handleCloseCreateAssignment}
        students={students}
        assignment={updatedAssignment}
      />
      <ViewAssignmentModal
        isOpened={shouldOpenViewAssignmentModal}
        handleClose={handleCloseViewAssignment}
        students={students}
        assignment={viewedAssignment}
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
`

const Title = styled(Typography)`
  font-weight: bold;
  font-size: 24px;
`

const Assignments = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 600px;
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
  margin: 45px 0;
  padding: 30px;
  width: 500px;
  display: flex;
  gap: 5px;
  font-size: 16px;
`

export default AssignmentsPage
