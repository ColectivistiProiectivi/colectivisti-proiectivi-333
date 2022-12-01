import React from 'react'
import { Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const ProfilePage: React.FC = () => {
  return (
    <div>
      <Typography>WORK IN PROGRESS...</Typography>
      <Button>
        <Link to="/logout">Logout</Link>
      </Button>
    </div>
  )
}

export default ProfilePage
