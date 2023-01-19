import { Position } from "./global.types";

export type NodeType = "customNode";
export type NodeInputType = 'inputs' | 'outputs';

interface NodeControl {
  id: string;
  type: "float" | "integer" | "string";
  value: string;
  color?: "red" | "green" | "yellow";
}

export interface NodeControlInput extends NodeControl {}
export interface NodeControlOutput extends NodeControl {}
export interface NodeData {
  label: string;
  inputs: NodeControlInput[] | NodeControlOutput[];
  outputs: NodeControlOutput[];
}

export interface Node {
  id: string;
  type: NodeType;
  data: NodeData;
  position: Position;
  name: string;
}

export interface SelectedNode {
  areaId: string;
  nodeId: string;
}