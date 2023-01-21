import React, { useEffect } from 'react'
import { Autocomplete, Button, css, styled, Tab, Tabs, TextField, Typography } from '@mui/material'
import { UserDto } from '../../types/User'
import { SubmitHandler, useForm, FormProvider, useController } from 'react-hook-form'
import { LoadingOverlay } from '../common/LoadingOverlay'
import { dateMatchRegexp } from './utils'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  selectCompletedStudiesOptions,
  selectCompletedStudiesOptionsLoading,
  selectInterestAreasOptions,
  selectInterestAreasOptionsLoading,
  selectUpdateUserLoading,
  selectUserAvatar,
  selectUserAvatarLoading,
  selectUserData,
  selectUserDataLoading,
} from './selectors'
import { FormInput, ReadOnlyFormInput } from '../common/FormInput'
import { ProfilePicture } from './ProfilePicture'
import { Section, useSectionScroll } from './hooks'
import { fetchCompletedStudiesOptions, fetchInterestAreasOptions, updateUserData } from './actions'

export type ProfileFormType = Omit<UserDto, 'email' | 'role' | 'profilePicture'> & {
  profilePicture?: File
  password: string
}

export type ProfileSubmitType = Omit<
  UserDto,
  'email' | 'role' | 'profilePicture' | 'completedStudies' | 'interestAreas'
> & {
  profilePicture?: File
  completedStudyIds: number[]
  interestAreaIds: number[]
  ongoingStudyId?: number
  password?: string
}

const ProfilePage: React.FC = () => {
  const formMethods = useForm<ProfileFormType>()
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isDirty },
  } = formMethods
  const { generalSectionRef, profileSectionRef, activeSection, handleSectionChange } = useSectionScroll()
  const dispatch = useAppDispatch()

  const userData = useAppSelector(selectUserData)
  const userDataLoading = useAppSelector(selectUserDataLoading)

  const userAvatar = useAppSelector(selectUserAvatar)
  const userAvatarLoading = useAppSelector(selectUserAvatarLoading)

  const updateUserLoading = useAppSelector(selectUpdateUserLoading)

  const completedStudiesOptions = useAppSelector(selectCompletedStudiesOptions)
  const completedStudiesOptionsLoading = useAppSelector(selectCompletedStudiesOptionsLoading)

  const interestAreasOptions = useAppSelector(selectInterestAreasOptions)
  const interestAreasOptionsLoading = useAppSelector(selectInterestAreasOptionsLoading)

  // Load Completed Studies Options
  useEffect(() => {
    dispatch(fetchCompletedStudiesOptions())
    dispatch(fetchInterestAreasOptions())
  }, [])

  // Load fields with existing data
  useEffect(() => {
    if (userData) {
      for (const [key, value] of Object.entries(userData)) {
        setValue(key as keyof ProfileFormType, value, { shouldDirty: false })
      }
    }
  }, [userData])

  // Load the user profile picture
  useEffect(() => {
    if (userAvatar) {
      const userAvatarObject = new File([userAvatar], 'profilePicture.jpg')
      setValue('profilePicture', userAvatarObject, { shouldDirty: false })
    }
  }, [userAvatar])

  const handleSaveProfile: SubmitHandler<ProfileFormType> = formData => {
    // IMPORTANT: Interest areas and fields that contain a list of strings should be handled here separately
    // API call to '/users/profile'
    const parsedCompletedStudies = formData['completedStudies']?.map(completedStudy => completedStudy.id) || []
    const parsedInterestAreas = formData['interestAreas']?.map(interestArea => interestArea.id) || []
    const parsedOngoingStudy = formData['ongoingStudy']?.id || undefined
    const parsedPassword = formData['password'] === '' ? undefined : formData['password']

    const submittedData: ProfileSubmitType = {
      ...formData,
      completedStudyIds: parsedCompletedStudies,
      interestAreaIds: parsedInterestAreas,
      ongoingStudyId: parsedOngoingStudy,
      password: parsedPassword,
    }

    dispatch(updateUserData(submittedData))
  }

  const { field: ongoingStudyField } = useController({ name: 'ongoingStudy', control })
  const { field: completedStudiesField } = useController({ name: 'completedStudies', control })
  const { field: interestAreasField } = useController({ name: 'interestAreas', control })

  const ongoingStudyValue = formMethods.watch('ongoingStudy')
  const completeStudiesValue = formMethods.watch('completedStudies')
  const interestAreasValue = formMethods.watch('interestAreas')

  const isPageLoading =
    userDataLoading ||
    userAvatarLoading ||
    updateUserLoading ||
    completedStudiesOptionsLoading ||
    interestAreasOptionsLoading

  return (
    <Container>
      <LoadingOverlay visible={isPageLoading} />
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
              helperText="Date format: DD-MM-YYYY"
            />
            <Autocomplete
              autoHighlight
              options={completedStudiesOptions || []}
              getOptionLabel={option => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              value={ongoingStudyValue || null}
              renderInput={params => (
                <TextField
                  {...params}
                  helperText={errors.ongoingStudy?.message}
                  error={!!errors.ongoingStudy}
                  label="Ongoing Study"
                  InputLabelProps={{ shrink: true }}
                  color="secondary"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
              onChange={(_, newOngoingStudy) => {
                formMethods.clearErrors('ongoingStudy')
                if (!newOngoingStudy) {
                  formMethods.setError('ongoingStudy', new Error('Required field!'))
                }

                ongoingStudyField.onChange(newOngoingStudy, { shouldDirty: true })
                ongoingStudyField.onBlur()
              }}
            />
            <Autocomplete
              multiple
              options={completedStudiesOptions || []}
              getOptionLabel={option => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              value={completeStudiesValue ?? []}
              filterSelectedOptions
              renderInput={params => (
                <TextField
                  {...params}
                  helperText={errors.completedStudies?.message}
                  error={!!errors.completedStudies}
                  color="secondary"
                  InputLabelProps={{ shrink: true }}
                  label="Completed Studies"
                />
              )}
              onChange={(_, newCompletedStudies) => {
                formMethods.clearErrors('completedStudies')
                if (newCompletedStudies.length < 1) {
                  formMethods.setError('completedStudies', new Error('Must have 1 selected'))
                }

                completedStudiesField.onChange(newCompletedStudies, { shouldDirty: true })
                completedStudiesField.onBlur()
              }}
            />
            <Autocomplete
              multiple
              options={interestAreasOptions || []}
              getOptionLabel={option => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              value={interestAreasValue ?? []}
              filterSelectedOptions
              renderInput={params => (
                <TextField
                  {...params}
                  helperText={errors.interestAreas?.message}
                  error={!!errors.interestAreas}
                  color="secondary"
                  InputLabelProps={{ shrink: true }}
                  label="Interest Areas"
                />
              )}
              onChange={(_, newInterestAreas) => {
                formMethods.clearErrors('interestAreas')
                if (newInterestAreas.length < 1) {
                  formMethods.setError('interestAreas', new Error('Must have 1 selected'))
                }

                interestAreasField.onChange(newInterestAreas)
                interestAreasField.onBlur()
              }}
            />
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
            disabled={!isDirty || !!Object.values(errors).length}
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
