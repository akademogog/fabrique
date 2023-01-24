import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  name: string;
  pipelineID: string;
  actorID: string;
}

const initialState: InitialState = {
  name: "",
  pipelineID: "",
  actorID: "",
};

export const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    changeCurrentPage: (
      state,
      action: PayloadAction<{
        name: string;
        pipelineID: string;
        actorID: string;
      }>
    ) => {
      const payload = action.payload;
      state.name = payload.name;
      state.pipelineID = payload.pipelineID;
      state.actorID = payload.actorID;
    },
  },
});

export const { changeCurrentPage } = routeSlice.actions;

export default routeSlice.reducer;
