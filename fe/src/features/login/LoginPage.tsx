import React from 'react'
import { styled, Typography } from '@mui/material'

import { LoginForm } from './LoginForm'

import illustrationSrc from './images/login_figure.png'

const LoginPage: React.FC = () => {
  return (
    <Container>
      <LeftSection>
        <LoginForm />
      </LeftSection>
      <RightSection>
        <TextContainer>
          <Title variant="h4">Happy you</Title>
          <Title variant="h4">joined us</Title>
        </TextContainer>
        <Illustration src={illustrationSrc} alt="Login Illustration" />
      </RightSection>
    </Container>
  )
}

const Container = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const Section = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 438px;
  height: 584px;
`

const LeftSection = styled(Section)`
  background-color: #222233; // TODO: Add color to the theme instead of hardcoding
  border-radius: 16px 0 0 16px;
  gap: 16px;
`

const TextContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RightSection = styled(Section)`
  background-color: ${props => props.theme.palette.common.white};
  border-radius: 0 16px 16px 0;
  user-select: none;
`

const Illustration = styled('img')`
  width: 386px;
  height: 386px;
  object-fit: cover;
  -webkit-user-drag: none;
  -webkit-user-select: none;
`

const Title = styled(Typography)`
  font-family: 'Merriweather', serif;
`

export default LoginPage
