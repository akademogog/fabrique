import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  area: string,
  areaID: string,
  nodeID: string,
}

const initialState: InitialState = {
  area: "",
  areaID: "",
  nodeID: "",
};

export const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    changeSelectedNode: (
      state,
      action: PayloadAction<{
        area: string
        areaID: string;
        nodeID: string;
      }>
    ) => {
      state.area = action.payload.area;
      state.areaID = action.payload.areaID;
      state.nodeID = action.payload.nodeID;
    },
  },
});

export const { changeSelectedNode } = selectedSlice.actions;

export default selectedSlice.reducer;
