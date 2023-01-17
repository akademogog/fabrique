import "./App.scss";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import FlowArea from "../Flow/FlowArea";
import NodeDatas from "../NodeDatas/NodeDatas";

function App() {
  const actors = useAppSelector((state: RootState) => state.flow.actors);
  const currentSelectedNode = useAppSelector((state: RootState) => state.flow.currentSelectedNode);

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

export default App;
