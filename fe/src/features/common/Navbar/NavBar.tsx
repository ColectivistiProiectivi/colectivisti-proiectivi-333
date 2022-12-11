import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { styled, Typography, useMediaQuery, useTheme } from '@mui/material'
import { DrawerComp } from './DrawerComp'
import { SearchBar } from '../SearchBar/SearchBar'
import LogoutIcon from '@mui/icons-material/Logout'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Menu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home'
import MailIcon from '@mui/icons-material/Mail'

export const NavBar: React.FC = () => {
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false)
  const [showMessagesMenu, setShowMessagesMenu] = useState(false)

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
          <HomeIconNav />
          <FancyText variant="h5">Colectivistii</FancyText>
          <DrawerComp />
        </>
      ) : (
        <NavContainer>
          <LeftSection>
            <HomeIconNav />
            <FancyText variant="h5">Colectivistii</FancyText>
          </LeftSection>
          <SearchBar />
          <RightSection>
            <BackgroundCircle onClick={openMessagesMenu}>
              <Notifications>9+</Notifications>
              <MailIcon />
            </BackgroundCircle>
            <BackgroundCircle onClick={openNotificationsMenu}>
              <Notifications>4</Notifications>
              <NotificationsIcon />
            </BackgroundCircle>
            <BackgroundCircle onClick={() => navigate('/logout')}>
              <LogoutIcon />
            </BackgroundCircle>
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
  width: 35%;
  order: 3;
`

const LeftSection = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
  width: 35%;
  order: 1;
  gap: 20px;
`

const BackgroundCircle = styled(IconButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${props => props.theme.palette.secondary.main};
  color: ${props => props.theme.palette.common.black};
  margin: 0 10px;

  :hover {
    background: #f0bf84;
    color: ${props => props.theme.palette.common.black};
  }
`

const HomeIconNav = styled(HomeIcon)`
  color: ${props => props.theme.palette.common.black};
`

const Notifications = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 13px;
  min-width: 15px;
  max-width: 18px;
  height: 15px;
  background: #da0000;
  border-radius: 50%;
  color: ${props => props.theme.palette.common.white};
  position: absolute;
  top: 2px;
  right: 4px;
`
