import { Edges } from "./global.types";
import { Node } from "./node.types";

export interface Actor {
    [id: string]: {
        id: string;
        nodes: Node | null;
        edges?: Edges;
    }
}