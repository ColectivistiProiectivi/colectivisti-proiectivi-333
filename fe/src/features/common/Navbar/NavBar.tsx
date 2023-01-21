import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  Box,
  css,
  InputAdornment,
  styled,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { DrawerComp } from './DrawerComp'
import { SearchBar } from '../SearchBar/SearchBar'
import LogoutIcon from '@mui/icons-material/Logout'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SearchSharpIcon from '@mui/icons-material/SearchSharp'
import IconButton from '@mui/material/IconButton'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import { toggleSidebar } from '../../application/slice'
import { useAppDispatch } from '../../../redux/hooks'

export const NavBar: React.FC = () => {
  const [showMessagesMenu, setShowMessagesMenu] = useState(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))
  const menuRef = useRef<HTMLDivElement | null>(null)

  // useEffect(() => {
  //   let handler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //     if (!menuRef.current?.contains(e.target as Node)) {
  //       setShowNotificationsMenu(false)
  //       console.log(menuRef.current)
  //     }
  //   }

  //   // document.addEventListener('mousedown', handler)

  //   // return () => {
  //   //   document.removeEventListener('mousedown', handler)
  //   // }
  // }, [])

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
              <StyledIconButton size="large" disabled>
                <NotificationsIcon />
              </StyledIconButton>
            </Tooltip>
            <Tooltip title="Messages">
              <div ref={menuRef}>
                <StyledIconButton size="large" onClick={() => setShowMessagesMenu(!showMessagesMenu)}>
                  <MailIcon />
                </StyledIconButton>{' '}
              </div>
            </Tooltip>
            <Tooltip title="Sign out">
              <StyledIconButton size="large" onClick={() => navigate('/logout')}>
                <LogoutIcon />
              </StyledIconButton>
            </Tooltip>
          </RightSection>
        </NavContainer>
      )}
      {showMessagesMenu && (
        <DropdownMenu open={showMessagesMenu}>
          <TopSection>
            <Title>Inbox</Title>
          </TopSection>
          <Search>
            <SearchInput
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="Search in Inbox"
              size="small"
              fullWidth
              id="fullWidth"
            ></SearchInput>
          </Search>
          {/* <ItemsContainer>
            <InboxItem img="" text="">
              hello
            </InboxItem>
            <InboxItem img="" text="">
              hello
            </InboxItem>
            <InboxItem img="" text="">
              hello
            </InboxItem>
            <InboxItem img="" text="">
              hello
            </InboxItem>
          </ItemsContainer> */}
        </DropdownMenu>
      )}
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

const DropdownMenu = styled('div')<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  background: ${props => props.theme.palette.common.white};
  top: 55px;
  right: 30px;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  height: 600px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-30px);
  box-shadow: rgba(17, 17, 26, 0.1) 0 2px 8px, rgba(17, 17, 26, 0.05) 0 4px 16px;
  ${props =>
    props.open &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    `}
`

const TopSection = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`

const Title = styled(Typography)`
  color: ${props => props.theme.palette.common.black};
  font-size: 20px;
  font-weight: bold;
`

const Search = styled(Box)`
  width: 100%;
`

const SearchInput = styled(TextField)`
  border: 2px #eea247;
  input,
  label {
    color: ${props => props.theme.palette.common.black};
  }
  fieldset {
    color: ${props => props.theme.palette.common.black};
  }
`

const SearchIcon = styled(SearchSharpIcon)`
  color: #eea247;
`

// const ItemsContainer = styled('div')`
//   width: 100%;
// `
