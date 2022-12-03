import React from 'react'
import { useNavigate } from 'react-router-dom'
import { styled, Typography, AppBar, Toolbar, Box, Badge, alpha } from '@mui/material'

import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import LogoutIcon from '@mui/icons-material/Logout'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { paths } from '../../../api'

export const Navbar: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Box>
      <StyledAppbar position="fixed" color="transparent" elevation={3}>
        <StyledToolbar>
          <Header>
            <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
              <HomeIcon />
            </IconButton>
            <LogoTitle variant="h6" noWrap sx={{ display: { xs: 'none', sm: 'block' } }}>
              Colectivistii
            </LogoTitle>
          </Header>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search Announcements…" />
          </Search>
          <NavButtons sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" edge="end" color="inherit" onClick={() => navigate(paths.LOGOUT)}>
              <LogoutIcon />
            </IconButton>
          </NavButtons>
        </StyledToolbar>
      </StyledAppbar>
    </Box>
  )
}

const StyledAppbar = styled(AppBar)`
  align-items: center;
  background: #f89e33;
`

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  width: 90%;
`

const Header = styled(Box)`
  display: flex;
  align-items: center;
`

const LogoTitle = styled(Typography)`
  font-family: Montserrat, Roboto, serif;
`

const NavButtons = styled(Box)`
  gap: 5px;
`

const Search = styled('div')`
  position: relative;
  border-radius: ${props => props.theme.shape.borderRadius};
  margin-right: ${props => props.theme.spacing(2)};
  margin-left: 0;
  width: 50%;

  background-color: ${props => `${alpha(props.theme.palette.common.white, 0.15)}`};
  &:hover {
    background-color: ${props => `${alpha(props.theme.palette.common.white, 0.25)}`};
  }
`

const SearchIconWrapper = styled('div')`
  padding: ${props => props.theme.spacing(0, 2)};
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledInputBase = styled(InputBase)`
  color: inherit;
  width: 100%;

  & .MuiInputBase-input {
    padding: ${props => props.theme.spacing(1, 1, 1, 0)};
    padding-left: ${props => `calc(1em + ${props.theme.spacing(4)})`};
    transition: ${props => props.theme.transitions.create('width')};
  }
`
