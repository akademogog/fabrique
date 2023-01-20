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
} from "reactflow";
import "reactflow/dist/style.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  changeSelectedNode,
  updatePiplineNode,
  appendPiplineNode,
  removePiplineNode,
  appendPiplineEdge,
  removePiplineEdge,
} from "@/store/slicers/flowSlicer";
import CustomNode from "../CustomNode/CustomNode";
import { Link } from "react-router5";
import { RootState } from "@/store/store";

interface FlowPiplineProps {
  storeNodes: Node[] | undefined | null;
  storeEdges: Edge[] | undefined | null;
  areaId: string | undefined;
  nodeId: string | undefined;
}

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

const FlowPipline: FC<FlowPiplineProps> = ({
  storeNodes,
  storeEdges,
  areaId,
  nodeId,
}) => {
  const dispatch = useAppDispatch();
  const { piplineID } = useAppSelector(
    (state: RootState) => state.flow.currentPage
  );
  const [nodes, setNodes] = useState<Node[]>(storeNodes);
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
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
  useEffect(() => {
    if (storeNodes) {
      setNodes(storeNodes);
    }
  }, [storeNodes]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );
  const onConnect = (connection: Connection) => {
    const edge = {
      id: `e${connection.source}_${connection.sourceHandle}-${connection.target}_${connection.targetHandle}`,
      ...connection,
    };

    if (!storeEdges?.find((storeEdge) => storeEdge.id === edge.id)) {
      dispatch(
        appendPiplineEdge({
          piplineID,
          edge: edge,
        })
      );
    }
  };
  const getMouseViewportPosition = (
    e: React.MouseEvent,
    menuType?: string,
    node?: Node
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
  const appendNode = (e: React.MouseEvent, type: string, data: object) => {
    const { x, y } = getMouseViewportPosition(e);
    dispatch(
      appendPiplineNode({
        position: { x, y },
        type,
        data,
      })
    );
    closeAllMenus();
  };
  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    dispatch(
      changeSelectedNode({
        area: "pipline",
        areaId: piplineID,
        nodeId: node.id,
      })
    );
    closeAllMenus();
  };
  const removeNode = () => {
    if (
      areaId === piplineID &&
      nodeId === (isShowNodeMenu && isShowNodeMenu.id)
    ) {
      dispatch(changeSelectedNode({ area: "pipline", areaId: "", nodeId: "" }));
    }
    dispatch(
      removePiplineNode({
        piplineID,
        nodeId: isShowNodeMenu ? isShowNodeMenu.id : "",
      })
    );
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
        edges={storeEdges}
        nodeTypes={nodeTypes}
        connectionLineStyle={{ strokeWidth: 6, stroke: "steelblue" }}
        nodeOrigin={[0.5, 0]}
        fitView
        onInit={(reactFlowInstance) =>
          setViewportPosition(reactFlowInstance.getViewport())
        }
        onNodesChange={onNodesChange}
        // onNodeDrag={onDrag}
        onConnect={onConnect}
        onNodeDragStop={() =>
          dispatch(
            updatePiplineNode({
              piplineID,
              nodes,
            })
          )
        }
        onEdgeClick={(_, edge) => {
          dispatch(removePiplineEdge({ piplineID, edgeId: edge.id }));
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
                key={uuid()}
                className="menuButton"
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
            <button className="menuButton" onClick={(e) => removeNode()}>
              Delete
            </button>
            <button
              className="menuButton"
              onClick={(e) =>
                appendNode(e, isShowNodeMenu.type, isShowNodeMenu.data)
              }
            >
              Clone
            </button>
            <Link
              className="menuButton"
              onClick={closeAllMenus}
              routeName="actor"
              routeParams={{
                piplineID: piplineID,
                actorID: currentContextNode,
              }}
            >
              Edit
            </Link>
          </div>
        )}
        <Background />
      </ReactFlow>
    </>
  );
};

export default FlowPipline;
