import React from 'react'
import { Link as MuiLink, styled, Typography, AppBar, Tabs, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import { DrawerComp } from './DrawerComp'

export const NavBar: React.FC = () => {
  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <NavContainer>
      <Toolbar>
        {isMatch ? (
          <>
            <FancyText variant="h4">Proiectivii</FancyText>
            <DrawerComp />
          </>
        ) : (
          <>
            <TabsContainer indicatorColor="secondary" textColor="inherit" />
            <FancyText variant="h4"> Proiectivii</FancyText>

            <MuiButton href="" underline="none" sx={{ margin: '0 2rem' }}>
              Browse
            </MuiButton>

            <MuiButton href="" underline="none" sx={{ marginRight: '2rem' }}>
              Contact
            </MuiButton>

            <MuiButton href="" underline="none" sx={{ marginRight: 'auto' }}>
              FAQ
            </MuiButton>

            <MuiButton href="/login" underline="none" sx={{ marginRight: '2rem' }}>
              Sign in
            </MuiButton>

            <MuiButton href="/register" underline="none" sx={{ color: '#4CAF50', marginRight: '10%' }}>
              Join
            </MuiButton>
          </>
        )}
      </Toolbar>
    </NavContainer>
  )
}

const FancyText = styled(Typography)`
  font-family: 'PT Sans', cursive;
  color: ${props => props.theme.palette.common.black};
  font-weight: bold;
`

const MuiButton = styled(MuiLink)`
  font-weight: bold;
  color: ${props => props.theme.palette.common.black};
  margin-right: 2rem;
  :hover {
    opacity: 0.5;
  }
`

const NavContainer = styled(AppBar)`
  background: inherit;
  box-shadow: none;
`

const TabsContainer = styled(Tabs)`
  margin-left: 10%;
`
