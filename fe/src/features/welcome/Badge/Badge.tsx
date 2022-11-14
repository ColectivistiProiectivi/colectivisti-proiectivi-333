import React from 'react'
import SchoolIcon from '@mui/icons-material/School'
import { styled, Typography } from '@mui/material'

const Badge: React.FC = () => {
  return (
    <BadgeBox>
      <SchoolIcon sx={{ color: '#616161', padding: '0 .5rem', fontSize: 35 }} />
      <BadgeType variant="h4">Math</BadgeType>
    </BadgeBox>
  )
}

const BadgeBox = styled('div')`
  display: flex;
  background-color: #dddddd;
  width: fit-content;
  height: 1.5rem;
  border-radius: 0.8rem;
  align-items: center;
`
const BadgeType = styled(Typography)`
  font-size: 0.6rem;
  color: #616161;
  padding-right: 0.5rem;
`

export default Badge
