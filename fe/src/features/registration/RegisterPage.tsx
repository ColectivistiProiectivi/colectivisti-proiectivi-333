import React from 'react'
import { styled, Typography } from '@mui/material'

import { RegistrationForm } from './RegistrationForm'

import illustrationSrc from './images/register_figure.png'
import { Snackbar } from '../common/Snackbar'

const RegisterPage: React.FC = () => (
  <Container>
    <LeftSection>
      <TextContainer>
        <Title variant="h4">Learn from our</Title>
        <FancyText variant="h3"> mentors</FancyText>
      </TextContainer>
      <Illustration src={illustrationSrc} alt="Register Illustration" />
    </LeftSection>
    <RightSection>
      <RegistrationForm />
    </RightSection>
    <Snackbar />
  </Container>
)

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
  background-color: ${props => props.theme.palette.common.white};
  border-radius: 16px 0 0 16px;
  gap: 16px;
  user-select: none;
`

const TextContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RightSection = styled(Section)`
  background-color: #222233; // TODO: Add color to the theme instead of hardcoding
  border-radius: 0 16px 16px 0;
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

const FancyText = styled(Typography)`
  font-family: 'Courgette', cursive;
`

export default RegisterPage
