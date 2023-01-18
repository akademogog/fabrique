import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import FlowArea from "../Flow/FlowArea";
import { NodesConfig } from "../NodesConfig";
import { useRouteNode } from 'react-router5'

const Main = () => {
  const { nodes, edges, actors, currentSelectedNode } = useAppSelector((state: RootState) => state.flow);
  const { route } = useRouteNode('');  

  if (route && route.name === 'projects') {
    return (
      <div className="flowAreaContainer">
        <FlowArea
          area={"projects"}
          projectId={String(route.params.projectId)}
          storeNodes={nodes}
          storeEdges={edges}
        />
        <NodesConfig currentSelectedNode={currentSelectedNode} />
      </div>
    );
  }

  if (route && route.name === 'projects.actor') {
    const currentActor = actors.find(actor => actor.id == route.params.actorId);
    
    return (
      <div className="flowAreaContainer">
        <FlowArea
          area={"actor"}
          actorId={String(route.params.actorId)}
          storeNodes={currentActor && currentActor.nodes}
          storeEdges={currentActor && currentActor.edges}
        />
        <NodesConfig currentSelectedNode={currentSelectedNode} />
      </div>
    );
  }

  return (
    <div>list</div>
  )
}

export default Main
