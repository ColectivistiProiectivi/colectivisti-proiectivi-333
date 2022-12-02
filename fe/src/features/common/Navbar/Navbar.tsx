import React from 'react'
import { styled, Typography, AppBar, Toolbar, Box, Badge, alpha } from '@mui/material'

import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'

export const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  )

  return (
    <Box>
      <StyledAppbar position="static" elevation={1}>
        <StyledToolbar>
          <Header>
            <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
              COLECTIVISTII
            </Typography>
          </Header>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" />
          </Search>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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
            <IconButton size="large" edge="end" color="inherit" onClick={handleProfileMenuOpen}>
              <AccountCircle />
            </IconButton>
          </Box>
        </StyledToolbar>
      </StyledAppbar>
      {renderMenu}
    </Box>
  )
}

const StyledAppbar = styled(AppBar)`
  align-items: center;
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
