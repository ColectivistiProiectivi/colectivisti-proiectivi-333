import React, { useEffect } from 'react'
import { Button, css, styled, Tab, Tabs, Typography } from '@mui/material'
import { UserDto } from '../../types/User'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { LoadingOverlay } from '../common/LoadingOverlay'
import { dateMatchRegexp } from './utils'
import { useAppSelector } from '../../redux/hooks'
import { selectUserData, selectUserDataLoading } from './selectors'
import { FormInput, FormInputWithChips, ReadOnlyFormInput } from './FormInput'
import { ProfilePicture } from './ProfilePicture'
import { Section, useSectionScroll } from './hooks'

export type ProfileFormType = Omit<UserDto, 'email' | 'role' | 'profilePicture'> & {
  profilePicture?: File
}

const ProfilePage: React.FC = () => {
  const formMethods = useForm<ProfileFormType>()
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = formMethods
  const userData = useAppSelector(selectUserData)
  const userDataLoading = useAppSelector(selectUserDataLoading)
  const { generalSectionRef, profileSectionRef, activeSection, handleSectionChange } = useSectionScroll()

  // Load fields with existing data
  useEffect(() => {
    if (userData) {
      for (const [key, value] of Object.entries(userData)) {
        setValue(key as keyof ProfileFormType, value, { shouldDirty: false })
      }
    }
  }, [userData])

  const handleSaveProfile: SubmitHandler<ProfileFormType> = _formData => {
    // IMPORTANT: Interest areas and fields that contain a list of strings should be handled here separately
    // API call to '/users/profile'
    // dispatch(updateUser(formData))
  }

  return (
    <Container>
      <LoadingOverlay visible={userDataLoading} />
      <FormTitle variant="overline">Profile</FormTitle>
      <FormProvider {...formMethods}>
        <FormWrapper onSubmit={handleSubmit(handleSaveProfile)}>
          <PictureSection>
            <ProfilePicture />
            <PictureSubtitle variant="overline">Upload a photo</PictureSubtitle>
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
          value={activeSection}
          onChange={handleSectionChange}
          sx={{ borderLeft: 1, borderColor: 'divider' }}
          TabIndicatorProps={{ sx: { left: 0 } }}
          indicatorColor="secondary"
        >
          <SectionTab label="GENERAL" aria-selected={activeSection === Section.GENERAL} />
          <SectionTab label="PROFILE" aria-selected={activeSection === Section.PROFILE} />
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

const PictureSubtitle = styled(Typography)`
  font-weight: bold;
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
