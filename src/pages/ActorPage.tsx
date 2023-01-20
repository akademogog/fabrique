import FlowActor from "@/components/Flows/FlowActor";
import { NodesEditor } from "@/components/NodesEditor";
import { objectToArray } from "@/helpers/mapping";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { FC } from "react";

interface ActorPageProps {
  piplineID: string;
  actorID: string;
}

const ActorPage: FC<ActorPageProps> = ({ piplineID, actorID }) => {
  const nodes = useAppSelector((state: RootState) => objectToArray(state.flow.piplines[piplineID].actors[actorID].nodes));
  const edges = useAppSelector((state: RootState) => objectToArray(state.flow.piplines[piplineID].actors[actorID].edges));
  const { areaId, nodeId } = useAppSelector(
    (state: RootState) => state.flow.currentSelectedNode
  );

  return (
    <div>
      <div className="flowAreaContainer">
        <FlowActor
          piplineID={piplineID}
          actorID={actorID}
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
