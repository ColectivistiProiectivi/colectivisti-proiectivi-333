import React from 'react'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { alpha, Avatar, Divider, IconButton, styled, Tooltip, Typography } from '@mui/material'
import { AssignmentCategory } from '../AssignmentsPage'

import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { initialPictureURL } from '../../account/utils'
import { Assignment } from '../../../types/Assignment'

dayjs.extend(LocalizedFormat)

interface MentorAssignmentCardProps extends Assignment {
  category: AssignmentCategory
  onViewClick: () => void
  onUpdateClick: () => void
  onDeleteClick: () => void
}

export const MentorAssignmentCard: React.FC<MentorAssignmentCardProps> = ({
  title,
  startDate,
  deadline,
  studentIds,
  category,
  onViewClick,
  onUpdateClick,
  onDeleteClick,
}) => {
  // TODO: same with create assignment, retrieve students the mentor has appointments with
  // const _users: User[] = []

  const date = {
    [AssignmentCategory.NOT_STARTED]: (
      <>
        <StyledLabel variant="overline">Starting on</StyledLabel>
        <Typography variant="body2">{startDate.format('LLLL')}</Typography>
      </>
    ),
    [AssignmentCategory.ONGOING]: (
      <>
        <StyledLabel variant="overline">Due</StyledLabel>
        <Typography variant="body2">{deadline.format('LLLL')}</Typography>
      </>
    ),
    [AssignmentCategory.FINISHED]: (
      <>
        <StyledLabel variant="overline">Finished on</StyledLabel>
        <Typography variant="body2">{deadline.format('LLLL')}</Typography>
      </>
    ),
  }[category]

  return (
    <Wrapper>
      <Left>
        <CardItem>
          <StyledLabel variant="overline">Title</StyledLabel>
          <Title variant="h6">{title}</Title>
        </CardItem>
        <CardItem>{date}</CardItem>
        <CardItem>
          <StyledLabel variant="overline">Assigned Students</StyledLabel>
          <AssignedUsers>
            {studentIds.map(assignedUserId => (
              <Tooltip key={assignedUserId} title="user name">
                <AssignedUsersAvatar
                  // src={users?.find(user_ => user_.id === assignedUser.userId)?.profilePicture}
                  src={initialPictureURL}
                />
              </Tooltip>
            ))}
          </AssignedUsers>
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
          <Tooltip title="Update assignment">
            <IconButton size="large" onClick={onUpdateClick}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancel assignment">
            <IconButton size="large" color="error" onClick={onDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </ActionButtons>
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

const AssignedUsers = styled('div')`
  display: flex;
  gap: 4px;
`

const AssignedUsersAvatar = styled(Avatar)`
  width: 35px;
  height: 35px;
  cursor: pointer;
`

const StyledLabel = styled(Typography)`
  color: #777;
`

const CardItem = styled('div')`
  display: flex;
  flex-direction: column;
`
