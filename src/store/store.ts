import { configureStore } from '@reduxjs/toolkit'
import pipelinesReducer from './slicers/pipelinesSlicer'
import actorsReducer from './slicers/actorsSlicer'
import routeReduser from './slicers/routeSlicer'
import selectedReduser from './slicers/selectedSlicer'

export const store = configureStore({
  reducer: {
    pipelines: pipelinesReducer,
    actors: actorsReducer,
    route: routeReduser,
    selected: selectedReduser,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch