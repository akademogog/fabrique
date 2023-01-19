export interface Position {
  x: number;
  y: number;
}
export interface Edge {
  id: string;
  source: string | null;
  target: string | null;
  sourceHandle?: string | null;
  targetHandle?: string | null;
}