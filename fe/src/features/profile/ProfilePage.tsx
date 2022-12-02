import React, { useEffect } from 'react'
import { Button, css, Divider, styled, TextField, Typography } from '@mui/material'
import { UserDto } from '../../types/User'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectUserData, selectUserDataLoading } from './selectors'
import { LoadingOverlay } from '../common/LoadingOverlay'
import { fetchUserData } from './actions'
import { urlMatchRegexp } from './utils'

export type ProfileFormType = Omit<UserDto, 'email' | 'role'>

const useUserData = () => {
  const dispatch = useAppDispatch()

  const userData = useAppSelector(selectUserData)
  const userDataLoading = useAppSelector(selectUserDataLoading)

  const refetchUser = () => {
    dispatch(fetchUserData())
  }

  useEffect(() => {
    refetchUser()
  }, [])

  return {
    userData,
    userDataLoading,
    refetchUser,
  }
}

const ProfilePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormType>()
  const { userData, userDataLoading } = useUserData()
  // const dispatch = useAppDispatch()

  useEffect(() => {
    if (userData) {
      for (const [key, value] of Object.entries(userData)) {
        setValue(key as keyof ProfileFormType, value)
      }
    }
  }, [userData])

  const handleSaveProfile: SubmitHandler<ProfileFormType> = _formData => {
    // API call to '/users/profile'
    // dispatch(updateUser(formData))
  }

  return (
    <Container>
      <LoadingOverlay visible={userDataLoading} />
      <FormTitle variant="h5">Profile Info</FormTitle>
      <FormWrapper onSubmit={handleSubmit(handleSaveProfile)}>
        <FormSection>
          <FormSubtitle>Account settings</FormSubtitle>
          <StyledTextField
            value={userData?.email}
            InputProps={{
              readOnly: true,
            }}
            disabled
            label="Email"
            helperText="Cannot be modified"
            size="small"
            color="info"
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
            color="info"
            fullWidth
          />
        </FormSection>
        <Divider />

        <FormSection>
          <FormSubtitle>Biography</FormSubtitle>
          <StyledTextField
            {...register('profilePicture', {
              pattern: {
                value: urlMatchRegexp,
                message: 'URL not valid',
              },
            })}
            label="Picture URL"
            error={!!errors.profilePicture}
            helperText={errors.profilePicture?.message}
            size="small"
            color="info"
            fullWidth
          />
          <StyledTextField
            {...register('birthdate')}
            label="Birth Date"
            helperText={'DD/MM/YYYY'}
            size="small"
            color="info"
            fullWidth
          />
          <StyledTextField
            {...register('completedStudies')}
            label="Completed Studies"
            size="small"
            color="info"
            fullWidth
          />
          <StyledTextField
            {...register('description', { maxLength: 200 })}
            label="Description"
            helperText="Max 200 characters"
            size="small"
            color="info"
            fullWidth
          />
          <StyledTextField
            {...register('ongoingStudy', { maxLength: 50 })}
            label="Ongoing Study"
            helperText="Max 50 characters"
            size="small"
            color="info"
            fullWidth
          />
          <StyledTextField {...register('interestAreas')} label="Interest Areas" size="small" color="info" fullWidth />
        </FormSection>

        <SaveButton variant="contained" color="info" type="submit">
          Update Profile
        </SaveButton>
      </FormWrapper>
    </Container>
  )
}

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const FormTitle = styled(Typography)`
  margin-bottom: 15px;
  font-weight: bold;
`

const FormSubtitle = styled(Typography)`
  margin-bottom: 20px;
`

const FormWrapper = styled('form')`
  display: flex;
  flex-direction: column;
  width: 350px;
  gap: 4px;
  padding: 20px 0;
`

const FormSection = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 20px 0;
`

const SaveButton = styled(Button)`
  margin-top: 10px;
  color: white;
`

const StyledTextField = styled(TextField)`
  ${props =>
    !props.error &&
    css`
      margin-bottom: 24px;
    `}
`

export default ProfilePage
