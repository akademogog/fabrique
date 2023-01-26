import { useCallback, useState, FC, useMemo, useEffect } from "react";
import uuid from "react-uuid";
import ReactFlow, {
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
  updatePipelineNode,
  appendPipelineNode,
  removePipelineNode,
  appendPipelineEdge,
  removePipelineEdge,
  deselectPipelineNodes,
  selectPipelineNode,
} from "@/store/slicers/pipelinesSlicer";
import CustomNode from "../CustomNode/CustomNode";
import { Link } from "react-router5";
import { RootState } from "@/store/store";
import { changeSelectedNode } from "@/store/slicers/selectedSlicer";
import {
  appendActorEdge,
  appendActorNode,
  createActor,
  deselectActorNodes,
  removeActor,
  removeActorEdge,
  removeActorNode,
  selectActorNode,
  updateActorNode,
} from "@/store/slicers/actorsSlicer";
import { connectedRules, getObjectKeys } from "@/helpers/mapping";

interface FlowProps {
  storeNodes: Node[];
  storeEdges: Edge[];
}

const Flow: FC<FlowProps> = ({ storeNodes, storeEdges }) => {
  const dispatch = useAppDispatch();
  const { pipelineParams, nodeParams, pipelineData, nodeData } =
    useAppSelector((state: RootState) => ({
      pipelineParams: state.uiParams.uiPipelineParams.params.configUIParams,
      nodeParams: state.uiParams.uiNodeParams.params.configUIParams,
      pipelineData: state.uiParams.uiPipelineParams.params.initNodesData,
      nodeData: state.uiParams.uiNodeParams.params.initNodesData
    }));
  const { pipelineID, actorID } = useAppSelector(
    (state: RootState) => state.route
  );
  const { area, areaID, nodeID } = useAppSelector(
    (state: RootState) => state.selected
  );
  const [nodes, setNodes] = useState<Node[]>(storeNodes);
  const [isShowPaneMenu, setIsShowPaneMenu] = useState<boolean | undefined>();
  const [isShowNodeMenu, setIsShowNodeMenu] = useState<Node | undefined>();
  const [currentContextNode, setcurrentContextNode] = useState<
    string | undefined
  >();
  const [position, setPosition] = useState({
    viewportPosition: {
      x: 0,
      y: 0,
      zoom: 1,
    },
    mouseViewportPosition: {
      x: 0,
      y: 0,
    },
  });
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  useEffect(() => {
    if (storeNodes) {
      setNodes(storeNodes);
    }
  }, [storeNodes]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      if (changes.find((e) => e.type === "position")) {
        setNodes((nds) => applyNodeChanges(changes, nds));
      }
    },
    [setNodes]
  );
  const onConnect = (connection: Connection) => {
    const sourceNode = nodes.find((e) => e.id === connection.source);
    const targetNode = nodes.find((e) => e.id === connection.target);
    const { sourceHandle, targetHandle } = connection;

    if (sourceNode && targetNode && sourceHandle && targetHandle) {
      const isValidConnection = connectedRules(
        sourceNode,
        targetNode,
        sourceHandle,
        targetHandle
      );

      if (!isValidConnection) {
        return;
      }
    }

    const edge = {
      ...connection,
      id: `e${connection.source}_${connection.sourceHandle}-${connection.target}_${connection.targetHandle}`,
      source: connection.source ? connection.source : "",
      target: connection.target ? connection.target : "",
    };

    if (!storeEdges?.find((storeEdge) => storeEdge.id === edge.id)) {
      if (actorID) {
        dispatch(
          appendActorEdge({
            actorID,
            edge: edge,
          })
        );
      } else {
        dispatch(
          appendPipelineEdge({
            pipelineID,
            edge: edge,
          })
        );
      }
    }
  };
  const menuOpener = (e: React.MouseEvent, menuType?: string, node?: Node) => {
    e.preventDefault();
    const headerHeight = 50;
    let x = e.pageX,
      y = e.pageY - headerHeight;
    if (menuType === "pane") {
      setIsShowNodeMenu(undefined);
      setIsShowPaneMenu(true);
    }
    if (menuType === "node") {
      setIsShowPaneMenu(undefined);
      setIsShowNodeMenu(node);
    }
    setPosition({ ...position, mouseViewportPosition: { x, y } });
    const viewportPosition = position.viewportPosition;
    if (viewportPosition) {
      x = (x - viewportPosition.x) / viewportPosition.zoom;
      y = (y - viewportPosition.y) / viewportPosition.zoom;
    }
    return { x, y };
  };
  const appendNode = (e: React.MouseEvent, type: string, data: object) => {
    const { x, y } = menuOpener(e);
    const id = uuid();
    if (actorID) {
      dispatch(
        appendActorNode({
          actorID,
          id,
          position: { x, y },
          type,
          data,
        })
      );
    } else {
      dispatch(
        appendPipelineNode({
          pipelineID,
          id,
          position: { x, y },
          type,
          data,
        })
      );
      dispatch(createActor({ actorID: id }));
    }
    closeAllMenus();
  };
  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    dispatch(
      changeSelectedNode({
        area: actorID ? "actor" : "pipeline",
        areaID: actorID ? actorID : pipelineID,
        nodeID: node.id,
      })
    );
    if (actorID) {
      dispatch(selectActorNode({ actorID, nodeID: node.id }));
    } else {
      dispatch(selectPipelineNode({ pipelineID, nodeID: node.id }));
    }
    closeAllMenus();
  };
  const removeNode = () => {
    if (
      ((area === "pipeline" && areaID === pipelineID) ||
        (area === "actor" && areaID === actorID)) &&
      nodeID === (isShowNodeMenu && isShowNodeMenu.id)
    ) {
      dispatch(changeSelectedNode({ area: "", areaID: "", nodeID: "" }));
    }
    if (actorID) {
      dispatch(
        removeActorNode({
          actorID,
          nodeID: isShowNodeMenu ? isShowNodeMenu.id : "",
        })
      );
    } else {
      dispatch(
        removePipelineNode({
          pipelineID,
          nodeID: isShowNodeMenu ? isShowNodeMenu.id : "",
        })
      );
      dispatch(
        removeActor({
          actorID: isShowNodeMenu ? isShowNodeMenu.id : "",
        })
      );
    }
    setIsShowNodeMenu(undefined);
  };
  const closeAllMenus = () => {
    setIsShowNodeMenu(undefined);
    setIsShowPaneMenu(false);
  };
  const updateNode = () => {
    if (actorID) {
      dispatch(
        updateActorNode({
          actorID,
          nodes,
        })
      );
    } else {
      dispatch(
        updatePipelineNode({
          pipelineID,
          nodes,
        })
      );
    }
  };
  const onEdgeClick = (_: React.MouseEvent, edge: Edge) => {
    if (actorID) {
      dispatch(removeActorEdge({ actorID, edgeId: edge.id }));
    } else {
      dispatch(removePipelineEdge({ pipelineID, edgeId: edge.id }));
    }
  };

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={storeEdges}
        nodeTypes={nodeTypes}
        connectionLineStyle={{ strokeWidth: 6, stroke: "steelblue" }}
        nodeOrigin={[0.5, 0]}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        onNodeDragStop={updateNode}
        onEdgeClick={onEdgeClick}
        selectNodesOnDrag={false}
        onNodeClick={onNodeClick}
        onPaneClick={(e) => {
          closeAllMenus();
          dispatch(
            changeSelectedNode({
              area: actorID ? "actor" : "pipeline",
              areaID: actorID ? actorID : pipelineID,
              nodeID: "",
            })
          );
          if (actorID) {
            dispatch(deselectActorNodes({ actorID }));
          } else {
            dispatch(deselectPipelineNodes({ pipelineID }));
          }
        }}
        onPaneContextMenu={(e) => menuOpener(e, "pane")}
        onNodeContextMenu={(e, node: Node) => {
          setcurrentContextNode(node.id);
          menuOpener(e, "node", node);
        }}
        onInit={(reactFlowInstance) =>
          setPosition({
            ...position,
            viewportPosition: reactFlowInstance.getViewport(),
          })
        }
        onMoveEnd={(_, viewport) =>
          setPosition({ ...position, viewportPosition: viewport })
        }
        fitView
      >
        {isShowPaneMenu && (
          <div
            className="menu"
            style={{
              left: position.mouseViewportPosition.x,
              top: position.mouseViewportPosition.y,
            }}
          >
            {getObjectKeys(actorID ? nodeParams : pipelineParams).map(
              (nodeDatas) => (
                <button
                  key={uuid()}
                  className="menuButton"
                  onClick={(e) => {
                    appendNode(
                      e,
                      "customNode",
                      actorID ? nodeData[nodeDatas] : pipelineData[nodeDatas]
                    );
                  }}
                >
                  {nodeDatas}
                </button>
              )
            )}
          </div>
        )}
        {isShowNodeMenu && (
          <div
            className="menu"
            style={{
              left: position.mouseViewportPosition.x,
              top: position.mouseViewportPosition.y,
            }}
          >
            <button className="menuButton" onClick={(e) => removeNode()}>
              Delete
            </button>
            <button
              className="menuButton"
              onClick={(e) =>
                appendNode(
                  e,
                  isShowNodeMenu.type ? isShowNodeMenu.type : "",
                  isShowNodeMenu.data
                )
              }
            >
              Clone
            </button>
            {!actorID && isShowNodeMenu.data.type_ !== "Topic" && (
              <Link
                className="menuButton"
                onClick={closeAllMenus}
                routeName="actor"
                routeParams={{
                  pipelineID: pipelineID,
                  actorID: currentContextNode,
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

export default Flow;
