import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { exampleSlice } from '../features/exampleFeature'

export const reducer = combineReducers({
  exampleState: exampleSlice.reducer,
})

export const store = configureStore({
  reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
