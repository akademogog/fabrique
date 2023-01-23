export interface Position {
  x: number;
  y: number;
}
import { Edge as FlowEdge } from "reactflow";
export interface Edges {
  [id: string]: FlowEdge
}