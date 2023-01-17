import React, { useEffect } from 'react'
import { styled, Typography } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAnnouncementsData, selectAnnouncementsError, selectAnnouncementsLoading } from './selectors'
import { fetchAnnouncements } from './actions'

import { Loader } from '../common/Loader'
import { Announcement } from '../../types/Announcements'
import { AnnouncementCard } from './AnnouncementCard'

export enum AnnouncementCategory {
  FEED,
  FAVORITES,
}

const AnnouncementsPage: React.FC = () => {
  const dispatch = useAppDispatch()

  const announcementsLoading = useAppSelector(selectAnnouncementsLoading)
  const announcementsError = useAppSelector(selectAnnouncementsError)
  const announcementsData = useAppSelector(selectAnnouncementsData)

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

  const renderAnnouncements = (announcements?: Announcement[], categoryIndex?: number) => {
    if (announcements?.length) {
      return (
        <Announcements key={categoryIndex} role="tabpanel">
          {announcements.map(announcement => (
            <AnnouncementCard
              key={announcement.id}
              title={announcement.title}
              description={announcement.description}
              price={announcement.price}
              createdAtDate={announcement.createdAtDate}
              createdBy={announcement.user}
              interestAreas={announcement.interestAreas}
            />
          ))}
        </Announcements>
      )
    }

    return (
      <EmptyAnnouncementsText key={categoryIndex} variant="body1">
        No announcements here yet
      </EmptyAnnouncementsText>
    )
  }

  return (
    <Container>
      <Title variant="overline">Announcements</Title>
      {[announcementsData].map(renderAnnouncements)}
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

export default AnnouncementsPage
