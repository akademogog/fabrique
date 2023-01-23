import { Edges } from "./global.types";
import { Node } from "./node.types";

export interface Actor {
    id: string;
    nodes: Node;
    edges: Edges;
}