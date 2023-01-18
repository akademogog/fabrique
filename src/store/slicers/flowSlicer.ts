import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Actor } from "@/types/actor.types";
import {
  NodeInputType,
  Node,
  NodeControlInput,
  NodeControlOutput,
  NodeData,
} from "@/types/node.types";
import { Edge, Position } from "@/types/global.types";
import { actors, edges, nodes } from "@/mockups/flowState";

interface InitialState {
  id: string;
  nodes: any[];
  edges: Edge[];
  actors: Actor[];
  currentSelectedNode: { areaId: string; nodeId: string };
}

const initialState: InitialState = {
  id: "pipeline@1.0.0",
  nodes: nodes,
  edges: edges,
  actors: actors,
  currentSelectedNode: {
    areaId: "",
    nodeId: "",
  },
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    synchronizeStore: (
      state,
      action: PayloadAction<{
        actorId: string;
        nodes: Node[];
        edges: Edge[];
      }>
    ) => {
      const payload = action.payload;
      state.actors = state.actors.map((actor: Actor) => {
        if (actor.id === payload.actorId) {
          actor.nodes = payload.nodes;
          actor.edges = payload.edges;
        }
        return actor;
      });
    },
    appendNodeToStore: (state, action: PayloadAction<any>) => {
      const payload = action.payload;
      state.actors = state.actors.map((actor: Actor) => {
        if (actor.id === payload.actorId) {
          actor.nodes = [
            ...payload.nodes,
            {
              id: payload.id,
              position: payload.position,
              type: payload.type,
              data: payload.data,
            },
          ];
        }
        return actor;
      });
    },
    removeNodeFromStore: (
      state,
      action: PayloadAction<{
        actorId: string;
        nodeId: string;
      }>
    ) => {
      const payload = action.payload;
      state.actors = state.actors.map((actor: Actor) => {
        if (actor.id === payload.actorId && actor.nodes) {
          actor.nodes = actor.nodes.filter(
            (node) => node.id !== payload.nodeId
          );
        }
        return actor;
      });
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
        areaId: string;
        nodeId: string;
      }>
    ) => {
      state.currentSelectedNode = {
        areaId: action.payload.areaId,
        nodeId: action.payload.nodeId,
      };
    },
  },
});

export const {
  synchronizeStore,
  changeNodeData,
  changeSelectedNode,
  appendNodeInput,
  appendNodeToStore,
  removeNodeFromStore,
} = counterSlice.actions;

export default counterSlice.reducer;
