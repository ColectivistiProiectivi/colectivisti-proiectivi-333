import React from 'react'
import SearchSharpIcon from '@mui/icons-material/SearchSharp'
import { styled, Button, Input } from '@mui/material'

export const SearchBar: React.FC = () => {
  const submitButton = () => {
    //Sends the data to the endpoint and displays the results based on user's needs
  }

  return (
    <Container>
      <SearchIcon />
      <SearchInput placeholder="Type a subject or a name" onChange={submitButton} disableUnderline={true} />
      <SearchButton type="submit" onClick={submitButton}>
        Search
      </SearchButton>
    </Container>
  )
}

const Container = styled('div')`
  display: flex;
  align-items: center;
  background: ${props => props.theme.palette.common.white};
  border-radius: 0.5rem;
  height: 2.5rem;
  width: 30%;
`

const SearchButton = styled(Button)`
  background-color: ${props => props.theme.palette.secondary.main};
  color: ${props => props.theme.palette.common.white};
  padding: 0 0.5rem;
  border-radius: 0 0.5rem 0.5rem 0;
  height: 2.5rem;
  margin-left: auto;
  :hover {
    background-color: ${props => props.theme.palette.secondary.main};
    color: ${props => props.theme.palette.common.black};
    transition: color 0.125s ease-in-out;
  }
`

const SearchInput = styled(Input)`
  width: 75%;
  input,
  label {
    color: #616161;
    font-weight: bold;
  }
  fieldset {
    color: #616161;
  }
`

const SearchIcon = styled(SearchSharpIcon)`
  width: 10%;
  color: #616161;
`
