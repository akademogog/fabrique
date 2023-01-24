import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Actor } from "@/types/actor.types";
import { Edge, Node as FlowNode } from "reactflow";
import { arrayToObject } from "@/helpers/mapping";
import { NodeControlInput, NodeControlOutput, NodeInputType } from "@/types/node.types";

interface InitialState {
  [id: string]: Actor;
}

const initialState: InitialState | undefined = {};

export const actorsSlice = createSlice({
  name: "actors",
  initialState,
  reducers: {
    updateActorNode: (
      state,
      action: PayloadAction<{
        actorID: string;
        nodes: FlowNode[];
      }>
    ) => {
      const payload = action.payload;
      state[payload.actorID].nodes = arrayToObject(payload.nodes);
    },
    appendActorNode: (
      state,
      action: PayloadAction<{
        actorID: string;
        id: string,
        position: { x: number; y: number };
        type: string;
        data: any;
      }>
    ) => {
      const payload = action.payload;   
      state[payload.actorID].nodes[payload.id] = {
        id: payload.id,
        position: payload.position,
        type: payload.type,
        data: payload.data,
      };
    },
    removeActorNode: (
      state,
      action: PayloadAction<{
        actorID: string;
        nodeID: string;
      }>
    ) => {
      const payload = action.payload;
      delete state[payload.actorID].nodes[payload.nodeID];
    },
    appendActorEdge: (
      state,
      action: PayloadAction<{
        actorID: string;
        edge: Edge;
      }>
    ) => {
      const payload = action.payload;
      console.log(payload);
      state[payload.actorID].edges[payload.edge.id] = payload.edge;
    },
    removeActorEdge: (
      state,
      action: PayloadAction<{
        actorID: string;
        edgeId: string;
      }>
    ) => {
      const payload = action.payload;
      delete state[payload.actorID].edges[payload.edgeId];
    },
    createActor: (
      state,
      action: PayloadAction<{
        actorID: string;
      }>
    ) => {
      const payload = action.payload;
      state[payload.actorID] = {
        id: payload.actorID,
        nodes: {},
        edges: {},
      };
    },
    removeActor: (
      state,
      action: PayloadAction<{
        actorID: string;
      }>
    ) => {
      const payload = action.payload;
      delete state[payload.actorID];
    },
    changeActorNodeData: (
      state,
      action: PayloadAction<{
        actorID: string;
        nodeID: string;
        value: string;
        inputID: string;
        type: NodeInputType;
      }>
    ) => {
      const payload = action.payload;
      state[payload.actorID].nodes[payload.nodeID].data[payload.type][payload.inputID] = {
        ...state[payload.actorID].nodes[payload.nodeID].data[payload.type][payload.inputID],
        value: payload.value
      }
    },
    appendActorNodeInput: (
      state,
      action: PayloadAction<{
        actorID: string;
        nodeID: string;
        type: NodeInputType;
        input: NodeControlInput | NodeControlOutput;
      }>
    ) => {
      const payload = action.payload;
      state[payload.actorID].nodes[payload.nodeID].data[payload.type] = {
        ...state[payload.actorID].nodes[payload.nodeID].data[payload.type],
        [payload.input.id]: payload.input
      };
    },
  },
});

export const {
  updateActorNode,
  appendActorNode,
  removeActorNode,
  appendActorEdge,
  removeActorEdge,
  createActor,
  removeActor,
  changeActorNodeData,
  appendActorNodeInput,
} = actorsSlice.actions;

export default actorsSlice.reducer;
