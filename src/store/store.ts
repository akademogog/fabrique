import { configureStore } from "@reduxjs/toolkit";
import pipelinesReducer from "./slicers/pipelinesSlicer";
import actorsReducer from "./slicers/actorsSlicer";
import routeReduser from "./slicers/routeSlicer";
import selectedReduser from "./slicers/selectedSlicer";
import { combineReducers } from "redux";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootPersistConfig = {
  key: "root",
  storage: storage,
};
const rootReducer = combineReducers({
  pipelines: pipelinesReducer,
  actors: actorsReducer,
  route: routeReduser,
  selected: selectedReduser,
});

export const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
