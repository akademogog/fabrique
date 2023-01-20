import FlowPipline from "@/components/Flows/FlowPipline";
import { NodesEditor } from "@/components/NodesEditor";
import { objectToArray } from "@/helpers/mapping";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { FC } from "react";

interface PiplinePageProps {
  piplineID: string;
}

const PiplinePage: FC<PiplinePageProps> = ({ piplineID }) => {
  const nodes = useAppSelector((state: RootState) => objectToArray(state.flow.piplines[piplineID].nodes));
  const edges = useAppSelector((state: RootState) => state.flow.piplines[piplineID].edges);
  const { currentSelectedNode } = useAppSelector(
    (state: RootState) => state.flow
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

