import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Actor } from "@/types/actor.types";
import { Edge, Node as FlowNode } from "reactflow";
import { arrayToObject } from "@/helpers/mapping";

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
        nodeId: string;
      }>
    ) => {
      const payload = action.payload;
      delete state[payload.actorID].nodes[payload.nodeId];
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
  },
});

export const {
  updateActorNode,
  appendActorNode,
  removeActorNode,
  appendActorEdge,
  removeActorEdge,
  createActor,
} = actorsSlice.actions;

export default actorsSlice.reducer;
