import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { styled, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import { DrawerComp } from './DrawerComp'
import { SearchBar } from '../SearchBar/SearchBar'
import LogoutIcon from '@mui/icons-material/Logout'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Menu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import { toggleSidebar } from '../../application/slice'
import { useAppDispatch } from '../../../redux/hooks'

export const NavBar: React.FC = () => {
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false)
  const [showMessagesMenu, setShowMessagesMenu] = useState(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const openNotificationsMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setShowNotificationsMenu(!showNotificationsMenu)
  }

  const openMessagesMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setShowMessagesMenu(!showMessagesMenu)
  }

  // const handleSelectedNotification = () => {
  //   //TO DO
  //   setAnchorEl(null)
  // }

  // const handleSelectedMessage = () => {
  //   //TO DO
  //   setAnchorEl(null)
  // };

  return (
    <Container>
      {isMatch ? (
        <>
          <StyledIconButton size="large" onClick={() => dispatch(toggleSidebar())}>
            <MenuIcon />
          </StyledIconButton>
          <FancyText variant="h5">Colectivistii</FancyText>
          <DrawerComp />
        </>
      ) : (
        <NavContainer>
          <LeftSection>
            <FancyText variant="h5">Colectivistii</FancyText>
          </LeftSection>
          <SearchBar />
          <RightSection>
            <Tooltip title="Notifications">
              <StyledIconButton size="large" onClick={openNotificationsMenu} disabled>
                <NotificationsIcon />
              </StyledIconButton>
            </Tooltip>
            <Tooltip title="Messages">
              <StyledIconButton size="large" onClick={openMessagesMenu}>
                <MailIcon />
              </StyledIconButton>
            </Tooltip>
            <Tooltip title="Sign out">
              <StyledIconButton size="large" onClick={() => navigate('/logout')}>
                <LogoutIcon />
              </StyledIconButton>
            </Tooltip>
          </RightSection>
        </NavContainer>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{ marginTop: '10px', maxWidth: '300px', maxHeigh: '500px' }}
        disableScrollLock={true}
      >
        {/* {showNotificationsMenu && notifications.length !== 0 ? (
          notifications.map((n, index) => (
            <MenuItem key={index} onClick={handleSelectedNotification}>
              {n}
            </MenuItem>
          ))
        ) : (
          <p>NU AVETI NICIO NOTIFICARE</p>
        )} */}
        {/* showMessagesMenu &&{messages.length!==0 ? (messages.map((m, index) => (
            <MenuItem key={index} onClick={handleSelectedMessage}>{m}</MenuItem>))) :
            (<p>NU AVETI NICIUN MESAJ</p>)
          } */}
      </Menu>
    </Container>
  )
}

const Container = styled('div')`
  width: 100%;
  height: 60px;
  background: ${props => props.theme.palette.secondary.main};
  color: #777;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  text-align: center;
  position: fixed;
  z-index: 2;
  padding: 0 5%;
`

const NavContainer = styled('div')`
  display: flex;
  width: 100%;
  justify-content: space-around;
  height: inherit;
  align-items: center;
`

const FancyText = styled(Typography)`
  display: flex;
  font-family: 'PT Sans', cursive;
  color: ${props => props.theme.palette.common.black};
  font-weight: bold;
  justify-content: center;
`

const RightSection = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
  order: 3;
`

const LeftSection = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
  order: 1;
  gap: 20px;
`

const StyledIconButton = styled(IconButton)`
  color: #000;
`
