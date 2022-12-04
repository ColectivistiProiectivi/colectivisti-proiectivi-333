import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, css, styled, Tab, Tabs, Typography } from '@mui/material'
import { UserDto } from '../../types/User'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { LoadingOverlay } from '../common/LoadingOverlay'
import { dateMatchRegexp, initialPictureURL } from './utils'
import { useAppSelector } from '../../redux/hooks'
import { selectUserData, selectUserDataLoading } from './selectors'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { FormInput, FormInputWithChips, ReadOnlyFormInput } from './FormInput'

export type ProfileFormType = Omit<UserDto, 'email' | 'role' | 'profilePicture'> & {
  profilePicture?: File
}

enum Section {
  GENERAL,
  PROFILE,
}

const ProfilePage: React.FC = () => {
  const formMethods = useForm<ProfileFormType>()
  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = formMethods
  const userData = useAppSelector(selectUserData)
  const userDataLoading = useAppSelector(selectUserDataLoading)

  // Handle Fields Info
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

  // TODO: Fix this / refactor
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
      formMethods.setValue('profilePicture', imageFile)
    }
  }

  const pictureURL = watch('profilePicture')

  return (
    <Container>
      <LoadingOverlay visible={userDataLoading} />
      <FormTitle variant="overline">Profile</FormTitle>
      <FormProvider {...formMethods}>
        <FormWrapper onSubmit={handleSubmit(handleSaveProfile)}>
          <PictureSection>
            <PictureWrapper onClick={() => pictureRef.current?.click()}>
              <PictureHoverIcon id="image-upload-icon" />
              <Picture src={pictureURL ? URL.createObjectURL(pictureURL) : initialPictureURL} />
            </PictureWrapper>
            <PictureSubtitle variant="overline">Upload a photo</PictureSubtitle>
            <PictureInput ref={pictureRef} type="file" accept="image/png, image/jpeg" onChange={handlePictureUpload} />
          </PictureSection>

          <FormSection ref={generalSectionRef} id={Section.GENERAL.toString()}>
            <FormSubtitle variant="overline">General</FormSubtitle>
            <ReadOnlyFormInput label="Email" value={userData?.email || ''} />
            <FormInput
              label="Full Name"
              fieldName="fullName"
              options={{
                minLength: {
                  value: 3,
                  message: 'Full name should be min 3 characters long',
                },
              }}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />
            <FormInput
              label="New Password"
              fieldName={'password'}
              options={{
                minLength: {
                  value: 6,
                  message: 'Password too short',
                },
              }}
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </FormSection>
          <FormSection ref={profileSectionRef} id={Section.PROFILE.toString()}>
            <FormSubtitle variant="overline">Profile</FormSubtitle>
            <FormInput
              label="Birth Date"
              fieldName="birthdate"
              options={{ pattern: { value: dateMatchRegexp, message: 'Wrong Date Format' } }}
              error={!!errors.birthdate}
              helperText="Date format: DD/MM/YYYY"
            />
            <FormInput
              label="Ongoing Study"
              fieldName="ongoingStudy"
              options={{ maxLength: 50 }}
              helperText="Max 50 characters"
            />
            <FormInputWithChips label="Completed Studies" fieldName="completedStudies" />
            <FormInputWithChips label="Interest Areas" fieldName="interestAreas" />
            <FormInput
              label="Description"
              fieldName="description"
              options={{ maxLength: 200 }}
              helperText="Max 200 characters"
              multiline
              rows={3}
            />
          </FormSection>

          <SaveButton
            variant="contained"
            color="secondary"
            type="submit"
            disabled={!formMethods.formState.isDirty && !!Object.values(errors).length}
          >
            Update Profile
          </SaveButton>
        </FormWrapper>
      </FormProvider>
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
  padding: 20px;
  width: 50%;
`

const FormSection = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
`

const SaveButton = styled(Button)`
  color: white;
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
