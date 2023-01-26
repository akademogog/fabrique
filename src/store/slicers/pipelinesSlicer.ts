import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  Node,
  NodeControlInput,
  NodeControlOutput,
  NodeInputType,
  portData,
} from "@/types/node.types";
import { Edge, Node as FlowNode } from "reactflow";
import { arrayToObject } from "@/helpers/mapping";
import uuid from "react-uuid";
import { Edges } from "@/types/global.types";
interface InitialState {
  [id: string]: {
    id: string;
    nodes: Node;
    edges: Edges;
  };
}

const initialState: InitialState | undefined = {};

export const pipelinesSlice = createSlice({
  name: "pipelines",
  initialState,
  reducers: {
    updatePipelineNode: (
      state,
      action: PayloadAction<{
        pipelineID: string;
        nodes: FlowNode[];
      }>
    ) => {
      const payload = action.payload;
      if (payload.pipelineID) {
        state[payload.pipelineID].nodes = arrayToObject(payload.nodes);
      }
    },
    appendPipelineNode: (
      state,
      action: PayloadAction<{
        pipelineID: string;
        id: string;
        position: { x: number; y: number };
        type: string;
        data: any;
      }>
    ) => {
      const payload = action.payload;
      if (payload.pipelineID) {
        state[payload.pipelineID].nodes[payload.id] = {
          id: payload.id,
          position: payload.position,
          type: payload.type,
          data: payload.data,
        };
      }
    },
    removePipelineNode: (
      state,
      action: PayloadAction<{
        pipelineID: string;
        nodeID: string;
      }>
    ) => {
      const payload = action.payload;
      if (payload.pipelineID) {
        delete state[payload.pipelineID].nodes[payload.nodeID];
      }
    },
    appendPipelineEdge: (
      state,
      action: PayloadAction<{
        pipelineID: string;
        edge: Edge;
      }>
    ) => {
      const payload = action.payload;
      if (payload.pipelineID) {
        state[payload.pipelineID].edges[payload.edge.id] = payload.edge;
      }
    },
    removePipelineEdge: (
      state,
      action: PayloadAction<{
        pipelineID: string;
        edgeId: string;
      }>
    ) => {
      const payload = action.payload;
      if (payload.pipelineID) {
        delete state[payload.pipelineID].edges[payload.edgeId];
      }
    },
    createPipeline: (state) => {
      const id = uuid();
      state[id] = {
        id: id,
        nodes: {},
        edges: {},
      };
    },
    setPipelineState: (
      state,
      action: PayloadAction<{
        pipelineID: string;
        pipeline: {
          id: string;
          nodes: Node;
          edges: Edges;
        };
      }>
    ) => {
      const payload = action.payload;
      state[payload.pipelineID].nodes = payload.pipeline.nodes;
      state[payload.pipelineID].edges = payload.pipeline.edges;
    },
    removePipeline: (
      state,
      action: PayloadAction<{
        pipelineID: string;
      }>
    ) => {
      const payload = action.payload;
      delete state[payload.pipelineID];
    },
    removePipelineInput: (
      state,
      action: PayloadAction<{
        areaID: string;
        nodeID: string;
        value: string;
        index: number;
        type: NodeInputType;
      }>
    ) => {
      const payload = action.payload;
      state[payload.areaID].nodes[payload.nodeID].data[payload.type][0].splice(
        payload.index,
        1
      );
    },
    changePipelineInputData: (
      state,
      action: PayloadAction<{
        areaID: string;
        nodeID: string;
        value: string;
        index: number;
        type: NodeInputType;
        field: "name" | "type_";
      }>
    ) => {
      const payload = action.payload;
      state[payload.areaID].nodes[payload.nodeID].data[payload.type][0][
        payload.index
      ] = {
        ...state[payload.areaID].nodes[payload.nodeID].data[payload.type][0][
          payload.index
        ],
        [payload.field]: payload.value,
      };
    },
    changePipelineDescriptionValue: (
      state,
      action: PayloadAction<{
        areaID: string;
        nodeID: string;
        value: string;
      }>
    ) => {
      const payload = action.payload;
      state[payload.areaID].nodes[payload.nodeID].data = {
        ...state[payload.areaID].nodes[payload.nodeID].data,
        description: payload.value,
      };
    },
    changePipelineNameValue: (
      state,
      action: PayloadAction<{
        areaID: string;
        nodeID: string;
        value: string;
      }>
    ) => {
      const payload = action.payload;
      state[payload.areaID].nodes[payload.nodeID].data = {
        ...state[payload.areaID].nodes[payload.nodeID].data,
        name: payload.value,
      };
    },
    appendPipelineNodeInput: (
      state,
      action: PayloadAction<{
        areaID: string;
        nodeID: string;
        type: NodeInputType;
        input: portData;
      }>
    ) => {
      const payload = action.payload;
      console.log(
        state[payload.areaID].nodes[payload.nodeID].data[payload.type]
      );
      state[payload.areaID].nodes[payload.nodeID].data[payload.type][0].push(
        payload.input
      );
    },
  },
});

export const {
  updatePipelineNode,
  appendPipelineNode,
  removePipelineNode,
  appendPipelineEdge,
  removePipelineEdge,
  createPipeline,
  setPipelineState,
  removePipeline,
  changePipelineDescriptionValue,
  changePipelineInputData,
  changePipelineNameValue,
  appendPipelineNodeInput,
  removePipelineInput,
} = pipelinesSlice.actions;

export default pipelinesSlice.reducer;
