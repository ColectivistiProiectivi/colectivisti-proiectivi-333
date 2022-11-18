import React from 'react'
import { styled, Button, Box, Typography, TextField, CircularProgress } from '@mui/material'
import { Link as MuiLink } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { User } from '../../../types/User'
import { authenticateUser } from '../actions'

export type LoginFormType = Pick<User, 'email' | 'password'>

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>()

  const dispatch = useAppDispatch()
  const loginLoading = useAppSelector(state => state.appState.loginLoading)
  const loginSuccessful = useAppSelector(state => state.appState.loginComplete)

  const navigate = useNavigate()

  // Wire to backend endpoint using RTK (create a slice etc.)
  // Note: handleRegistrationSubmit accepts formData as a parameter
  const handleLoginSubmit: SubmitHandler<LoginFormType> = formData => {
    // API call to '/login'
    dispatch(authenticateUser(formData))
  }

  // Redirect to homepage if user has been successfully logged in
  if (loginSuccessful) {
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }

  return (
    <Wrapper>
      <Header>
        <Typography variant="h4" color="text.secondary">
          Sign in
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Enter your credentials
        </Typography>
      </Header>
      <FormContainer component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
        <TextFieldGroup>
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

        <SubmitButton type="submit">
          {loginLoading ? <CircularProgress color="inherit" size={24} /> : 'Sign in'}
        </SubmitButton>

        {/* TODO: Hook up forgot password or maybe not */}
        <MuiLink href="" color="secondary.main" variant="caption">
          Forgot password?
        </MuiLink>

        <StyledLink href="/register" color="secondary.main">
          Don&apos;t have an account?
        </StyledLink>
      </FormContainer>
    </Wrapper>
  )
}

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 584px;
  width: 100%;
  position: relative;
  gap: 24px;
`

const FormContainer = styled(Box)`
  max-height: 584px;
  display: flex;
  flex-direction: column;
  padding: 0 32px;
  margin: 0 24px;
  gap: 2px;
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

const StyledLink = styled(MuiLink)`
  position: absolute;
  bottom: 20px;
  align-self: center;
`
