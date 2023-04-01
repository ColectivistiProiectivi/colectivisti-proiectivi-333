import React from 'react'
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'

import { alpha, Avatar, Button, IconButton, styled, Tooltip, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { AnnouncementUserResponseDTO, InterestAreasResponseDTO } from '../../../types/Announcements'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectUserData } from '../../account/selectors'
import { displaySnackbar } from '../../application/slice'
import { AnnouncementCategory } from '../AnnouncementsPage'
import { fetchAnnouncements, deleteAnnouncement } from '../actions'

dayjs.extend(RelativeTime)

interface AnnouncementsCardProps {
  id: number
  title: string
  description: string
  price: number
  createdBy: AnnouncementUserResponseDTO
  interestAreas: InterestAreasResponseDTO
  category: AnnouncementCategory
  createdAtDate: Date
  onUpdateClick: () => void
}

export const AnnouncementCard: React.FC<AnnouncementsCardProps> = props => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector(selectUserData)
  const isMentor = userData?.role === 'MENTOR'
  const { id, title, description, price, createdBy, createdAtDate, interestAreas, category, onUpdateClick } = props

  const handleDelete = () => {
    dispatch(deleteAnnouncement(id)).then(() => {
      dispatch(
        displaySnackbar({
          open: true,
          type: 'success',
          message: 'Ad deleted',
        })
      )
    })
    dispatch(fetchAnnouncements())
  }

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
        {isMentor && category === AnnouncementCategory.FOLLOWED && (
          <>
            <ActionButtons>
              <Tooltip title="Edit">
                <IconButton onClick={onUpdateClick}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ActionButtons>
          </>
        )}
        {!isMentor && <ViewProfileButton>Contact</ViewProfileButton>}
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
  color: ${props => props.theme.palette.common.white};
  :hover {
    background: #f0bf84;
    color: ${props => props.theme.palette.common.white};
  }
`
