import { Edge } from "reactflow";
import { Node } from "./node.types";

export interface Actor {
    [id: string]: {
        id: string;
        nodes: Node | null;
        edges?: Edge[];
    }
}