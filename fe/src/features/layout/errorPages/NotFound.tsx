import React from 'react'
import { Box, styled, Typography } from '@mui/material'
import notFoundSrc from './images/not_found.png'

export const NotFound: React.FC = () => {
  return (
    <Container>
      <Typography variant="h1" color="error">
        404
      </Typography>
      <Typography variant="h4">Not Found</Typography>
      <NotFoundImage src={notFoundSrc} alt="Not Found" />
      <Typography variant="h4">You&apos;re probably lost, aren&apos;t you?</Typography>
    </Container>
  )
}

const Container = styled(Box)`
  height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const NotFoundImage = styled('img')`
  height: 420px;
  width: 420px;
`
