import { configureStore, combineReducers } from '@reduxjs/toolkit'

import appReducer from '../features/application/slice'

export const reducer = combineReducers({
  appState: appReducer,
})

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
