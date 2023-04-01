import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  selectAnnouncementsData,
  selectAnnouncementsError,
  selectAnnouncementsLoading,
  selectAnnouncementsResultsSuccess,
} from './selectors'
import { fetchAnnouncements } from './actions'
import { styled, Tabs, Tab, Typography, css, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { Loader } from '../common/Loader'
import { AnnouncementDto } from '../../types/Announcements'
import { AnnouncementCard } from './AnnouncementCard'
import { selectUserData } from '../account/selectors'
import { Role } from '../../types/User'
import { CreateAnnouncementModal } from './CreateAnnouncementModal/CreateAnnouncementModal'

export enum AnnouncementCategory {
  FEED,
  FOLLOWED,
}

const AnnouncementsPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const [selectedCategory, setSelectedCategory] = useState(AnnouncementCategory.FEED)

  const announcementsLoading = useAppSelector(selectAnnouncementsLoading)
  const announcementsError = useAppSelector(selectAnnouncementsError)
  const announcementsData = useAppSelector(selectAnnouncementsData)
  const searchDone = useAppSelector(selectAnnouncementsResultsSuccess)
  const userData = useAppSelector(selectUserData)
  const role = userData?.role
  // const userId = userData?.id

  const [createAnnouncementOpen, setCreateAnnouncementOpen] = useState(false)
  const shouldOpenCreateAnnouncementModal = role === Role.MENTOR && createAnnouncementOpen
  const [updatedAnnouncement, setUpdatedAnnouncement] = useState<AnnouncementDto | undefined>(undefined)

  const handleOpenAnnouncementWhenUpdate = (announcement: AnnouncementDto) => {
    setUpdatedAnnouncement(announcement)
    setCreateAnnouncementOpen(true)
  }

  const handleCloseCreateAnnouncement = () => {
    setCreateAnnouncementOpen(false)
    setUpdatedAnnouncement(undefined)
  }

  // Load announcements data on page load
  useEffect(() => {
    dispatch(fetchAnnouncements())
  }, [])

  if (announcementsLoading) {
    return <Loader fullscreen={true} />
  }

  if (announcementsError || !announcementsData) {
    return null
  }

  const myAnnouncements = announcementsData && [
    ...announcementsData.filter(announcement => announcement.user.fullName === userData?.fullName),
  ]

  const handleCategorySelection = (_event: React.SyntheticEvent, newSelectedCategory: AnnouncementCategory) => {
    setSelectedCategory(newSelectedCategory)
  }

  const renderAnnouncements = (announcements?: AnnouncementDto[], categoryIndex?: number) => {
    if (announcements?.length && categoryIndex === selectedCategory) {
      return (
        <Announcements key={categoryIndex} role="tabpanel">
          {announcements.map(announcement => (
            <AnnouncementCard
              key={announcement.id}
              id={announcement.id}
              title={announcement.title}
              description={announcement.description}
              price={announcement.price}
              createdBy={announcement.user}
              interestAreas={announcement.interestAreas}
              createdAtDate={announcement.postingDate}
              category={selectedCategory}
              onUpdateClick={() => handleOpenAnnouncementWhenUpdate(announcement)}
            />
          ))}
        </Announcements>
      )
    }

    if (categoryIndex === selectedCategory) {
      return (
        <EmptyAnnouncementsText key={categoryIndex} variant="body1">
          No announcements here yet
        </EmptyAnnouncementsText>
      )
    }

    return null
  }

  return (
    <Container>
      {searchDone && (
        <Button onClick={() => dispatch(fetchAnnouncements())} color="secondary">
          Back to all announcements
        </Button>
      )}
      <Title variant="overline">Announcements</Title>
      {role === Role.MENTOR && (
        <CreateAnnouncementButton variant="outlined" color="secondary" onClick={() => setCreateAnnouncementOpen(true)}>
          <AddIcon /> Create Announcement
        </CreateAnnouncementButton>
      )}
      <CreateAnnouncementModal
        isOpened={shouldOpenCreateAnnouncementModal}
        handleClose={handleCloseCreateAnnouncement}
        announcement={updatedAnnouncement}
      />
      <Tabs value={selectedCategory} onChange={handleCategorySelection} indicatorColor="secondary">
        <StyledTab label="Feed" aria-selected={AnnouncementCategory.FEED === selectedCategory} />
        {role === Role.MENTOR && (
          <StyledTab label="Your's" aria-selected={AnnouncementCategory.FOLLOWED === selectedCategory} />
        )}
      </Tabs>
      {[announcementsData, myAnnouncements].map(renderAnnouncements)}
    </Container>
  )
}

export default AnnouncementsPage

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

const Announcements = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 600px;
  margin-top: 20px;
`

const EmptyAnnouncementsText = styled(Typography)`
  margin: 20px 0;
`

const StyledTab = styled(Tab)`
  ${props =>
    props['aria-selected'] &&
    css`
      color: ${props.theme.palette.secondary.main} !important;
    `}
`

const CreateAnnouncementButton = styled(Button)`
  padding: 30px;
  width: 500px;
  display: flex;
  gap: 5px;
  font-size: 16px;
`
