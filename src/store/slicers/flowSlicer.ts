import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: any = [
  {
    blockId: '123',
    nodes: [
      { id: '1', position: { x: 100, y: 50 }, data: { label: '1' } },
      { id: '2', position: { x: 100, y: 150 }, data: { label: '2' } }
    ],
    edges: [{ id: 'e1-2', source: '1', target: '2' }],
  }
];

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    synchronizeStore: (state, action: PayloadAction<any>) => {
      state = state.map((e: any) => {
        if (e.blockId === action.payload.blockId) {
          e.nodes = action.payload.nodes;
          e.edges = action.payload.edges;
        }
        return e;
      })
    },
    changeNodeData: (state, action: PayloadAction<any>) => {      
      state = state.map((e: any) => {        
        if (e.blockId === action.payload.blockId) {          
          e.nodes = e.nodes.map((node: any) => {
            if (node.id === action.payload.id) {
              node.data = action.payload.data;
              console.log(node.data);
            }            
            return node;
          });
        }
        return e;
      })
    }
  },
})

export const { synchronizeStore, changeNodeData } = counterSlice.actions

export default counterSlice.reducer