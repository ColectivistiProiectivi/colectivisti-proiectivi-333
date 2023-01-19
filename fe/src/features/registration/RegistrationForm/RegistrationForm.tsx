import React from 'react'
import {
  styled,
  Button,
  Typography,
  FormLabel,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  css,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { SubmitHandler, useController, useForm } from 'react-hook-form'

import { BaseUser, RegisterUserDTO, Role } from '../../../types/User'
import { useAppDispatch } from '../../../redux/hooks'
import { addUser } from '../actions'
import { resetAuthState } from '../../application/slice'

export type RegistrationFormType = BaseUser & {
  password: string
  confirmPassword: string
  terms: boolean
}

interface RegistrationFormProps {
  loginClick: () => void
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ loginClick }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    control,
  } = useForm<RegistrationFormType>()

  const dispatch = useAppDispatch()

  const { field: roleField } = useController({
    name: 'role',
    control,
    rules: { required: true },
    defaultValue: Role.STUDENT,
  })

  const resetForm = () => {
    reset({
      email: '',
      fullName: '',
      role: Role.STUDENT,
      password: '',
      confirmPassword: '',
      terms: false,
    })
  }

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
    dispatch(addUser(userData)).then(response => {
      if (response.type === 'addUser/fulfilled') {
        // empty all fields after submitting
        resetForm()

        // Move back to log in after successfully registering
        loginClick()

        // make sure to reset loading / complete status for registration action
        dispatch(resetAuthState())
      }
    })
  }

  const goToLogin = () => {
    resetForm()
    loginClick()
  }

  return (
    <Container>
      <ArrowBack onClick={goToLogin} />
      <FormTitle variant="h4">Sign Up</FormTitle>
      <FormWrapper onSubmit={handleSubmit(handleRegistrationSubmit)}>
        <TextFieldGroup>
          <StyledTextField
            {...register('fullName', { required: 'Full Name is required' })}
            label="Full Name"
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            color="secondary"
            variant="filled"
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
            color="secondary"
            variant="filled"
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
          variant="filled"
          color="secondary"
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
          color="secondary"
          variant="filled"
          fullWidth
        />
        <FormLabel>I want to participate as</FormLabel>
        <RadioGroup value={roleField.value}>
          <FormControlLabel
            onChange={() => {
              roleField.onChange(Role.STUDENT)
              roleField.onBlur()
            }}
            value={Role.STUDENT}
            control={<Radio size="small" color="secondary" />}
            label="Student"
          />
          <FormControlLabel
            onChange={() => {
              roleField.onChange(Role.MENTOR)
              roleField.onBlur()
            }}
            value={Role.MENTOR}
            control={<Radio size="small" color="secondary" />}
            label="Mentor"
          />
        </RadioGroup>

        <RegisterButton variant="contained" color="success" type="submit">
          Create Account
        </RegisterButton>
      </FormWrapper>
    </Container>
  )
}

const Container = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 25px;
  background: #f4f4f4;
  box-shadow: rgba(0, 0, 0, 0.16) 0 10px 36px 0, rgba(0, 0, 0, 0.06) 0 0 0 1px;
`

const FormWrapper = styled('form')`
  display: flex;
  flex-direction: column;
  width: 350px;
  gap: 4px;
`

const FormTitle = styled(Typography)`
  text-align: center;
  margin-bottom: 15px;
  font-weight: bold;
`

const ArrowBack = styled(ArrowBackIcon)`
  position: absolute;
  top: 30px;
  left: 30px;
  cursor: pointer;

  width: 30px;
  height: 30px;

  transition: color 0.1s ease-in;

  :hover {
    color: #f7941d;
  }
`

const TextFieldGroup = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 24px;
`

const StyledTextField = styled(TextField)`
  ${props =>
    !props.error &&
    css`
      margin-bottom: 24px;
    `}
`

// Note: Keeping this here in case we need it somewhere else
//
// const StyledCheckbox = styled(Checkbox)`
//   ${props =>
//     props.color === 'error' &&
//     css`
//       color: ${props.theme.palette.error.main};
//     `}
// `

const RegisterButton = styled(Button)`
  margin-top: 10px;
  color: white;
`
