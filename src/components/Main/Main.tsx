import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import FlowArea from "../Flow/FlowArea";
import NodeDatas from "../NodeDatas/NodeDatas";
import { useRouteNode } from 'react-router5'

const Main = () => {
  const actors = useAppSelector((state: RootState) => state.flow.actors);
  const currentSelectedNode = useAppSelector((state: RootState) => state.flow.currentSelectedNode);

  const { route } = useRouteNode('');
  let topRouteName;
  if (route) {
    topRouteName = route.name.split('.')[0];
  }  

  if (topRouteName === 'project') {
    return (
      <div className="App">
        {actors.map((actor: any) => (
          <div className="flowAreaContainer" key={actor.id}>
            <FlowArea
              actorId={actor.id}
              storeNodes={actor.nodes}
              storeEdges={actor.edges}
            />
            <NodeDatas currentSelectedNode={currentSelectedNode} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>list</div>
  )
}

export default Main
