import React from 'react'
import SchoolIcon from '@mui/icons-material/School'
import { styled, Typography, Box } from '@mui/material'

export const Badge: React.FC = () => {
  return (
    <BadgeBox>
      <BadgeIcon />
      <BadgeType variant="h4">Math</BadgeType>
    </BadgeBox>
  )
}

const BadgeBox = styled(Box)`
  display: flex;
  background-color: #dddddd;
  width: fit-content;
  height: 1.5rem;
  border-radius: 0.8rem;
  align-items: center;
`

const BadgeIcon = styled(SchoolIcon)`
  color: #616161;
  padding: 0.3rem;
`

const BadgeType = styled(Typography)`
  font-size: 0.6rem;
  color: #616161;
  padding-right: 0.5rem;
`
