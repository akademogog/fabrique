import FlowActor from "@/components/Flows/FlowActor";
import { NodesEditor } from "@/components/NodesEditor";
import { objectToArray } from "@/helpers/mapping";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createActor } from "@/store/slicers/flowSlicer";
import { RootState } from "@/store/store";

const ActorPage = () => {
  const nodes = useAppSelector((state: RootState) => objectToArray(state.flow.piplines[state.flow.currentPage.piplineID].actors[state.flow.currentPage.actorID].nodes));
  const edges = useAppSelector((state: RootState) => objectToArray(state.flow.piplines[state.flow.currentPage.piplineID].actors[state.flow.currentPage.actorID].edges));
  const { areaId, nodeId } = useAppSelector(
    (state: RootState) => state.flow.currentSelectedNode
  );

  return (
    <div>
      <div className="flowAreaContainer">
        <FlowActor
          storeNodes={nodes}
          storeEdges={edges}
          areaId={areaId}
          nodeId={nodeId}
        />
        {/* <NodesEditor
          areaId={currentSelectedNode.areaId}
          nodeId={currentSelectedNode.nodeId}
        /> */}
      </div>
    </div>
  );
};

export default ActorPage;
