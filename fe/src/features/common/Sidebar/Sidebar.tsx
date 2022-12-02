import React from 'react'
import { matchPath, useLocation } from 'react-router'
import { List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, styled } from '@mui/material'

import NewspaperIcon from '@mui/icons-material/Newspaper'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ScheduleIcon from '@mui/icons-material/Schedule'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import { paths } from '../../../api'

export const Sidebar: React.FC = () => {
  const username = localStorage.getItem('user')
  const { pathname } = useLocation()

  const activeItem = (itemPath: string) => {
    return !!matchPath(itemPath, pathname)
  }

  return (
    <Container>
      <List component="nav" subheader={<ListSubheader component="div">{username}</ListSubheader>}>
        <ListItemButton>
          <ListItemIcon>
            <NewspaperIcon />
          </ListItemIcon>
          <ListItemText primary="Announces" />
        </ListItemButton>
        <ListItemButton selected={activeItem(paths.PROFILE)}>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
          <ListItemText primary="Appointments" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <NoteAltIcon />
          </ListItemIcon>
          <ListItemText primary="Assignments" />
        </ListItemButton>
      </List>
    </Container>
  )
}

const Container = styled('div')`
  display: flex;
  justify-content: center;
`
