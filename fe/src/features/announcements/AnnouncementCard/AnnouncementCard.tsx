import React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'

import { alpha, Avatar, Button, IconButton, styled, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { AnnouncementUserResponseDTO, InterestAreasResponseDTO } from '../../../types/Announcements'
import { useAppSelector } from '../../../redux/hooks'
import { selectUserData } from '../../account/selectors'

dayjs.extend(RelativeTime)

interface AnnouncementsCardProps {
  id: number
  title: string
  description: string
  price: number
  createdBy: AnnouncementUserResponseDTO
  createdAtDate: Dayjs
  interestAreas: InterestAreasResponseDTO
}

export const AnnouncementCard: React.FC<AnnouncementsCardProps> = ({
  id,
  title,
  description,
  price,
  createdBy,
  createdAtDate,
  interestAreas,
}) => {
  const userData = useAppSelector(selectUserData)
  const isMentor = userData?.role === 'MENTOR'

  return (
    <Wrapper key={id}>
      <Section>
        <Profile>
          <AnnouncementUserAvatar variant="square" key={createdBy.id} src={createdBy?.profilePicture} />
          <NameSection>
            <Fullname variant="body2">{createdBy.fullName}</Fullname>
            <Typography variant="body2">{dayjs(createdAtDate).fromNow()}</Typography>
          </NameSection>
        </Profile>
        <InterestArea variant="body2">{interestAreas.name}</InterestArea>
      </Section>
      <Header>
        <Title variant="h6">{title}</Title>
      </Header>
      <Body>
        <Typography variant="body2">{description}</Typography>
      </Body>
      <Footer>
        <Typography variant="body2" color="gray">
          Price: {price} RON/hour
        </Typography>
        {isMentor ? (
          <ActionButtons>
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </ActionButtons>
        ) : (
          <ViewProfileButton>View profile</ViewProfileButton>
        )}
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
  height: 250px;
  // WIP design
  box-shadow: rgba(17, 17, 26, 0.1) 0 2px 8px, rgba(17, 17, 26, 0.05) 0 4px 16px;
  background: ${props => alpha(props.theme.palette.secondary.main, 0.05)};
  border-radius: 4px;
`

const Header = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Body = styled('div')`
  height: 150px;
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

const Fullname = styled(Typography)`
  font-weight: bold;
`

const InterestArea = styled(Typography)`
  font-weight: bold;
  font-style: italic;
`

const ActionButtons = styled('div')`
  display: flex;
`

const Section = styled('div')`
  display: flex;
  justify-content: space-between;
`

const AnnouncementUserAvatar = styled(Avatar)`
  width: 50px;
  height: 50px;
  border-radius: 10px;
`

const Profile = styled('div')`
  display: flex;
  gap: 10px;
  margin-left: 5px;
`

const NameSection = styled('div')`
  display: flex;
  flex-flow: column wrap;
`

const ViewProfileButton = styled(Button)`
  background: #eea247;
  color: ${props => props.theme.palette.common.black};
  :hover {
    background: #f0bf84;
    color: ${props => props.theme.palette.common.black};
  }
`
