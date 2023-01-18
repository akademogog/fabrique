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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  appendNodeToStore,
  changeSelectedNode,
  removeNodeFromStore,
  synchronizeStore,
} from "@/store/slicers/flowSlicer";
import CustomNode from "../CustomNode/CustomNode";

type FlowProps = {
  actorId: string | number;
  storeNodes: [];
  storeEdges: [];
};

const defaultCustomNode = {
  label: "defaultNode",
  inputs: [],
  outputs: [],
};

const forbiddenСonnections = {
  'float': ['string', 'array'],
  'string': ['float', 'array']
}

const FlowArea: FC<FlowProps> = ({ actorId, storeNodes, storeEdges }) => {
  const dispatch = useAppDispatch();
  const currentSelectedNode = useAppSelector((state) => state.flow.currentSelectedNode);

  useEffect(() => {
    setNodes(storeNodes);
    setEdges(storeEdges);
  }, [storeNodes, storeEdges]);

  const [nodes, setNodes] = useState<Node[]>(storeNodes);
  const [edges, setEdges] = useState<Edge[]>(storeEdges);
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  const [isShowPaneMenu, setIsShowPaneMenu] = useState(false);
  const [isShowNodeMenu, setIsShowNodeMenu] = useState(false);

  const [viewportPosition, setViewportPosition] = useState({
    x: 0,
    y: 0,
    zoom: 1,
  });
  const [mouseViewportPosition, setMouseViewportPosition] = useState({
    x: 0,
    y: 0,
  });
  const getMouseViewportPosition = (
    e: React.MouseEvent,
    menuType: string,
    node: Node
  ) => {
    e.preventDefault();
    let x = e.pageX,
      y = e.pageY;
    if (menuType === "pane") {
      setIsShowNodeMenu(false);
      setIsShowPaneMenu(true);
    }
    if (menuType === "node") {
      setIsShowPaneMenu(false);
      setIsShowNodeMenu(node);
    }
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
    (connection: Connection) => {
      const targetNode = nodes.find(el => el.id === connection.target);
      const targetInput = targetNode.data.inputs.find(el => el.id === connection.targetHandle);
      const sourseNode = nodes.find(el => el.id === connection.source);
      const sourseOutput = sourseNode.data.outputs.find(el => el.id === connection.sourceHandle);
      if (!forbiddenСonnections[targetInput.type].find(e => e === sourseOutput.type)) {
        setEdges((eds) => addEdge(connection, eds));
      }
    },
    [setEdges]
  );
  const appendNode = (e: React.MouseEvent, type: string, data: object) => {
    console.log(data)
    const { x, y } = getMouseViewportPosition(e);
    dispatch(
      appendNodeToStore({
        nodes,
        actorId,
        id: uuid(),
        position: { x, y },
        type,
        data,
      })
    );
    setIsShowNodeMenu(false);
    setIsShowPaneMenu(false);
  };
  const onNodeClick = (_: React.MouseEvent, node: object) => {
    dispatch(changeSelectedNode({ areaId: actorId, nodeId: node.id }));
  };
  const removeNode = () => {
    if (currentSelectedNode.areaId === actorId && currentSelectedNode.nodeId === isShowNodeMenu.id) {
      dispatch(changeSelectedNode({ areaId: '', nodeId: '' }));
    }
    dispatch(removeNodeFromStore({ actorId, nodeId: isShowNodeMenu.id }));
    setIsShowNodeMenu(false);
  };

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        connectionLineStyle={{ strokeWidth: 6, stroke: "steelblue" }}
        nodeOrigin={[0.5, 0]}
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
        onPaneContextMenu={(e) => getMouseViewportPosition(e, "pane")}
        onNodeContextMenu={(e, node) =>
          getMouseViewportPosition(e, "node", node)
        }
        onMoveEnd={(_, viewport) => setViewportPosition(viewport)}
        onNodeClick={onNodeClick}
      >
        <MiniMap />
        <Controls />
        {isShowPaneMenu && (
          <div
            className="select"
            style={{
              left: mouseViewportPosition.x,
              top: mouseViewportPosition.y,
            }}
          >
            <button
              onClick={(e) =>
                appendNode(e, "customNode", {
                  label: "ArrayToArray",
                  inputs: [],
                  outputs: [],
                })
              }
            >
              ArrayToArray
            </button>
            <button
              onClick={(e) =>
                appendNode(e, "customNode", {
                  label: "ArrayToElement",
                  inputs: [],
                  outputs: [],
                })
              }
            >
              ArrayToElement
            </button>
            <button
              onClick={(e) =>
                appendNode(e, "customNode", {
                  label: "Constants",
                  inputs: [],
                  outputs: [],
                })
              }
            >
              Constants
            </button>
            <button
              onClick={(e) =>
                appendNode(e, "customNode", {
                  label: "Destructurer",
                  inputs: [],
                  outputs: [],
                })
              }
            >
              Destructurer
            </button>
            <button
              onClick={(e) =>
                appendNode(e, "customNode", {
                  label: "ElementToArray",
                  inputs: [],
                  outputs: [],
                })
              }
            >
              ElementToArray
            </button>
          </div>
        )}

        {isShowNodeMenu && (
          <div
            className="select"
            style={{
              left: mouseViewportPosition.x,
              top: mouseViewportPosition.y,
            }}
          >
            <button onClick={(e) => removeNode()}>Delete</button>
            <button onClick={(e) => appendNode(e, isShowNodeMenu.type, isShowNodeMenu.data)}>Clone</button>
          </div>
        )}
        <Background />
      </ReactFlow>
    </>
  );
};

export default FlowArea;
