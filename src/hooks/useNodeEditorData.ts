import { objectToArray } from "@/helpers/mapping";
import { useAppSelector } from "@/store/hooks";
import { NodeData } from "@/types/node.types";
import { useEffect, useMemo, useState } from "react"
import { Node } from "reactflow";


export const useNodeEditorData = (area: 'actor' | 'pipeline', areaID: any, nodeID: any) => {
    const actor = useAppSelector((state) => {
        const currentState = objectToArray(state[area === 'pipeline'? 'pipelines' : 'actors']);
        return currentState.find(el => el.id === areaID);
      });
      const selectedNode: Node<NodeData> = useMemo(() => {
        if (actor) {
          const nodes = objectToArray(actor.nodes);
          return nodes.find((node) => node.id === nodeID);
        }
      }, [actor]);
    
      const inputs: any = useMemo(() => {
        if (selectedNode) {
          const inputs = objectToArray(selectedNode.data.g_ports_in);
          return inputs;
        }
      }, [selectedNode]);
      const outputs: any = useMemo(() => {
        if (selectedNode) {
          const outputs = objectToArray(selectedNode.data.g_ports_out);
          return outputs;
        }
      }, [selectedNode]);

      return {actor, selectedNode, inputs, outputs}

}