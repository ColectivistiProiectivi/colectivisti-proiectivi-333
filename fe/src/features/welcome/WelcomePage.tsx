import React from 'react'
import { styled, Typography } from '@mui/material'
import SearchBar from './SearchBar/SearchBar'
import NavBar from '../common/NavBar/NavBar'
import illustrationSrc from './images/welcome_figure.png'
import Badge from './Badge/Badge'

const WelcomePage: React.FC = () => {
  // items={["Proiectivii", "Browse", "Contact", "FAQ"]
  // const [showResults, setShowResults] = useState(true);
  return (
    <Container>
      <TopSection>
        <NavBar />
      </TopSection>
      (
      <BottomSection>
        <Title variant="h3">
          Find a mentor
          <br />
          suitable to your needs
        </Title>
        <SearchBar />
        <Illustration src={illustrationSrc} alt="Register Illustration" />
        <Suggestions>
          <SuggestedText variant="h6">Suggested:</SuggestedText>
          <Badge />
        </Suggestions>
      </BottomSection>
      )
    </Container>
  )
}
const Container = styled('div')`
  display: grid;
  height: 100vh;
  width: 90%;
`

const TopSection = styled('div')`
  height: 10vh;
`

const BottomSection = styled('div')`
  margin: 10vh 0 0 25vh;
  height: 60vh;
`

const Title = styled(Typography)`
  min-width: 50%;
  font-weight: bold;
`

const Illustration = styled('img')`
  min-width: 400px;
  height: 400px;
  object-fit: cover;
  margin: -30vh 0 0 100vh;
`
const SuggestedText = styled(Typography)`
  font-size: 1rem;
  padding-right: 1rem;
  font-weight: bold;
`
const Suggestions = styled('div')`
  display: flex;
  margin-top: -25vh;
  width: fit-content;
  height: fit-content;
`

export default WelcomePage
