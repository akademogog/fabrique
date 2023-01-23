import { objectToArray } from "@/helpers/mapping";
import { NodeData } from "@/types/node.types";
import { useMemo } from "react";
import { Handle, Position } from "reactflow";
import style from './CustomNode.module.scss';

interface customNodeProps{
  data: NodeData
};

const ConstantsNode: React.FC<customNodeProps> = ({ data }) => {
  const inputs: any = useMemo(() => {
    if (data) {
      const inputs = objectToArray(data.inputs);
      return inputs;
    }
  }, [data]);
  const outputs: any = useMemo(() => {
    if (data) {
      const outputs = objectToArray(data.outputs);
      return outputs;
    }
  }, [data]);

  return (
    <>
      <div className={`${style.customNode}`}>
        <p className={`${style.customNodeLabel}`}>{data.label}</p>

        {outputs.map((e) => (
          <div className={`${style.rightHandle}`} key={e.id}>
            <span className={`${style.handleText}`}>{e.value}</span>
            <Handle
              id={e.id}
              className={`${style.handleCircle}`}
              style={{backgroundColor: e.color || 'white'}}
              type="source"
              position={Position.Right}
            />
          </div>
        ))}
        
        {inputs.map((e) => (
          <div className={`${style.leftHandle}`} key={e.id}>
            <Handle
              id={e.id}
              className={`${style.handleCircle}`}
              type="target"
              position={Position.Left}
            />
            <span className={`${style.handleText}`}>{e.value}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default ConstantsNode;
