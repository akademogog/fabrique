export interface Position {
  x: number;
  y: number;
}
export interface Edges {
  [id: string]: {
    id: string;
    source: string | null;
    target: string | null;
    sourceHandle?: string | null;
    targetHandle?: string | null;
  }
}