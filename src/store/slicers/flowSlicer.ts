import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  id: "pipeline@1.0.0",
  nodes: [
    {
      id: 1,
      data: {
        name: "Actor",
        ports_in: [],
        ports_out: [],
        description: "",
        schema_: "",
        type_: "Actor",
      },
      position: { x: 100, y: 50 },
      name: "Actor",
    },
    {
      id: 2,
      data: {
        name: "Actor",
        ports_in: [],
        ports_out: [],
        description: "",
        schema_: "",
        type_: "Actor",
      },
      position: { x: 100, y: 50 },
      name: "Actor",
    },
  ],
  edges: [{ id: "e1-2", source: "1", target: "2" }],
  actors: [
    {
      id: "actor@1.0.0",
      nodes: [
        {
          id: "10",
          type: "textUpdater",
          data: {
            label: "label",
            inputs: [
              { id: "1", type: "float", value: "" },
              { id: "2", type: "float", value: "" },
            ],
            outputs: [
              { id: "1", type: "string", value: "" },
              { id: "2", type: "string", value: "" },
            ],
          },
          position: { x: 100, y: 50 },
          name: "Parser",
        },
        {
          id: "11",
          type: "textUpdater",
          data: {
            label: "label",
            inputs: [
              { id: "1", type: "float", value: "" },
              { id: "2", type: "float", value: "" },
            ],
            outputs: [
              { id: "1", type: "string", value: "" },
              { id: "2", type: "string", value: "" },
            ],
          },
          position: { x: 100, y: 50 },
          name: "Parser",
        },
      ],
      edges: [{ id: "e10-11", source: "10", target: "11" }],
    },
  ],
  currentSelectedNode: {
    areaId: "",
    nodeId: "",
  },
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    synchronizeStore: (state, action: PayloadAction<any>) => {
      const payload = action.payload;
      state.actors = state.actors.map((actor: any) => {
        if (actor.id === payload.actorId) {
          actor.nodes = payload.nodes;
          actor.edges = payload.edges;
        }
        return actor;
      });
    },
    changeNodeData: (state, action: PayloadAction<any>) => {
      const payload = action.payload;
      state.actors = state.actors.map((actor) => {
        if (actor.id === payload.areaId) {
          actor.nodes.map((node) => {
            if (node.id === payload.nodeId) {
              node.data[payload.type].map((input) => {
                if (input.id === payload.inputId) {
                  input.value = payload.value;
                }
                return input;
              });
            }
            return node;
          });
        }
        return actor;
      });
    },
    appendNodeInput: (state, action: PayloadAction<any>) => {
      const payload = action.payload;
      state.actors = state.actors.map((actor) => {
        if (actor.id === payload.areaId) {
          actor.nodes.map((node) => {
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
    changeSelectedNode: (state, action: PayloadAction<any>) => {
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
} = counterSlice.actions;

export default counterSlice.reducer;
