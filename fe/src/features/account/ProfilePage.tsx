import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, css, styled, Tab, Tabs, TextField, Typography } from '@mui/material'
import { UserDto } from '../../types/User'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoadingOverlay } from '../common/LoadingOverlay'
import { dateMatchRegexp, initialPictureURL } from './utils'
import { useAppSelector } from '../../redux/hooks'
import { selectUserData, selectUserDataLoading } from './selectors'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'

export type ProfileFormType = Omit<UserDto, 'email' | 'role'>

enum Section {
  GENERAL,
  PROFILE,
}

const ProfilePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<ProfileFormType>()
  const userData = useAppSelector(selectUserData)
  const userDataLoading = useAppSelector(selectUserDataLoading)

  useEffect(() => {
    if (userData) {
      for (const [key, value] of Object.entries(userData)) {
        setValue(key as keyof ProfileFormType, value, { shouldDirty: false })
      }
    }
  }, [userData])

  const handleSaveProfile: SubmitHandler<ProfileFormType> = _formData => {
    // IMPORTANT: Interest areas and fields that contain a list of strings should be handled here separately
    // API call to '/users/account'
    // dispatch(updateUser(formData))
  }

  // Handling Changing Section
  const [section, setSection] = useState(Section.GENERAL)
  const generalSectionRef = useRef<HTMLDivElement>(null)
  const profileSectionRef = useRef<HTMLDivElement>(null)

  const handleSectionChange = (_e: React.SyntheticEvent, section: Section) => {
    const activeSection = document.getElementById(section.toString())

    activeSection?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
    setSection(section)
  }

  const calculateSectionReached = useCallback(() => {
    if (generalSectionRef.current && profileSectionRef.current) {
      const generalHeight = generalSectionRef.current.offsetHeight
      const generalOffset = generalSectionRef.current.offsetTop - generalHeight

      const profileHeight = profileSectionRef.current.offsetHeight
      const profileOffset = profileSectionRef.current.offsetTop - profileHeight

      if (window.scrollY >= generalOffset && window.scrollY < profileOffset) {
        setSection(Section.GENERAL)
      }

      if (window.scrollY >= profileOffset) {
        setSection(Section.PROFILE)
      }
    }
  }, [generalSectionRef, profileSectionRef])

  document.addEventListener('scroll', calculateSectionReached)

  // Handling User Profile Picture
  const pictureRef = useRef<HTMLInputElement>(null)

  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile: File = e.target.files[0]
      const imageURL = URL.createObjectURL(imageFile)
      setValue('profilePicture', imageURL)
    }
  }

  const pictureURL = watch('profilePicture')

  return (
    <Container>
      <LoadingOverlay visible={userDataLoading} />
      <FormTitle variant="overline">Profile</FormTitle>
      <FormWrapper onSubmit={handleSubmit(handleSaveProfile)}>
        <PictureSection>
          <PictureWrapper onClick={() => pictureRef.current?.click()}>
            <PictureHoverIcon id="image-upload-icon" />
            <Picture src={pictureURL || initialPictureURL} />
          </PictureWrapper>
          <PictureSubtitle variant="overline">Upload a photo</PictureSubtitle>
          <PictureInput ref={pictureRef} type="file" accept="image/png, image/jpeg" onChange={handlePictureUpload} />
        </PictureSection>

        <FormSection ref={generalSectionRef} id={Section.GENERAL.toString()}>
          <FormSubtitle variant="overline">General</FormSubtitle>
          <StyledTextField
            value={userData?.email || ''}
            InputProps={{
              readOnly: true,
            }}
            disabled
            label="Email"
            helperText="Cannot be modified"
            size="small"
            color="secondary"
            fullWidth
          />
          <StyledTextField
            {...register('fullName', {
              minLength: {
                value: 3,
                message: 'Full name should be min 3 characters long',
              },
            })}
            label="Full Name"
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            size="small"
            color="secondary"
            fullWidth
          />
          <StyledTextField
            {...register('password', {
              minLength: {
                value: 6,
                message: 'Password too short',
              },
            })}
            label="New Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            size="small"
            color="secondary"
            fullWidth
          />
        </FormSection>
        <FormSection ref={profileSectionRef} id={Section.PROFILE.toString()}>
          <FormSubtitle variant="overline">Profile</FormSubtitle>
          <StyledTextField
            {...register('birthdate', { pattern: { value: dateMatchRegexp, message: 'Wrong Date Format' } })}
            label="Birth Date"
            helperText={'Date format: DD/MM/YYYY'}
            size="small"
            color="secondary"
            fullWidth
          />
          <StyledTextField
            {...register('completedStudies')}
            label="Completed Studies"
            helperText="Words separated by commas"
            size="small"
            color="secondary"
            fullWidth
          />
          <StyledTextField
            {...register('description', { maxLength: 200 })}
            label="Description"
            helperText="Max 200 characters"
            size="small"
            color="secondary"
            fullWidth
          />
          <StyledTextField
            {...register('ongoingStudy', { maxLength: 50 })}
            label="Ongoing Study"
            helperText="Max 50 characters"
            size="small"
            color="secondary"
            fullWidth
          />
          <StyledTextField
            {...register('interestAreas')}
            label="Interest Areas"
            helperText="Words separated by commas"
            size="small"
            color="secondary"
            fullWidth
          />
        </FormSection>

        <SaveButton variant="contained" color="secondary" type="submit" disabled={!isValid}>
          Update Profile
        </SaveButton>
      </FormWrapper>
      <TabsWrapper>
        <Typography variant="overline">Sections</Typography>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={section}
          onChange={handleSectionChange}
          sx={{ borderLeft: 1, borderColor: 'divider' }}
          TabIndicatorProps={{ sx: { left: 0 } }}
          indicatorColor="secondary"
        >
          <SectionTab label="GENERAL" aria-selected={section === Section.GENERAL} />
          <SectionTab label="PROFILE" aria-selected={section === Section.PROFILE} />
        </Tabs>
      </TabsWrapper>
    </Container>
  )
}

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const FormTitle = styled(Typography)`
  font-weight: bold;
  font-size: 24px;
  margin: 0;
`

const FormSubtitle = styled(Typography)`
  font-weight: bold;
  margin-bottom: 15px;
`

const FormWrapper = styled('form')`
  gap: 4px;
  padding: 20px;
  width: 50%;
`

const FormSection = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 20px 0;
`

const SaveButton = styled(Button)`
  color: white;
`

const StyledTextField = styled(TextField)`
  ${props =>
    !props.error &&
    css`
      margin-bottom: 24px;
    `}
`

const PictureSection = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const PictureWrapper = styled('div')`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  transition: opacity 0.15s ease-in-out;

  :hover {
    opacity: 0.4;
    cursor: pointer;

    #image-upload-icon {
      opacity: 0.8;
      transform: scale(1.1);
    }
  }
`

const PictureHoverIcon = styled(AddPhotoAlternateIcon)`
  opacity: 0;
  position: absolute;
  align-self: center;
  width: 45px;
  height: 45px;
  color: #ddd;
  transition: all 0.15s ease-in-out;
`

const Picture = styled('img')`
  object-fit: cover;
  width: 150px;
  height: 150px;
`

const PictureSubtitle = styled(Typography)`
  font-weight: bold;
`

const PictureInput = styled('input')`
  display: none;
`

const TabsWrapper = styled('div')`
  position: fixed;
  right: 15%;
  top: 90px;
`

const SectionTab = styled(Tab)`
  ${props =>
    props['aria-selected'] &&
    css`
      color: ${props.theme.palette.secondary.main} !important;
    `}
`

export default ProfilePage
