import { configureStore, combineReducers } from '@reduxjs/toolkit'

import appReducer from '../features/application/slice'
import userReducer from '../features/account/slice'
import assignmentsReducer from '../features/assignments/slice'

export const reducer = combineReducers({
  appState: appReducer,
  userState: userReducer,
  assignmentsState: assignmentsReducer,
})

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
