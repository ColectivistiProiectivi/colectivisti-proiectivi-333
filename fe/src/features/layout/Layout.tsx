import React from 'react'
import { Navbar } from '../common/Navbar'
import { Navigate, Outlet } from 'react-router-dom'
import { LoadingScreen } from '../application/utils'
import { useAppDispatch } from '../../redux/hooks'
import { displaySnackbar } from '../application/slice'
import { styled } from '@mui/material'
import { Sidebar } from '../common/Sidebar'

export const Layout: React.FC = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = !!localStorage.getItem('user')

  if (!isAuthenticated) {
    dispatch(
      displaySnackbar({
        open: true,
        type: 'warning',
        message: 'You do not have permission to access this page',
      })
    )

    return <Navigate to={'/'} />
  }

  return (
    <LoadingScreen>
      <Page>
        <Container>
          <Navbar />
          <Content>
            <Sidebar />
            <Outlet />
          </Content>
        </Container>
      </Page>
    </LoadingScreen>
  )
}

const Page = styled('div')`
  width: 100%;
`

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 80px;
`

const Content = styled('div')`
  width: 90%;
  display: flex;
  align-self: center;
  gap: 100px;
`
