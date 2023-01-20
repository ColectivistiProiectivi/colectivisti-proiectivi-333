import React from 'react'
import { alpha, Divider, IconButton, styled, Tooltip, Typography } from '@mui/material'
import { AssignmentCategory } from '../AssignmentsPage'
import { Assignment } from '../../../types/Assignment'

import { useAppSelector } from '../../../redux/hooks'
import { selectUserData } from '../../account/selectors'
import { lightBlue, orange } from '@mui/material/colors'

import VisibilityIcon from '@mui/icons-material/Visibility'
import DoneIcon from '@mui/icons-material/Done'
import PendingActionsIcon from '@mui/icons-material/PendingActions'

interface StudentAssignmentCardProps {
  assignment: Assignment
  category: AssignmentCategory
  onViewClick: () => void
}

export const StudentAssignmentCard: React.FC<StudentAssignmentCardProps> = ({ assignment, category, onViewClick }) => {
  const userData = useAppSelector(selectUserData)

  const date = {
    [AssignmentCategory.NOT_STARTED]: (
      <>
        <StyledLabel variant="overline">Starting on</StyledLabel>
        <Typography variant="body2">{assignment.startDate.format('LLLL')}</Typography>
      </>
    ),
    [AssignmentCategory.ONGOING]: (
      <>
        <StyledLabel variant="overline">Due</StyledLabel>
        <Typography variant="body2">{assignment.deadline.format('LLLL')}</Typography>
      </>
    ),
    [AssignmentCategory.FINISHED]: (
      <>
        <StyledLabel variant="overline">Finished on</StyledLabel>
        <Typography variant="body2">{assignment.deadline.format('LLLL')}</Typography>
      </>
    ),
  }[category]

  const hasSubmissions = assignment.submissions.find(submission => submission.studentId === userData?.id)

  return (
    <Wrapper>
      <Left>
        <CardItem>
          <StyledLabel variant="overline">Title</StyledLabel>
          <Title variant="h6">{assignment.title}</Title>
        </CardItem>
        <CardItem>{date}</CardItem>
        <CardItem>
          <StyledLabel variant="overline">Mentor&#39;s Name</StyledLabel>
          {assignment.author.fullName}
        </CardItem>

        {/* TODO: Move description / grade to modal update modal */}
        {/*<Typography variant="body2">{description}</Typography>*/}
        {/*<Typography variant="body2" color="gray">*/}
        {/*  Maximum grade: {maxGrade}*/}
        {/*</Typography>*/}
      </Left>
      <Divider orientation="vertical" />
      <Right>
        <StyledLabel variant="overline">Actions</StyledLabel>

        <ActionButtons>
          <Tooltip title="View / Grade students' work">
            <IconButton size="large" onClick={onViewClick}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </ActionButtons>
        <StatusCardItem>
          <StyledLabel variant="overline">Status</StyledLabel>
          <Status variant="body2" sx={{ color: hasSubmissions ? lightBlue[500] : orange[400] }}>
            {hasSubmissions ? (
              <Tooltip title="Turned In">
                <DoneIcon />
              </Tooltip>
            ) : (
              <Tooltip title="Not Turned In">
                <PendingActionsIcon />
              </Tooltip>
            )}
          </Status>
        </StatusCardItem>
      </Right>
    </Wrapper>
  )
}

const Wrapper = styled('div')`
  display: flex;
  padding: 20px;
  gap: 5px;
  width: 100%;
  height: 240px;
  // WIP design
  box-shadow: rgba(17, 17, 26, 0.1) 0 2px 8px, rgba(17, 17, 26, 0.05) 0 4px 16px;
  background: ${alpha('#ddd', 0.05)};
  border-radius: 4px;
  // border: 2px solid ${props => alpha(props.theme.palette.common.black, 0.15)};
`

const Left = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
`

const Right = styled('div')`
  display: flex;
  width: 30%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const Title = styled(Typography)`
  font-weight: bold;
`

const ActionButtons = styled('div')`
  display: flex;
  align-items: center;
`

const StyledLabel = styled(Typography)`
  color: #777;
`

const CardItem = styled('div')`
  display: flex;
  flex-direction: column;
`

const StatusCardItem = styled(CardItem)`
  align-items: center;
`

const Status = styled(Typography)`
  display: flex;
  align-items: center;
  gap: 5px;
`
