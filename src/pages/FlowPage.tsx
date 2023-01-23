import FlowPipeline from "@/components/Flows/FlowPipeline";
import { NodesEditor } from "@/components/NodesEditor";
import { objectToArray } from "@/helpers/mapping";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

const FlowPage = () => {
  const nodes = useAppSelector((state: RootState) => {
    const { pipelineID, actorID } = state.route;
    if (actorID) {
      return objectToArray(state.actors[actorID].nodes);
    }
    if (pipelineID) {
      return objectToArray(state.pipelines[pipelineID].nodes)
    }
    return [];
  });
  const edges = useAppSelector((state: RootState) => {
    const { pipelineID, actorID } = state.route;
    if (actorID) {
      return objectToArray(state.actors[actorID].edges);
    }
    if (pipelineID) {
      return objectToArray(state.pipelines[pipelineID].edges)
    }
    return [];
  });

  return (
    <div>
      <div className="flowAreaContainer">
        <FlowPipeline
          storeNodes={nodes ? nodes : []}
          storeEdges={edges ? edges : []}
        />
        {/* <NodesEditor
          areaId={currentSelectedNode.areaId}
          nodeId={currentSelectedNode.nodeId}
        /> */}
      </div>
    </div>
  );
};

export default FlowPage;

