import * as React from 'react'
import { styled, Typography, Button, Card, CardActions, CardContent } from '@mui/material'

interface Props {
  first_name: string
  last_name: string
  description: string
  price: number
  showPrice: boolean
}

export const MuiCard: React.FC<Props> = props => {
  return (
    <BasicCard>
      <CardContent>
        <Fullname>{props.first_name + ' ' + props.last_name}</Fullname>
        <Description>{props.description}</Description>
        <CardActions sx={{ justifyContent: 'center' }}>
          <ProfileButton size="small">View profile</ProfileButton>
        </CardActions>
        {props.showPrice && <PriceLabel>{props.price + ' RON / hr'}</PriceLabel>}
      </CardContent>
    </BasicCard>
  )
}

const BasicCard = styled(Card)`
  display: flex;
  min-width: 22%;
  height: 10rem;
  margin: 1rem;
  padding: 0;
  justify-content: center;
  text-align: center;
  background-color: #616161;
`

const Description = styled(Typography)`
  font-size: 0.7rem;
  color: ${props => props.theme.palette.common.white};
`

const Fullname = styled(Typography)`
  font-size: 1.1rem;
  color: ${props => props.theme.palette.common.white};
`

const PriceLabel = styled(Typography)`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: ${props => props.theme.palette.common.white};
`

const ProfileButton = styled(Button)`
  align-items: center;
  background-color: #4caf50;
  margin: 0.5rem 0;
  color: ${props => props.theme.palette.common.white};
  :hover {
    background-color: ${props => props.theme.palette.common.white};
    color: #4caf50;
  }
`
