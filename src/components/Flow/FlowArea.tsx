import { useCallback, useState, FC, useMemo, useEffect } from "react";
import uuid from "react-uuid";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  Node,
  NodeChange,
  Connection,
  Edge,
  EdgeChange,
  applyEdgeChanges,
  addEdge,
} from "reactflow";
// 👇 you need to import the reactflow styles
import "reactflow/dist/style.css";
import { useAppDispatch } from "../../store/hooks";
import { changeSelectedNode, synchronizeStore } from "../../store/slicers/flowSlicer";
import ConstantsNode from "../ConstantsNode/ConstantsNode";

type FlowProps = {
  actorId: string | number;
  storeNodes: [];
  storeEdges: [];
};

const FlowArea: FC<FlowProps> = ({ actorId, storeNodes, storeEdges }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setNodes(storeNodes);
    setEdges(storeEdges);
  }, [storeNodes, storeEdges]);

  const [nodes, setNodes] = useState<Node[]>(storeNodes);
  const [edges, setEdges] = useState<Edge[]>(storeEdges);
  const nodeTypes = useMemo(() => ({ textUpdater: ConstantsNode }), []);

  const [isShowMenu, setIsShowMenu] = useState(false);

  const [viewportPosition, setViewportPosition] = useState({
    x: 0,
    y: 0,
    zoom: 1,
  });
  const [mouseViewportPosition, setMouseViewportPosition] = useState({
    x: 0,
    y: 0,
  });
  const getMouseViewportPosition = (e: React.MouseEvent) => {
    e.preventDefault();
    let x = e.pageX,
      y = e.pageY;
    setIsShowMenu(true);
    setMouseViewportPosition({ x, y });
    if (viewportPosition) {
      x = (x - viewportPosition.x) / viewportPosition.zoom;
      y = (y - viewportPosition.y) / viewportPosition.zoom;
    }
    return { x, y };
  };

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  const appendNode = (e: React.MouseEvent, type: string, data: object) => {
    const { x, y } = getMouseViewportPosition(e);
    setNodes([
      ...nodes,
      {
        id: uuid(),
        position: { x, y },
        type,
        data,
      },
    ]);
    setIsShowMenu(!isShowMenu);
  };
  const onNodeClick = (_: React.MouseEvent, node: object) => {
    dispatch(changeSelectedNode({areaId: actorId, nodeId: node.id}))
  };

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        nodeOrigin={[0.5, 0.5]}
        fitView
        onInit={(reactFlowInstance) =>
          setViewportPosition(reactFlowInstance.getViewport())
        }
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={() =>
          dispatch(synchronizeStore({ actorId, nodes, edges }))
        }
        onEdgeClick={(_, edge) =>
          setEdges(edges.filter((e) => e.id !== edge.id))
        }
        onPaneContextMenu={(e) => getMouseViewportPosition(e)}
        onMoveEnd={(_, viewport) => setViewportPosition(viewport)}
        onNodeClick={onNodeClick}
      >
        <MiniMap />
        <Controls />
        {isShowMenu && (
          <div
            className="select"
            style={{
              left: mouseViewportPosition.x,
              top: mouseViewportPosition.y,
            }}
          >
            <button
              onClick={(e) => appendNode(e, "input", { label: "inputLabel" })}
            >
              Input
            </button>
            <button
              onClick={(e) =>
                appendNode(e, "textUpdater", {
                  label: "label",
                  inputs: [
                    { id: uuid(), type: "float", value: "" },
                    { id: uuid(), type: "float", value: "" },
                  ],
                  outputs: [
                    { id: uuid(), type: "string", value: "" },
                    { id: uuid(), type: "string", value: "" },
                  ],
                })
              }
            >
              Output
            </button>
            <button
              onClick={(e) =>
                appendNode(e, "default", { label: "defaultLabel" })
              }
            >
              Default
            </button>
          </div>
        )}
        <Background />
      </ReactFlow>
    </>
  );
};

export default FlowArea;
