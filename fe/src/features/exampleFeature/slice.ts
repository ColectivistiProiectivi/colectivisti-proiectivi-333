import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ExampleState {
  value: number
}

const initialState: ExampleState = {
  value: 0,
}

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    addToValue: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { addToValue } = exampleSlice.actions
