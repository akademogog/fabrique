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
import "reactflow/dist/style.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  appendNodeToStore,
  changeSelectedNode,
  removeNodeFromStore,
  synchronizeStore,
} from "@/store/slicers/flowSlicer";
import CustomNode from "../CustomNode/CustomNode";
import { Link } from "react-router5";

type FlowProps = {
  projectId?: string;
  actorId?: string;
  area: string;
  storeNodes: Node[] | undefined | null;
  storeEdges: Edge[] | undefined | null;
};

const defaultCustomNode = [
  {
    label: "ArrayToArray",
    name: "Array To Array",
    inputs: [],
    outputs: [],
  },
  {
    label: "ArrayToElement",
    name: "Array To Element",
    inputs: [],
    outputs: [],
  },
  {
    label: "Constants",
    name: "Constants",
    inputs: [],
    outputs: [],
  },
  {
    label: "Destructurer",
    name: "Destructurer",
    inputs: [],
    outputs: [],
  },
  {
    label: "ElementToArray",
    name: "Element To Array",
    inputs: [],
    outputs: [],
  },
];

// const forbiddenСonnections = {
//   float: ["string", "array"],
//   string: ["float", "array"],
// };

const FlowArea: FC<FlowProps> = ({
  projectId,
  actorId,
  storeNodes,
  storeEdges,
  area,
}) => {
  const dispatch = useAppDispatch();
  const currentSelectedNode = useAppSelector(
    (state) => state.flow.currentSelectedNode
  );

  useEffect(() => {
    if (storeNodes) {
      setNodes(storeNodes);
    }
    if (storeEdges) {
      setEdges(storeEdges);
    }
  }, [storeNodes, storeEdges]);

  const [nodes, setNodes] = useState<Node[]>(storeNodes);
  const [edges, setEdges] = useState<Edge[]>(storeEdges);
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  const [isShowPaneMenu, setIsShowPaneMenu] = useState<boolean | undefined>();
  const [isShowNodeMenu, setIsShowNodeMenu] = useState<Node | undefined>();
  const [currentContextNode, setcurrentContextNode] = useState();

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
    menuType?: string,
    node?: Node,
  ) => {
    e.preventDefault();
    let x = e.pageX,
      y = e.pageY;
    if (menuType === "pane") {
      setIsShowNodeMenu(undefined);
      setIsShowPaneMenu(true);
    }
    if (menuType === "node") {
      setIsShowPaneMenu(undefined);
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
      // const targetNode = nodes.find((el) => el.id === connection.target);
      // const targetInput = targetNode.data.inputs.find(
      //   (el) => el.id === connection.targetHandle
      // );
      // const sourseNode = nodes.find((el) => el.id === connection.source);
      // const sourseOutput = sourseNode.data.outputs.find(
      //   (el) => el.id === connection.sourceHandle
      // );
      // if (
      //   !forbiddenСonnections[targetInput.type].find(
      //     (e) => e === sourseOutput.type
      //   )
      // ) {
        setEdges((eds) => addEdge(connection, eds));
      // }
    },
    [setEdges]
  );
  const appendNode = (e: React.MouseEvent, type: string | undefined, data: object) => {
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
    closeAllMenus();
  };
  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    dispatch(changeSelectedNode({ areaId: actorId ? actorId : '', nodeId: node.id }));
    closeAllMenus();
  };
  const removeNode = () => {
    if (
      currentSelectedNode.areaId === actorId &&
      currentSelectedNode.nodeId === (isShowNodeMenu && isShowNodeMenu.id)
    ) {
      dispatch(changeSelectedNode({ areaId: "", nodeId: "" }));
    }
    dispatch(removeNodeFromStore({ actorId: actorId ? actorId : '', nodeId: isShowNodeMenu ? isShowNodeMenu.id : ''}));
    setIsShowNodeMenu(undefined);
  };
  const closeAllMenus = () => {
    setIsShowNodeMenu(undefined);
    setIsShowPaneMenu(false);
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
          dispatch(synchronizeStore({ actorId: actorId ? actorId : '', nodes, edges }))
        }
        onEdgeClick={(_, edge) => {
          setEdges(edges.filter((e) => e.id !== edge.id));
          closeAllMenus();
        }}
        onPaneContextMenu={(e) => getMouseViewportPosition(e, "pane")}
        onNodeContextMenu={(e, node: Node) => {
          setcurrentContextNode(node.id);
          getMouseViewportPosition(e, "node", node);
        }}
        onMoveEnd={(_, viewport) => setViewportPosition(viewport)}
        onNodeClick={onNodeClick}
        onPaneClick={closeAllMenus}
      >
        <MiniMap />
        <Controls />
        {isShowPaneMenu && (
          <div
            className="menu"
            style={{
              left: mouseViewportPosition.x,
              top: mouseViewportPosition.y,
            }}
          >
            {defaultCustomNode.map((nodeDatas) => (
              <button
                onClick={(e) =>
                  appendNode(e, "customNode", {
                    label: nodeDatas.label,
                    inputs: nodeDatas.inputs,
                    outputs: nodeDatas.outputs,
                  })
                }
              >
                {nodeDatas.name}
              </button>
            ))}
          </div>
        )}
        {isShowNodeMenu && (
          <div
            className="menu"
            style={{
              left: mouseViewportPosition.x,
              top: mouseViewportPosition.y,
            }}
          >
            <button onClick={(e) => removeNode()}>Delete</button>
            <button
              onClick={(e) =>
                appendNode(e, isShowNodeMenu.type, isShowNodeMenu.data)
              }
            >
              Clone
            </button>
            {area === "projects" && (
              <Link
                onClick={closeAllMenus}
                routeName="projects.actor"
                routeParams={{
                  projectId: Number(projectId),
                  actorId: Number(currentContextNode),
                }}
              >
                Edit
              </Link>
            )}
          </div>
        )}
        <Background />
      </ReactFlow>
    </>
  );
};

export default FlowArea;
