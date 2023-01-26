import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TuiParams = {
  loading: boolean;
  params: any;
  error: string | undefined;
};

type TinitialState = {
  uiPipelineParams: TuiParams;
  uiNodeParams: TuiParams;
};

const initialState: TinitialState = {
  uiPipelineParams: {
    loading: false,
    params: {},
    error: "",
  },
  uiNodeParams: {
    loading: false,
    params: {},
    error: "",
  },
};

export const fetchUIParamsPipeline = createAsyncThunk(
  "uiParams/fetchUIParamsPipeline",
  () => {
    return axios
      .get("https://node-designer-openapi.onrender.com/pipelines")
      .then((response) => response.data);
  }
);

export const fetchUIParamsNode = createAsyncThunk(
  "uiParams/fetchUIParamsNode",
  () => {
    return axios
      .get("https://node-designer-openapi.onrender.com/nodes")
      .then((response) => response.data);
  }
);

const uiParamsSlice = createSlice({
  name: "uiParams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUIParamsPipeline.pending, (state) => {
      state.uiPipelineParams.loading = true;
    }),
      builder.addCase(fetchUIParamsPipeline.fulfilled, (state, action) => {
        state.uiPipelineParams.loading = false;
        state.uiPipelineParams.params = {
          configUIParams: action.payload.payload.configUIParams,
          initNodesData: action.payload.payload.initNodesData,
        };
        state.uiPipelineParams.error = "";
      }),
      builder.addCase(fetchUIParamsPipeline.rejected, (state, action) => {
        setTimeout(() => {
          state.uiPipelineParams.loading = false;
          state.uiPipelineParams.params = {};
          state.uiPipelineParams.error = action.error.message;
        }, 10000);
      }),
      builder.addCase(fetchUIParamsNode.pending, (state) => {
        state.uiNodeParams.loading = true;
      }),
      builder.addCase(fetchUIParamsNode.fulfilled, (state, action) => {
        state.uiNodeParams.loading = false;
        state.uiNodeParams.params = {
          configUIParams: action.payload.payload.configUIParams,
          initNodesData: action.payload.payload.initNodesData,
        };
        state.uiNodeParams.error = "";
      }),
      builder.addCase(fetchUIParamsNode.rejected, (state, action) => {
        state.uiNodeParams.loading = false;
        state.uiNodeParams.params = {};
        state.uiNodeParams.error = action.error.message;
      });
  },
});

export default uiParamsSlice.reducer;
