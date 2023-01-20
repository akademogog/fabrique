import { Node } from "@/types/node.types";
import { Edge } from "reactflow";
import { Actor } from "../types/actor.types";

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
export const edges: Edge[] = [{ id: "e1_1-2_1", source: "1", target: "2", sourceHandle: '1', targetHandle: '1' }];
export const actors: Actor = {
  "1": {
    id: "1",
    nodes: {
      "10": {
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
      "11": {
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
    },
    edges: [{ id: "e10_2-11_1", source: "10", target: "11", sourceHandle: '1', targetHandle: '1' }],
  },
  "2": {
    id: "2",
    nodes: {
      "10": {
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
    },
  }
};
