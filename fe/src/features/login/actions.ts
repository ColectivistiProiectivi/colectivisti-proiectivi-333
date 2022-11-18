import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginCall } from './services'
import { LoginUserDTO } from '../../types/User'

export const authenticateUser = createAsyncThunk('authenticateUser', async (user: LoginUserDTO) => {
  const response = await loginCall(user)

  localStorage.setItem('jwtToken', response.data.value)
  localStorage.setItem('user', response.data.email)
})
