import React, { useState } from 'react'
import { styled, Typography, Button } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { NavBar } from '../common/NavBar/NavBar'
import { MuiCard } from './Card'
import Switch from '@mui/material/Switch'
import { Dropdown } from './dropdown'

interface Props {
  id: number
  first_name: string
  last_name: string
  description: string
  price: number
  showPrice: boolean
}

const ResultsPage: React.FC = () => {
  const location = useLocation()
  const results = location.state.result
  let currentLimit = 8
  const [isExpanded, setIsExpended] = useState(false)
  const [showPrice, setShowPrice] = useState(false)
  const [limit, setLimit] = useState(currentLimit)

  const loadButton = () => {
    setIsExpended(prev => !prev)
    isExpanded ? (currentLimit = 8) : (currentLimit = results.length)
    setLimit(currentLimit)
  }

  return (
    <Container>
      <TopSection>
        <NavBar />
      </TopSection>
      <BottomSection>
        <ResultsTitle variant="h4">{`Results for "${location.state.search}"`}</ResultsTitle>
        <DetailsSection>
          <ResultsLabel>{`${results.length} mentors found`}</ResultsLabel>
          <RightSection>
            <AntSwitch
              onChange={() => {
                setShowPrice(prev => !prev)
              }}
            />
            <ResultsLabel sx={{ order: '2', marginRight: '3rem' }}>Show all prices</ResultsLabel>
            <ResultsLabel sx={{ order: '3' }}>Filter by </ResultsLabel>
            <FilterDropdown />
          </RightSection>
        </DetailsSection>
        <CardsSection>
          {results.slice(0, limit).map((mentor: Props) => (
            <MuiCard
              key={mentor.id}
              first_name={mentor.first_name}
              last_name={mentor.last_name}
              description={mentor.description}
              price={mentor.price}
              showPrice={showPrice}
            />
          ))}
        </CardsSection>
        {results.length > 8 && (
          <LoadAction>
            <LoadButton onClick={loadButton}>{isExpanded ? 'Show Less' : 'Load More'}</LoadButton>
          </LoadAction>
        )}
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
  justify-content: flex-start;
`

const TopSection = styled('div')`
  height: 10%;
  flex: 1 50%;
  margin-bottom: 10rem;
`

const BottomSection = styled('div')`
  display: flex;
  flex-flow: row wrap;
  height: fit-content;
  min-width: 100%;
  flex: 1;
`

const ResultsTitle = styled(Typography)`
  min-width: 50%;
  height: 3rem;
  font-weight: bold;
  order: 1;
  padding: 0 11rem;
`

const DetailsSection = styled('div')`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 1rem 11rem 0;
  order: 2;
`

const RightSection = styled('div')`
  display: flex;
  min-width: 80%;
  height: fit-content;
  align-items: center;
  justify-content: flex-end;
  flex-flow: row wrap;
  order: 2;
`

const FilterDropdown = styled(Dropdown)`
  display: flex;
  color: ${props => props.theme.palette.common.black};
  height: fit-content;
  padding: 0;
  justify-content: flex-end;
  order: 4;
`

const ResultsLabel = styled(Typography)`
  width: fit-content;
  align-items: center;
  margin: none;
  font-size: 1rem;
  font-weight: bold;
  order: 1;
`

const CardsSection = styled('div')`
  display: flex;
  width: 100%;
  height: fit-content;
  flex-flow: row wrap;
  padding: 1rem 11rem 0;
  order: 2;
`

const LoadAction = styled('div')`
  display: flex;
  width: 100%;
  height: fit-content;
  justify-content: center;
  padding-top: 1rem;
  order: 3;
`

const LoadButton = styled(Button)`
  background-color: #dddddd;
  color: ${props => props.theme.palette.common.black};
  :hover {
    background-color: #4caf50;
    color: ${props => props.theme.palette.common.white};
    transition: color 0.125s ease-in-out;
  }
`

const AntSwitch = styled(Switch)(() => ({
  order: 1,
  width: 28,
  height: 16,
  padding: 0,
  marginRight: '.5rem',
  justifyContent: 'flex-end',
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#000',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}))

export default ResultsPage
