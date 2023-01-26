import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Actor } from "@/types/actor.types";
import { Edge, Node as FlowNode } from "reactflow";
import { portData } from "@/types/node.types";
import { arrayToObject } from "@/helpers/mapping";
import { NodeInputType } from "@/types/node.types";

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
        id: string;
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
    setActorState: (
      state,
      action: PayloadAction<{
        actorID: string;
        actor: Actor;
      }>
    ) => {
      const payload = action.payload;
      state[payload.actorID].nodes = payload.actor.nodes;
      state[payload.actorID].edges = payload.actor.edges;
    },
    setProjectActors: (
      state,
      action: PayloadAction<{
        actors: InitialState;
      }>
    ) => {
      const payload = action.payload;
      const actors = payload.actors;
      for (const key in actors) {
        state[key] = actors[key];
      }
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
    changeActorNameValue: (
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
    changeActorDescriptionValue: (
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
    changeActorInputData: (
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
    removeActorInput: (
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
    appendActorNodeInput: (
      state,
      action: PayloadAction<{
        areaID: string;
        nodeID: string;
        type: NodeInputType;
        input: portData;
      }>
    ) => {
      const payload = action.payload;
      state[payload.areaID].nodes[payload.nodeID].data[payload.type][0].push(
        payload.input
      );
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
  setProjectActors,
  removeActor,
  setActorState,
  changeActorDescriptionValue,
  changeActorNameValue,
  changeActorInputData,
  appendActorNodeInput,
  removeActorInput,
} = actorsSlice.actions;

export default actorsSlice.reducer;
