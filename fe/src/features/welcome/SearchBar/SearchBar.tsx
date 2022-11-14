import React from 'react'
import SearchSharpIcon from '@mui/icons-material/SearchSharp'
import { styled, Button, TextField } from '@mui/material'

const SearchBar: React.FC = () => {
  const submitButton = () => {
    //TO DO
  }

  return (
    <Container>
      <SearchSharpIcon style={styles.icon} />
      <SearchInput label="Type a subject or a name" type="text" size="small" onChange={submitButton} />
      <SearchButton type="submit" onClick={submitButton}>
        Search
      </SearchButton>
    </Container>
  )
}

const Container = styled('div')`
  display: flex;
  background-color: #dddddd;
  justify-content: flex-start;
  border-radius: 0.5rem;
  height: 2.5rem;
  margin-top: 2rem;
  width: 35%;
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
  }
`
const SearchInput = styled(TextField)`
  width: 100%;
  border: none;
  input,
  label {
    color: #616161;
    font-weight: bold;
  }
  fieldset {
    color: #616161;
    border: none;
  }
`

const styles = {
  icon: {
    width: 'auto',
    color: '#616161',
    padding: '.5rem .5rem 0',
    fontSize: '30',
  },
}
export default SearchBar
