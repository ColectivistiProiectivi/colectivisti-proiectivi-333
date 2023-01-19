import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAnnouncementsData, selectAnnouncementsError, selectAnnouncementsLoading } from './selectors'
import { fetchAnnouncements } from './actions'
import { styled, Tabs, Tab, Typography, css } from '@mui/material'

import { Loader } from '../common/Loader'
import { Announcement } from '../../types/Announcements'
import { AnnouncementCard } from './AnnouncementCard'
import { selectUserData } from '../account/selectors'

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
  const userData = useAppSelector(selectUserData)

  // Load announcements data on page load
  useEffect(() => {
    dispatch(fetchAnnouncements())
  }, [dispatch])

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

  const renderAnnouncements = (announcements?: Announcement[], categoryIndex?: number) => {
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
              createdAtDate={announcement.postingDate}
              createdBy={announcement.user}
              interestAreas={announcement.interestAreas}
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
      <Title variant="overline">Announcements</Title>
      <Tabs value={selectedCategory} onChange={handleCategorySelection} indicatorColor="secondary">
        <StyledTab label="Feed" aria-selected={AnnouncementCategory.FEED === selectedCategory} />
        <StyledTab label="Your's" aria-selected={AnnouncementCategory.FOLLOWED === selectedCategory} />
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
  width: 50%;
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
