import { Position } from "./global.types";
import {Node as FlowNode} from "reactflow";

export type NodeType = string;
export type NodeInputType = 'inputs' | 'outputs';

interface NodeControl {
  id: string;
  type: "float" | "integer" | "string";
  value: string;
  color?: "red" | "green" | "yellow";
}

export interface NodeControlInput extends NodeControl {}
export interface NodeControlOutput extends NodeControl {}

export interface Node {
  [id: string]: FlowNode
}

export interface SelectedNode {
  areaID: string;
  nodeID: string;
}

export type portData = {
  code: string,
  id_: string,
  name: string,
  required: boolean,
  schema_: string,
  special: boolean,
  type_: string,
  visible: boolean,
}

export type portDatas = portData[]

export type NodeData = {
  name?: string;
  g_ports_in?: portDatas[];
  g_ports_out?: portDatas[];
  description?: string;
  schema_?: string;
  type_?: string;
  group_type_?: string;
  ui_config?: any;
  category?: 'StructOps' | 'IO' | 'Conditional' | 'Funcional' | 'Stateful' | 'Misc';
}