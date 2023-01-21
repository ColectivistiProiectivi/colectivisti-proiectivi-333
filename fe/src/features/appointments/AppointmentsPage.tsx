import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchAppointments } from './actions'
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, styled, Typography } from '@mui/material'

import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import { selectAppointmentsData } from './selectors'
import { selectUserData } from '../account/selectors'
import { Role } from '../../types/User'
import AddIcon from '@mui/icons-material/Add'

const AppointmentsPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector(selectUserData)
  const role = userData?.role

  const appointments = useAppSelector(selectAppointmentsData)

  useEffect(() => {
    dispatch(fetchAppointments())
  }, [])

  // TODO: Implement create appointment
  const [_createAppointmentModalOpen, setCreateAppointmentModalOpen] = useState(false)

  return (
    <Container>
      <Title variant="overline">Assignments</Title>
      {role === Role.MENTOR && (
        <CreateAppointmentButton
          variant="outlined"
          color="secondary"
          onClick={() => setCreateAppointmentModalOpen(true)}
          disabled
        >
          <AddIcon /> Create Appointment
        </CreateAppointmentButton>
      )}
      <ListWrapper>
        <List sx={{ width: '100%', maxWidth: 450, bgcolor: 'background.paper' }}>
          {appointments.map(appointment => (
            <ListItem key={appointment.id}>
              <ListItemAvatar>
                <Avatar>
                  <AccessTimeFilledIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`With ${
                  role === Role.STUDENT ? appointment.mentor.fullName : appointment.student.fullName
                } - ${appointment.locationDetails}`}
                secondary={appointment.date.format('LLL')}
              />
            </ListItem>
          ))}
        </List>
      </ListWrapper>
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

const CreateAppointmentButton = styled(Button)`
  margin: 45px 0;
  padding: 30px;
  width: 500px;
  display: flex;
  gap: 5px;
  font-size: 16px;
`

const ListWrapper = styled('div')`
  width: 500px;
`

export default AppointmentsPage
