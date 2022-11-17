import { createAsyncThunk } from '@reduxjs/toolkit'
import { addUserCall } from './services'
import { RegisterUserDTO } from '../../types/User'

export const addUser = createAsyncThunk('addUser', async (user: RegisterUserDTO) => addUserCall(user))
