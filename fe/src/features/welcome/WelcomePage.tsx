import React from 'react'
import { styled, Typography } from '@mui/material'
import { SearchBar } from './SearchBar/SearchBar'
import { NavBar } from '../common/NavBar/NavBar'
import { Badge } from './Badge/Badge'
import illustrationSrc from './images/welcome_figure.png'

const WelcomePage: React.FC = () => {
  return (
    <Container>
      <TopSection>
        <NavBar />
      </TopSection>
      <BottomSection>
        <LeftSection>
          <Title variant="h3">
            Find a mentor
            <br />
            suitable to your needs
          </Title>
          <SearchBar />
          <Suggestions>
            <SuggestedText variant="h6">Suggested:</SuggestedText>
            <Badge />
          </Suggestions>
        </LeftSection>
        <Illustration src={illustrationSrc} alt="Register Illustration" />
      </BottomSection>
    </Container>
  )
}

const Container = styled('div')`
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`

const TopSection = styled('div')`
  height: 10%;
  flex: 1 50%;
  margin-bottom: 10rem;
`

const BottomSection = styled('div')`
  display: flex;
  flex-flow: row wrap;
  margin-top: 4rem;
  padding: 0 12rem;
`

const LeftSection = styled('div')`
  min-width: 60%;
  order: 1;
  padding-right: 16rem;
`

const Title = styled(Typography)`
  min-width: 50%;
  height: 8rem;
  font-weight: bold;
  order: 1;
`

const Suggestions = styled('div')`
  display: flex;
  align-items: center;
  width: fit-content;
  height: fit-content;
  padding-top: 1rem;
  order: 3;
`

const SuggestedText = styled(Typography)`
  font-size: 1rem;
  font-weight: bold;
  padding-right: 1rem;
`

const Illustration = styled('img')`
  width: 400px;
  height: 400px;
  padding-bottom: 3rem;
  object-fit: cover;
  order: 1;
`

export default WelcomePage
