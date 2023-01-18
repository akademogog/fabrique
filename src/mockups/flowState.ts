import { Edge } from "reactflow";
import { Actor } from "../types/actor.types";

export const nodes = [
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
];
export const edges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];
export const actors: Actor[] = [
  {
    id: "actor@1.0.0",
    nodes: [
      {
        id: "10",
        type: "customNode",
        data: {
          label: "label 1",
          inputs: [
            { id: "1", type: "float", value: "" },
            { id: "2", type: "string", value: "" },
          ],
          outputs: [
            { id: "1", type: "float", value: "" },
            { id: "2", type: "string", value: "", color: "red" },
          ],
        },
        position: { x: 100, y: 50 },
        name: "Parser",
      },
      {
        id: "11",
        type: "customNode",
        data: {
          label: "label 2",
          inputs: [
            { id: "1", type: "float", value: "" },
            { id: "2", type: "string", value: "" },
          ],
          outputs: [
            { id: "1", type: "float", value: "" },
            { id: "2", type: "string", value: "", color: "red" },
          ],
        },
        position: { x: 500, y: 50 },
        name: "Parser",
      },
    ],
    edges: [{ id: "e10-11", source: "10", target: "11" }],
  },
];
