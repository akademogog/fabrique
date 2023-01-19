import FlowPipline from "@/components/Flows/FlowPipline";
import { NodesEditor } from "@/components/NodesEditor";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { FC } from "react";

interface PiplinePageProps {
  piplineID: string;
}

const PiplinePage: FC<PiplinePageProps> = ({ piplineID }) => {
  const { nodes, edges, currentSelectedNode } = useAppSelector(
    (state: RootState) => state.flow.find((pipline) => pipline.id === piplineID)
  );

  return (
    <div>
      <div className="flowAreaContainer">
        <FlowPipline
          piplineID={piplineID}
          storeNodes={nodes}
          storeEdges={edges}
          areaId={currentSelectedNode.areaId}
          nodeId={currentSelectedNode.nodeId}
        />
        {/* <NodesEditor
          areaId={currentSelectedNode.areaId}
          nodeId={currentSelectedNode.nodeId}
        /> */}
      </div>
    </div>
  );
};

export default PiplinePage;
