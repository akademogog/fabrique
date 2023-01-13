import { configureStore } from '@reduxjs/toolkit'
import flowReducer from './slicers/flowSlicer'

export const store = configureStore({
  reducer: {
    flow: flowReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch