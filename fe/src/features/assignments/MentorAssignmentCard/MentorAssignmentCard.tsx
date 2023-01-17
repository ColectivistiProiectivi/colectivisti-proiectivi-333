import React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { AssignedUser } from '../../../types/Assignment'
import { alpha, Avatar, IconButton, styled, Typography } from '@mui/material'
import { AssignmentCategory } from '../AssignmentsPage'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

dayjs.extend(LocalizedFormat)

interface AssignmentCardProps {
  title: string
  description: string
  maxGrade: number
  startDate: Dayjs
  deadline: Dayjs
  assignedTo: AssignedUser[]
  category: AssignmentCategory
}

export const MentorAssignmentCard: React.FC<AssignmentCardProps> = ({
  title,
  description,
  maxGrade,
  startDate,
  deadline,
  assignedTo,
  category,
}) => {
  // const _users: User[] = []

  const date = {
    [AssignmentCategory.NOT_STARTED]: `Starting on ${startDate.format('LLLL')}`,
    [AssignmentCategory.ONGOING]: `Due ${deadline.format('LLLL')}`,
    [AssignmentCategory.FINISHED]: `Finished on ${deadline.format('LLLL')}`,
  }[category]

  return (
    <Wrapper>
      <Header>
        <Title variant="h6">{title}</Title>
        <Typography variant="body2">{date}</Typography>
      </Header>
      <AssignedUsers>
        {assignedTo.map(assignedUser => (
          <AssignedUsersAvatar
            key={assignedUser.userId}
            // src={users?.find(user_ => user_.id === assignedUser.userId)?.profilePicture}
          />
        ))}
      </AssignedUsers>
      <Body>
        <Typography variant="body2">{description}</Typography>
      </Body>
      <Footer>
        <Typography variant="body2" color="gray">
          Maximum grade: {maxGrade}
        </Typography>
        <ActionButtons>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </ActionButtons>
      </Footer>
    </Wrapper>
  )
}

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  gap: 5px;
  width: 100%;
  height: 220px;
  // WIP design
  box-shadow: rgba(17, 17, 26, 0.1) 0 2px 8px, rgba(17, 17, 26, 0.05) 0 4px 16px;
  background: ${props => alpha(props.theme.palette.secondary.main, 0.05)};
  border-radius: 4px;
  // border: 2px solid ${props => alpha(props.theme.palette.common.black, 0.25)};
`

const Header = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Body = styled('div')`
  height: 100px;
  padding: 10px 0;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Footer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled(Typography)`
  font-weight: bold;
`

const ActionButtons = styled('div')`
  display: flex;
`

const AssignedUsers = styled('div')`
  display: flex;
  gap: 4px;
`

const AssignedUsersAvatar = styled(Avatar)`
  width: 20px;
  height: 20px;
`
