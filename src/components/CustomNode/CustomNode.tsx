import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { customNode } from "@/types/groupPorts.types";
import { NodeData } from "@/types/node.types";
import { useMemo } from "react";
import { Handle, Position } from "reactflow";
import style from "./CustomNode.module.scss";

interface customNodeProps {
  data: NodeData;
}

const ConstantsNode: React.FC<customNodeProps> = ({ data }) => {
  const { name } = useAppSelector((state: RootState) => state.route);
  const { pipelineParams, nodeParams } = useAppSelector((state: RootState) => ({
    pipelineParams: state.uiParams.uiPipelineParams.params.configUIParams,
    nodeParams: state.uiParams.uiNodeParams.params.configUIParams,
  }));
  const defaultCustomNode: customNode = useMemo(() => {
    return name === "actor" ? nodeParams : pipelineParams;
  }, [name, pipelineParams, nodeParams]);

  return (
    <>
      {defaultCustomNode && (
        <>
          <div className={`${style.customNode} custom-node`}>
            <p className={`${style.customNodeLabel} custom-node_label`}>
              {data.name}
            </p>

            {data.type_ &&
              defaultCustomNode[data.type_] &&
              defaultCustomNode[data.type_].output_groups.map(
                (group, index) => (
                  <div className={`${style.outputsGroup}`} key={group.id_}>
                    {group.code_title && (
                      <span className={`${style.outputsGroupLabel}`}>
                        {group.code_title}
                      </span>
                    )}

                    {data.g_ports_out?.length
                      ? data.g_ports_out[index].map((port) => (
                          <div
                            className={`${style.rightHandle}`}
                            key={port.id_}
                          >
                            <span className={`${style.handleText}`}>
                              {port.name}
                            </span>
                            <Handle
                              id={port.id_}
                              className={`${style.handleCircle}`}
                              style={{ backgroundColor: "white" }}
                              type="source"
                              position={Position.Right}
                            />
                          </div>
                        ))
                      : ""}
                  </div>
                )
              )}

            {data.type_ &&
              defaultCustomNode[data.type_] &&
              defaultCustomNode[data.type_].input_groups.map((group, index) => (
                <div className={`${style.inputsGroup}`} key={group.id_}>
                  {group.group_title && (
                    <span className={`${style.inputsGroupLabel}`}>
                      {group.group_title}
                    </span>
                  )}

                  {data.g_ports_in?.length
                    ? data.g_ports_in[index].map((port) => (
                        <div className={`${style.leftHandle}`} key={port.id_}>
                          <Handle
                            id={port.id_}
                            className={`${style.handleCircle}`}
                            type="target"
                            position={Position.Left}
                          />
                          <span className={`${style.handleText}`}>
                            {port.name}
                          </span>
                        </div>
                      ))
                    : ""}
                </div>
              ))}
          </div>
          <p>{data.description}</p>
        </>
      )}
    </>
  );
};

export default ConstantsNode;
