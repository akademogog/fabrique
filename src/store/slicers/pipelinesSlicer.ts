import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Node, NodeControlInput, NodeControlOutput, NodeInputType } from "@/types/node.types";
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
    createPipeline: (
      state
    ) => {
      const id = uuid();
      state[id] = {
        id: id,
        nodes: {},
        edges: {},
      };
    },
    changePipelineNodeData: (
      state,
      action: PayloadAction<{
        pipelineID: string;
        nodeID: string;
        value: string;
        inputID: string;
        type: NodeInputType;
      }>
    ) => {
      const payload = action.payload;
      state[payload.pipelineID].nodes[payload.nodeID].data[payload.type][payload.inputID] = {
        ...state[payload.pipelineID].nodes[payload.nodeID].data[payload.type][payload.inputID],
        code: payload.value
      }
    },
    appendPipelineNodeInput: (
      state,
      action: PayloadAction<{
        piplineID: string;
        nodeID: string;
        type: NodeInputType;
        input: NodeControlInput | NodeControlOutput;
      }>
    ) => {
      const payload = action.payload;
      state[payload.piplineID].nodes[payload.nodeID].data[payload.type] = {
        ...state[payload.piplineID].nodes[payload.nodeID].data[payload.type],
        [payload.input.id]: payload.input
      };
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
  changePipelineNodeData,
  appendPipelineNodeInput,
} = pipelinesSlice.actions;

export default pipelinesSlice.reducer;
