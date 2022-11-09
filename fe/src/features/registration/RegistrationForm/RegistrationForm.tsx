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
} from '@mui/material'
import { Link as MuiLink } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import { User } from '../../../types/User'

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

  // Wire to backend endpoint using RTK (create a slice etc.)
  // Note: handleRegistrationSubmit accepts formData as a parameter
  const handleRegistrationSubmit: SubmitHandler<RegistrationFormType> = () => {
    // console.log('Data sent:', JSON.stringify(data))
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
            {...register('fullName', { required: 'Fullname is required' })}
            label="Fullname"
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
          {...register('password', { required: 'Password is required' })}
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
            validate: {
              passwordsNotMatching: confirmPasswordValue =>
                confirmPasswordValue !== getValues('password') ? 'Passwords not matching' : true,
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
              {...register('isMentor')}
              value={false}
              control={<Radio size="small" />}
              label="Student"
            />
            <FormControlLabel {...register('isMentor')} value={true} control={<Radio size="small" />} label="Mentor" />
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
        <SubmitButton type="submit">Create Account</SubmitButton>
        {/* TODO: Attach login link when it's done */}
        <MuiLink href="" color="secondary.main">
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
  padding: 0px 32px;
  margin: 0 24px;
`

const Header = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
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
