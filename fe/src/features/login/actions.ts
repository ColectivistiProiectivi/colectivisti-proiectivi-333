import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginCall } from './services'
import { LoginUserDTO } from '../../types/User'
import { authenticate } from '../application/slice'

export const authenticateUser = createAsyncThunk('authenticateUser', async (user: LoginUserDTO, { dispatch }) => {
  const response = await loginCall(user)

  dispatch(authenticate({ jwtToken: response.data.value, user: response.data.email }))
})
