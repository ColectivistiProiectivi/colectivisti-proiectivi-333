import React from 'react'
import SearchSharpIcon from '@mui/icons-material/SearchSharp'
import { styled, Input } from '@mui/material'

export const SearchBar: React.FC = () => {
  const submitButton = () => {
    //Sends the data to the endpoint and displays the results based on user's needs
  }

  return (
    <Container>
      <SearchIcon />
      <SearchInput placeholder="Search Announcements..." onChange={submitButton} disableUnderline={true} />
    </Container>
  )
}

const Container = styled('div')`
  display: flex;
  align-items: center;
  background-color: #eea247;
  height: 2.5rem;
  min-width: 35%;
  order: 1;
`

const SearchInput = styled(Input)`
  width: 75%;
  input,
  label {
    color: ${props => props.theme.palette.common.black};
    font-weight: bold;
  }
  fieldset {
    color: ${props => props.theme.palette.common.black};
  }
`

const SearchIcon = styled(SearchSharpIcon)`
  width: 10%;
  color: ${props => props.theme.palette.common.black};
`
