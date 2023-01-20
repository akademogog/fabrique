import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Actor } from "@/types/actor.types";
import {
  NodeInputType,
  NodeControlInput,
  NodeControlOutput,
  Node,
} from "@/types/node.types";
import { Edge, Node as FlowNode } from "reactflow";
import { actors, edges, nodes } from "@/mockups/flowState";
import { arrayToObject } from "@/helpers/mapping";
import uuid from "react-uuid";
import { Edges } from "@/types/global.types";

interface IPipline {
  id: string;
  nodes: Node;
  edges: Edges;
  actors: Actor;
}
interface InitialState {
  piplines: { [id: string]: IPipline };
  currentSelectedNode: { area: string; areaId: string; nodeId: string };
  currentPage: { piplineID?: string | undefined; actorID?: string | undefined };
}

const initialState: InitialState = {
  piplines: {
    "1": {
      id: "1",
      nodes: nodes,
      edges: edges,
      actors: actors,
    },
    "2": {
      id: "2",
      nodes: nodes,
      edges: edges,
      actors: actors,
    },
  },
  currentSelectedNode: {
    area: "",
    areaId: "",
    nodeId: "",
  },
  currentPage: {
    piplineID: "",
    actorID: "",
  },
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updatePiplineNode: (
      state,
      action: PayloadAction<{
        nodes: Node[];
      }>
    ) => {
      const payload = action.payload;
      state.piplines[state.currentPage.piplineID].nodes = arrayToObject(payload.nodes);
    },
    appendPiplineNode: (
      state,
      action: PayloadAction<{
        position: { x: number; y: number };
        type: string;
        data: any;
      }>
    ) => {
      const payload = action.payload;
      const newNodeID = uuid();
      state.piplines[state.currentPage.piplineID].nodes[newNodeID] = {
        id: newNodeID,
        position: payload.position,
        type: payload.type,
        data: payload.data,
      };
    },
    removePiplineNode: (
      state,
      action: PayloadAction<{
        nodeId: string;
      }>
    ) => {
      const payload = action.payload;
      delete state.piplines[state.currentPage.piplineID].nodes[payload.nodeId];
    },
    appendPiplineEdge: (
      state,
      action: PayloadAction<{
        edge: Edge;
      }>
    ) => {
      const payload = action.payload;
      state.piplines[state.currentPage.piplineID].edges[payload.edge.id] = payload.edge;
    },
    removePiplineEdge: (
      state,
      action: PayloadAction<{
        edgeId: string;
      }>
    ) => {
      const payload = action.payload;
      delete state.piplines[state.currentPage.piplineID].edges[payload.edgeId];
    },

    updateActorNode: (
      state,
      action: PayloadAction<{
        nodes: Node[];
      }>
    ) => {
      const payload = action.payload;
      state.piplines[state.currentPage.piplineID].actors[
        state.currentPage.actorID
      ].nodes = arrayToObject(payload.nodes);
    },
    appendActorNode: (
      state,
      action: PayloadAction<{
        position: { x: number; y: number };
        type: string;
        data: any;
      }>
    ) => {
      const payload = action.payload;
      const newNodeID = uuid();
      state.piplines[state.currentPage.piplineID].actors[state.currentPage.actorID].nodes[newNodeID] = {
        id: newNodeID,
        position: payload.position,
        type: payload.type,
        data: payload.data,
      };
    },
    removeActorNode: (
      state,
      action: PayloadAction<{
        nodeId: string;
      }>
    ) => {
      const payload = action.payload;
      delete state.piplines[state.currentPage.piplineID].actors[
        state.currentPage.actorID
      ].nodes[payload.nodeId];
    },
    appendActorEdge: (
      state,
      action: PayloadAction<{
        edge: Edge;
      }>
    ) => {
      const payload = action.payload;
      console.log(payload.edge.id);
      state.piplines[state.currentPage.piplineID].actors[state.currentPage.actorID].edges[
        payload.edge.id
      ] = payload.edge;
    },
    removeActorEdge: (
      state,
      action: PayloadAction<{
        edgeId: string;
      }>
    ) => {
      const payload = action.payload;
      delete state.piplines[state.currentPage.piplineID].actors[state.currentPage.actorID].edges[
        payload.edgeId
      ];
    },

    changeCurrentPage: (
      state,
      action: PayloadAction<{
        params: {
          piplineID?: string | undefined;
          actorID?: string | undefined;
        };
      }>
    ) => {
      const payload = action.payload;
      state.currentPage = payload.params;
    },

    createActor: (
      state,
      action: PayloadAction<{
        actorID: string;
      }>
    ) => {
      const payload = action.payload;
      console.log(payload.actorID);
      state.piplines[state.currentPage.piplineID].actors[payload.actorID] = {
        id: payload.actorID,
        nodes: [],
        edges: [],
      };
    },

    changeNodeData: (
      state,
      action: PayloadAction<{
        areaId: string;
        nodeId: string;
        value: string;
        inputId: string;
        type: NodeInputType;
      }>
    ) => {
      const payload = action.payload;
      state.actors = state.actors.map((actor: Actor) => {
        if (actor.id === payload.areaId) {
          actor.nodes?.map((node) => {
            if (node.id === payload.nodeId) {
              node.data[payload.type].map(
                (input: NodeControlInput | NodeControlOutput) => {
                  if (input.id === payload.inputId) {
                    input.value = payload.value;
                  }
                  return input;
                }
              );
            }
            return node;
          });
        }
        return actor;
      });
    },
    appendNodeInput: (
      state,
      action: PayloadAction<{
        areaId: string;
        nodeId: string;
        type: NodeInputType;
        input: NodeControlInput | NodeControlOutput;
      }>
    ) => {
      const payload = action.payload;
      state.actors = state.actors.map((actor: Actor) => {
        if (actor.id === payload.areaId) {
          actor.nodes?.map((node) => {
            if (node.id === payload.nodeId) {
              node.data[payload.type] = [
                ...node.data[payload.type],
                payload.input,
              ];
            }
            return node;
          });
        }
        return actor;
      });
    },

    changeSelectedNode: (
      state,
      action: PayloadAction<{
        area: string;
        areaId: string;
        nodeId: string;
      }>
    ) => {
      state.currentSelectedNode = {
        area: "pipline",
        areaId: action.payload.areaId,
        nodeId: action.payload.nodeId,
      };
    },
  },
});

export const {
  changeNodeData,
  changeSelectedNode,
  appendNodeInput,
  updatePiplineNode,
  appendPiplineNode,
  removePiplineNode,
  appendPiplineEdge,
  removePiplineEdge,
  updateActorNode,
  appendActorNode,
  removeActorNode,
  appendActorEdge,
  removeActorEdge,
  changeCurrentPage,
  createActor,
} = counterSlice.actions;

export default counterSlice.reducer;
