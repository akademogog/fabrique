import { Edges } from "@/types/global.types";
import { Node } from "@/types/node.types";

export const nodes: Node = {
  "1": {
    id: "1",
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
  "2": {
    id: "2",
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
    position: { x: 500, y: 50 },
    name: "Parser",
  },
  "3": {
    id: "3",
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
    position: { x: 900, y: 50 },
    name: "Parser",
  }
};
export const edges: Edges = { 
  "e1_1-2_1": { 
    id: "e1_1-2_1",
    source: "1",
    target: "2",
    sourceHandle: '1',
    targetHandle: '1'
  }
};
