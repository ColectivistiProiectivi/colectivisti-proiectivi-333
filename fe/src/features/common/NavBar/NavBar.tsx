import React, { useState } from 'react'
import { AppBar, Tabs, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import DrawerComp from './DrawerComp'
import { Link as MuiLink, styled, Typography } from '@mui/material'

const NavBar = () => {
  const [value, setValue] = useState(false)
  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))
  const onChange = () => {
    setValue(true)
  }

  return (
    <React.Fragment>
      <AppBar style={{ background: 'inherit', boxShadow: 'none' }}>
        <Toolbar>
          {isMatch ? (
            <>
              <FancyText variant="h4"> Proiectivii</FancyText>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: '10%' }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={onChange}
              ></Tabs>
              <FancyText variant="h4"> Proiectivii</FancyText>

              <MuiLink href="" color="#000" underline="none" style={{ margin: '0 2rem', fontWeight: 'bold' }}>
                Browse
              </MuiLink>

              <MuiLink href="" color="#000" underline="none" style={{ marginRight: '2rem', fontWeight: 'bold' }}>
                Contact{' '}
              </MuiLink>

              <MuiLink href="" color="#000" underline="none" style={{ marginRight: 'auto', fontWeight: 'bold' }}>
                FAQ
              </MuiLink>

              <MuiLink
                href="http://127.0.0.1:3000/login"
                color="#000"
                underline="hover"
                style={{ marginRight: '2rem', fontWeight: 'bold' }}
              >
                Sign in
              </MuiLink>

              <MuiLink
                href="http://127.0.0.1:3000/register"
                color="#00ff00"
                underline="hover"
                style={{ marginRight: '10%', fontWeight: 'bold' }}
              >
                Join
              </MuiLink>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

const FancyText = styled(Typography)`
  font-family: 'Courgette', cursive;
  color: #000;
  font-weight: bold;
`
export default NavBar
