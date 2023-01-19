import React from 'react'
// import React, { useEffect } from 'react'
import SearchSharpIcon from '@mui/icons-material/SearchSharp'
import { styled, Input } from '@mui/material'
import { useNavigate } from 'react-router'
import { paths } from '../../../api'
// import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
// import { fetchAnnouncements } from '../../announcements/actions'
// import { fetchAnnouncements, fetchAnnouncementsSearchResults } from '../../announcements/actions'
// import { selectAnnouncementsData, selectAnnouncementsResultsError, selectAnnouncementsResultsLoading } from '../../announcements/selectors'
// import { selectAnnouncementsData } from '../../announcements/selectors'

// import { Loader } from '../Loader'

export const SearchBar: React.FC = () => {
  const navigate = useNavigate()
  // const dispatch = useAppDispatch()
  // const resultsAnnouncementsLoading = useAppSelector(selectAnnouncementsResultsLoading)
  // const resultsAnnouncementsError = useAppSelector(selectAnnouncementsResultsError)
  // const resultsAnnouncementsData = useAppSelector(selectAnnouncementsData)

  // Load announcements data on page load
  // useEffect(() => {
  //   dispatch(fetchAnnouncements())
  // }, [dispatch])

  // if (resultsAnnouncementsLoading) {
  //   return <Loader fullscreen={true} />
  // }

  // if (resultsAnnouncementsError || !resultsAnnouncementsData) {
  //   return null
  // }
  //e: React.KeyboardEvent
  const onInputChange = () => {
    // console.log(e.target)
    // if (e.key === 'Enter') {
    //   dispatch(fetchAnnouncementsSearchResults())
    // }
  }

  return (
    <Container>
      <SearchIcon />
      <SearchInput
        placeholder="Search Announcements..."
        onChange={() => navigate(paths.ANNOUNCEMENTS)}
        onKeyDown={onInputChange}
        disableUnderline={true}
      />
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
