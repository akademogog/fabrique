import FlowActor from "@/components/Flows/FlowActor";
import { NodesEditor } from "@/components/NodesEditor";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { FC } from "react";

interface ActorPageProps {
  piplineID: string;
  actorID: string;
}

const ActorPage: FC<ActorPageProps> = ({ piplineID, actorID }) => {
  const currentPipline = useAppSelector((state: RootState) =>
    state.flow.find((pipline) => pipline.id === piplineID)
  );
  const { area, areaId, nodeId } = currentPipline?.currentSelectedNode;
  const { nodes, edges } = currentPipline?.actors.find(
    (actor) => actor.id === actorID
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
