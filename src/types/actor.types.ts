import { Edge } from "./global.types";
import { Node } from "./node.types";

export interface Actor {
    id: string;
    nodes: Node[] | null;
    edges: Edge[]
}