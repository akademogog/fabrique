import Main from "../Main/Main";
import "./App.scss";
<<<<<<< HEAD
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import FlowArea from "../Flow/FlowArea";
import { NodesConfig } from "../NodesConfig";

function App() {
  const actors = useAppSelector((state: RootState) => state.flow.actors);
  const {areaId, nodeId} = useAppSelector((state: RootState) => state.flow.currentSelectedNode);
=======
>>>>>>> 7bf16ade3e1039678b77520db7a34efae6d76c05

const App = () => {
  return (
<<<<<<< HEAD
    <div className="App">
      {actors.map((actor: any) => (
        <div className="flowAreaContainer" key={actor.id}>
          <FlowArea
            actorId={actor.id}
            storeNodes={actor.nodes}
            storeEdges={actor.edges}
          />
          <NodesConfig areaId={areaId} nodeId={nodeId}  />
        </div>
      ))}
=======
    <div>
      <header></header>
      <main>
        <Main />
      </main>
>>>>>>> 7bf16ade3e1039678b77520db7a34efae6d76c05
    </div>
  )
}

export default App;
