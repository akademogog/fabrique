import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  area: string,
  areaId: string,
  nodeId: string,
}

const initialState: InitialState = {
  area: "",
  areaId: "",
  nodeId: "",
};

export const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    changeSelectedNode: (
      state,
      action: PayloadAction<{
        area: string
        areaId: string;
        nodeId: string;
      }>
    ) => {
      state = {
        area: action.payload.area,
        areaId: action.payload.areaId,
        nodeId: action.payload.nodeId,
      };
    },
  },
});

export const { changeSelectedNode } = selectedSlice.actions;

export default selectedSlice.reducer;
