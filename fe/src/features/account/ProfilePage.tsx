import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { NavBar } from '../common/NavBar'

const ProfilePage: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Button>
        <Link to="/logout">Logout</Link>
      </Button>
    </div>
  )
}

export default ProfilePage
