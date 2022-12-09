import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { styled, Typography, useMediaQuery, useTheme } from '@mui/material'
import { DrawerComp } from './DrawerComp'
import { SearchBar } from '../SearchBar/SearchBar'
import LogoutIcon from '@mui/icons-material/Logout'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MessageIcon from '@mui/icons-material/Message'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import { axiosInstance } from '../../../api'

export const NavBar: React.FC = () => {
  const [notifications, setNotifications] = useState([])
  //const [messages, setMessages] = useState([]);
  const navigate = useNavigate()
  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNotifications = () => {
    //TO DO
    handleClose()
  }

  // const handleMessages = () => {
  //   //TO DO
  //   handleClose();
  // };

  useEffect(() => {
    axiosInstance.get('notifications/user').then(res => {
      setNotifications(res.data)
    })
    // axiosInstance.get('messages/user').then(res => {
    //   setMessages(res.data)
    // })
  })

  return (
    <Container>
      {isMatch ? (
        <>
          <FancyText variant="h4">Proiectivii</FancyText>
          <DrawerComp />
        </>
      ) : (
        <NavContainer>
          <FancyText variant="h4"> Proiectivii</FancyText>
          <SearchBar />
          <RightSection>
            <BackgroundCircle onClick={handleClick}>
              <MessageIcon />
            </BackgroundCircle>
            <BackgroundCircle onClick={handleClick}>
              <NotificationsIcon />
            </BackgroundCircle>
            <BackgroundCircle onClick={() => navigate('/logout')}>
              <LogoutIcon />
            </BackgroundCircle>
          </RightSection>
        </NavContainer>
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{ marginTop: '10px', maxWidth: '300px' }}
      >
        {notifications.length !== 0 ? (
          notifications.map((n, index) => (
            <MenuItem key={index} onClick={handleNotifications}>
              {n}
            </MenuItem>
          ))
        ) : (
          <p>NU AVETI NICIO NOTIFICARE</p>
        )}
        {/* {messages.length!==0 ? (messages.map((m, index) => (
            <MenuItem key={index} onClick={handleMessages}>{m}</MenuItem>))) : 
            (<p>NU AVETI NICIUN MESAJ</p>)
          } */}
      </Menu>
    </Container>
  )
}

const Container = styled('div')`
  width: 100%;
  height: 80px;
  background: #ddd;
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
  width: 35%;
  justify-content: center;
`

const RightSection = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
  width: 35%;
`

const BackgroundCircle = styled(IconButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${props => props.theme.palette.common.white};
  color: ${props => props.theme.palette.common.black};
  margin: 0 10px;

  :hover {
    background: ${props => props.theme.palette.common.black};
    color: ${props => props.theme.palette.common.white};
  }
`
