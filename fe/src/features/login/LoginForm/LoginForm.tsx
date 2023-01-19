import React from 'react'
import { useNavigate } from 'react-router-dom'
import { styled, Button, Typography, TextField, css, Divider } from '@mui/material'
import { Link as MuiLink } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useAppDispatch } from '../../../redux/hooks'
import { User } from '../../../types/User'
import { authenticateUser } from '../actions'
import { resetAuthState } from '../../application/slice'
import { paths } from '../../../api'

export type LoginFormType = Pick<User, 'email'> & { password: string }

interface LoginFormProps {
  registerClick: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ registerClick }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormType>()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // Wire to backend endpoint using RTK (create a slice etc.)
  // Note: handleRegistrationSubmit accepts formData as a parameter
  const handleLoginSubmit: SubmitHandler<LoginFormType> = async formData => {
    // API call to '/login'
    dispatch(authenticateUser(formData)).then(() => {
      dispatch(resetAuthState())
      navigate(paths.PROFILE)
    })
  }

  const goToRegister = () => {
    registerClick()
    reset()
  }

  return (
    <Container>
      <FormTitle variant="h4">Sign in</FormTitle>
      <FormWrapper onSubmit={handleSubmit(handleLoginSubmit)}>
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
          fullWidth
          variant="filled"
          color="secondary"
        />
        <StyledTextField
          {...register('password')}
          label="Password"
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message}
          size="small"
          fullWidth
          variant="filled"
          color="secondary"
        />
        {/*/!* TODO: Hook up forgot password or maybe not *!/*/}
        <MuiLink href="" color="secondary.main" variant="caption">
          Forgot password?
        </MuiLink>

        <LoginButton variant="contained" color="secondary" type="submit">
          Login
        </LoginButton>
      </FormWrapper>

      <Divider></Divider>
      <Button variant="outlined" color="success" onClick={goToRegister}>
        Register
      </Button>
    </Container>
  )
}

const Container = styled('div')`
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

const LoginButton = styled(Button)`
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
