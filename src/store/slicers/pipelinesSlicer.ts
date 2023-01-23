import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Node } from "@/types/node.types";
import { Edge, Node as FlowNode } from "reactflow";
import { edges, nodes } from "@/mockups/flowState";
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
        nodeId: string;
      }>
    ) => {
      const payload = action.payload;
      if (payload.pipelineID) {
        delete state[payload.pipelineID].nodes[payload.nodeId];
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

    // changeNodeData: (
    //   state,
    //   action: PayloadAction<{
    //     areaId: string;
    //     nodeId: string;
    //     value: string;
    //     inputId: string;
    //     type: NodeInputType;
    //   }>
    // ) => {
    //   const payload = action.payload;
    //   state.actors = state.actors.map((actor: Actor) => {
    //     if (actor.id === payload.areaId) {
    //       actor.nodes?.map((node) => {
    //         if (node.id === payload.nodeId) {
    //           node.data[payload.type].map(
    //             (input: NodeControlInput | NodeControlOutput) => {
    //               if (input.id === payload.inputId) {
    //                 input.value = payload.value;
    //               }
    //               return input;
    //             }
    //           );
    //         }
    //         return node;
    //       });
    //     }
    //     return actor;
    //   });
    // },
    // appendNodeInput: (
    //   state,
    //   action: PayloadAction<{
    //     areaId: string;
    //     nodeId: string;
    //     type: NodeInputType;
    //     input: NodeControlInput | NodeControlOutput;
    //   }>
    // ) => {
    //   const payload = action.payload;
    //   state.actors = state.actors.map((actor: Actor) => {
    //     if (actor.id === payload.areaId) {
    //       actor.nodes?.map((node) => {
    //         if (node.id === payload.nodeId) {
    //           node.data[payload.type] = [
    //             ...node.data[payload.type],
    //             payload.input,
    //           ];
    //         }
    //         return node;
    //       });
    //     }
    //     return actor;
    //   });
    // },
  },
});

export const {
  // changeNodeData,
  // appendNodeInput,
  updatePipelineNode,
  appendPipelineNode,
  removePipelineNode,
  appendPipelineEdge,
  removePipelineEdge,
  createPipeline,
} = pipelinesSlice.actions;

export default pipelinesSlice.reducer;
