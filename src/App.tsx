import "./App.scss";
import { useAppSelector } from "./store/hooks";
import Flow from "./components/Flow/Flow";
import { RootState } from "./store/store";

function App() {
  const block = useAppSelector((state: RootState) => state.flow);

  return (
    <div className="App">
      <div className="flowContainer">
        {block.map((e: any) => (
          <Flow
            key={e.blockId}
            blockId={e.blockId}
            storeNodes={e.nodes}
            storeEdges={e.edges}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
