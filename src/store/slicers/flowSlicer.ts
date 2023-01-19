import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Actor } from "@/types/actor.types";
import {
  NodeInputType,
  NodeControlInput,
  NodeControlOutput,
} from "@/types/node.types";
import { Edge, Node } from "reactflow";
import { actors, edges, nodes } from "@/mockups/flowState";

interface InitialState {
  id: string;
  nodes: Node[];
  edges: Edge[];
  actors: Actor[];
  currentSelectedNode: { area: string; areaId: string; nodeId: string };
}

const initialState: InitialState[] = [
  {
    id: "1",
    nodes: nodes,
    edges: edges,
    actors: actors,
    currentSelectedNode: {
      area: "",
      areaId: "",
      nodeId: "",
    },
  },
];

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updatePiplineNode: (
      state,
      action: PayloadAction<{
        piplineID: string;
        nodes: Node[];
      }>
    ) => {
      const payload = action.payload;
      state = state.map((pipline) => {
        if (pipline.id === payload.piplineID) {
          pipline.nodes = payload.nodes;
        }
        return pipline;
      });
    },
    appendPiplineNode: (
      state,
      action: PayloadAction<{
        piplineID: string;
        nodes: Node[];
        id: string;
        position: { x: number; y: number };
        type: string;
        data: object;
      }>
    ) => {
      const payload = action.payload;
      state = state.map((pipline) => {
        if (pipline.id === payload.piplineID) {
          pipline.nodes = [
            ...payload.nodes,
            {
              id: payload.id,
              position: payload.position,
              type: payload.type,
              data: payload.data,
            },
          ];
        }
        return pipline;
      });
    },
    removePiplineNode: (
      state,
      action: PayloadAction<{
        piplineID: string;
        nodeId: string;
      }>
    ) => {
      const payload = action.payload;
      state = state.map((pipline) => {
        if (pipline.id === payload.piplineID) {
          pipline.nodes = pipline.nodes.filter(
            (node) => node.id !== payload.nodeId
          );
        }
        return pipline;
      });
    },
    appendPiplineEdge: (
      state,
      action: PayloadAction<{
        piplineID: string | undefined;
        edge: Edge;
      }>
    ) => {
      const payload = action.payload;
      state = state.map((pipline) => {
        if (pipline.id === payload.piplineID) {
          if (!pipline.edges) {
            pipline.edges = [];
          }
          pipline.edges.push(payload.edge);
        }
        return pipline;
      });
    },
    removePiplineEdge: (
      state,
      action: PayloadAction<{
        piplineID: string;
        edgeId: string;
      }>
    ) => {
      const payload = action.payload;
      state = state.map((pipline) => {
        if (pipline.id === payload.piplineID) {
          pipline.edges = pipline.edges?.filter(
            (edge) => edge.id !== payload.edgeId
          );
        }
        return pipline;
      });
    },

    updateActorNode: (
      state,
      action: PayloadAction<{
        piplineID: string;
        actorID: string;
        nodes: Node[];
      }>
    ) => {
      const payload = action.payload;
      state = state.map(pipline => {
        if (pipline.id === payload.piplineID) {
          pipline.actors = pipline.actors.map(actor => {
            if (actor.id === payload.actorID) {
              actor.nodes = actor.nodes;
            }
            return actor;
          });
        }
        return pipline;
      });
    },
    appendActorNode: (
      state,
      action: PayloadAction<{
        piplineID: string;
        actorID: string;
        nodes: Node[];
        id: string;
        position: { x: number; y: number };
        type: string;
        data: object;
      }>
    ) => {
      const payload = action.payload;
      state = state.map((pipline) => {
        if (pipline.id === payload.piplineID) {
          pipline.actors = pipline.actors.map(actor => {
            if (actor.id === payload.actorID) {
              actor.nodes = [
                ...payload.nodes,
                {
                  id: payload.id,
                  position: payload.position,
                  type: payload.type,
                  data: payload.data,
                },
              ];;
            }
            return actor;
          });
          
        }
        return pipline;
      });
    },
    removeActorNode: (
      state,
      action: PayloadAction<{
        piplineID: string;
        actorID: string;
        nodeId: string;
      }>
    ) => {
      const payload = action.payload;
      state = state.map((pipline) => {
        if (pipline.id === payload.piplineID) {
          pipline.actors = pipline.actors.map(actor => {
            if (actor.id === payload.actorID) {
              actor.nodes = actor.nodes.filter(
                (node) => node.id !== payload.nodeId
              );
            }
            return actor;
          });
        }
        return pipline;
      });
    },
    appendActorEdge: (
      state,
      action: PayloadAction<{
        piplineID: string;
        actorID: string;
        edge: Edge;
      }>
    ) => {
      const payload = action.payload;
      state = state.map((pipline) => {
        if (pipline.id === payload.piplineID) {
          pipline.actors = pipline.actors.map(actor => {
            if (actor.id === payload.actorID) {
              if (!actor.edges) {
                actor.edges = [];
              }
              actor.edges.push(payload.edge);
            }
            return actor;
          });
        }
        return pipline;
      });
    },
    removeActorEdge: (
      state,
      action: PayloadAction<{
        piplineID: string;
        actorID: string;
        edgeId: string;
      }>
    ) => {
      const payload = action.payload;
      state = state.map((pipline) => {
        if (pipline.id === payload.piplineID) {
          pipline.actors = pipline.actors.map(actor => {
            if (actor.id === payload.actorID) {
              actor.edges = actor.edges?.filter(
                (edge) => edge.id !== payload.edgeId
              );
            }
            return actor;
          });
        }
        return pipline;
      });
    },

    createNewActorNodes: (
      state,
      action: PayloadAction<{
        actorID: string;
      }>
    ) => {
      const payload = action.payload;
      state.actors.push({ id: payload.actorID, nodes: [] });
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
  createNewActorNodes,
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
} = counterSlice.actions;

export default counterSlice.reducer;
