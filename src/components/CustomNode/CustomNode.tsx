import { defaultCustomNode } from "@/helpers/constants";
import { NodeData } from "@/types/node.types";
import { Handle, Position } from "reactflow";
import style from "./CustomNode.module.scss";

interface customNodeProps {
  data: NodeData;
}

const ConstantsNode: React.FC<customNodeProps> = ({ data }) => {  
  return (
    <>
      <div className={`${style.customNode}`}>
        <p className={`${style.customNodeLabel}`}>{data.name}</p>

        {data.type_ && defaultCustomNode[data.type_].output_groups.map((group, index) => (
          <div className={`${style.outputsGroup}`} key={group.id_}>
            {              
              group.group_title && (
                <span className={`${style.outputsGroupLabel}`}>
                  {group.group_title}
                </span>
              )
            }

            {data.g_ports_out && data.g_ports_out[index].map((port) => (
              <div className={`${style.rightHandle}`} key={port.id_}>
                <span className={`${style.handleText}`}>{port.code}</span>
                <Handle
                  id={port.id_}
                  className={`${style.handleCircle}`}
                  style={{ backgroundColor: "white" }}
                  type="source"
                  position={Position.Right}
                />
              </div>
            ))}
          </div>
        ))}

        {data.type_ && defaultCustomNode[data.type_].input_groups.map((group, index) => (
          <div className={`${style.outputsGroup}`} key={group.id_}>
            {              
              group.group_title && (
                <span className={`${style.outputsGroupLabel}`}>
                  {group.group_title}
                </span>
              )
            }

            {data.g_ports_in && data.g_ports_in[index].map((port) => (
              <div className={`${style.leftHandle}`} key={port.id_}>
                <Handle
                  id={port.id_}
                  className={`${style.handleCircle}`}
                  type="target"
                  position={Position.Left}
                />
                <span className={`${style.handleText}`}>{port.code}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <p>{data.description}</p>
    </>
  );
};

export default ConstantsNode;
