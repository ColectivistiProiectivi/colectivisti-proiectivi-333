import React from 'react'
import {
  styled,
  Button,
  Box,
  Typography,
  FormControl,
  FormLabel,
  TextField,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  CircularProgress,
} from '@mui/material'
import { Link as MuiLink } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import { RegisterUserDTO, Role, User } from '../../../types/User'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { addUser } from '../actions'

export type RegistrationFormType = Omit<User, 'profilePic' | 'interestAreas'> & {
  confirmPassword: string
  terms: boolean
}

export const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegistrationFormType>({ defaultValues: { terms: false } })

  const dispatch = useAppDispatch()
  const registerLoading = useAppSelector(state => state.appState.registerLoading)

  // Wire to backend endpoint using RTK (create a slice etc.)
  // Note: handleRegistrationSubmit accepts formData as a parameter
  const handleRegistrationSubmit: SubmitHandler<RegistrationFormType> = formData => {
    // transform Form Data into User object
    const userData: RegisterUserDTO = {
      username: formData.email,
      fullName: formData.fullName,
      role: formData.role,
      password: formData.password,
    }

    // API call to '/register'
    dispatch(addUser(userData))
  }

  return (
    <Wrapper>
      <Header>
        <Typography variant="h4" color="text.secondary">
          Sign up
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Tell us about yourself
        </Typography>
      </Header>
      <FormContainer component="form" onSubmit={handleSubmit(handleRegistrationSubmit)}>
        <TextFieldGroup>
          <StyledTextField
            {...register('fullName', { required: 'Full Name is required' })}
            label="Full Name"
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            size="small"
          />
          <StyledTextField
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Invalid email address',
              },
            })}
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
            size="small"
          />
        </TextFieldGroup>
        <StyledTextField
          {...register('password', {
            required: 'Password is required',
            minLength: 6,
          })}
          label="Password"
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message}
          size="small"
          fullWidth
        />
        <StyledTextField
          {...register('confirmPassword', {
            required: 'Confirm Password is required',
            minLength: 6,
            validate: {
              passwordsNotMatching: confirmPasswordValue =>
                confirmPasswordValue === getValues('password') || 'Password not matching',
            },
          })}
          label="Confirm Password"
          type="password"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          size="small"
          fullWidth
        />
        <RoleFormControl>
          <FormLabel>I want to participate as</FormLabel>
          <RadioGroup defaultValue={false}>
            <FormControlLabel
              {...register('role')}
              value={Role.STUDENT}
              control={<Radio size="small" />}
              label="Student"
            />
            <FormControlLabel
              {...register('role')}
              value={Role.MENTOR}
              control={<Radio size="small" />}
              label="Mentor"
            />
          </RadioGroup>
        </RoleFormControl>

        <FormControlLabel
          control={<Checkbox {...register('terms', { required: true })} />}
          label={
            <Typography color={errors.terms ? 'error' : 'text.secondary'}>
              I agree with the Terms & Conditions
            </Typography>
          }
        />
        <SubmitButton type="submit">
          {registerLoading ? <CircularProgress color="inherit" size={24} /> : 'Create Account'}
        </SubmitButton>
        <MuiLink href="/login" color="secondary.main">
          Already registered?
        </MuiLink>
      </FormContainer>
    </Wrapper>
  )
}

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`

const FormContainer = styled(Box)`
  max-height: 584px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 32px;
  margin: 0 24px;
`

const Header = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
  user-select: none;
`

const TextFieldGroup = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 24px;
`

const StyledTextField = styled(TextField)`
  height: 64px;

  input,
  label {
    color: ${props => props.theme.palette.text.secondary};
  }

  fieldset {
    border-color: ${props => props.theme.palette.text.secondary};
  }

  &:hover fieldset {
    border-color: ${props => props.theme.palette.primary.main} !important;
    transition: border-color 0.125s ease-in-out;
  }
`

const SubmitButton = styled(Button)`
  background-color: ${props => props.theme.palette.secondary.main};
  color: ${props => props.theme.palette.common.white};

  :hover {
    background-color: ${props => props.theme.palette.common.white};
    color: ${props => props.theme.palette.common.black};
  }
`

const RoleFormControl = styled(FormControl)`
  &,
  label,
  span {
    color: ${props => props.theme.palette.text.secondary} !important;
  }
`
