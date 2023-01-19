import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { LoadingScreen } from '../application/utils'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { displaySnackbar } from '../application/slice'
import { styled } from '@mui/material'
import { Sidebar } from '../common/Sidebar'
import { selectUserData } from '../account/selectors'
import { fetchUserAvatar, fetchUserData } from '../account/actions'
import { paths } from '../../api'
import { NavBar } from '../common/Navbar'

export const Layout: React.FC = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = !!localStorage.getItem('jwtToken')
  const userData = useAppSelector(selectUserData)

  useEffect(() => {
    if (!userData) {
      dispatch(fetchUserData())
      dispatch(fetchUserAvatar())
    }
  }, [userData])

  if (!isAuthenticated) {
    dispatch(
      displaySnackbar({
        open: true,
        type: 'warning',
        message: 'You do not have permission to access this page',
      })
    )

    return <Navigate to={paths.LANDING_PAGE} />
  }

  return (
    <LoadingScreen>
      <Page>
        <Container>
          <NavBar />
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
  gap: 40px;
`

const Content = styled('div')`
  width: 90%;
  display: flex;
  align-self: center;
  gap: 100px;
  padding-top: 80px;
`
