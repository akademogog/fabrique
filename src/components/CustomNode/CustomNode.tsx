import { Handle, Position } from "reactflow";
import style from './CustomNode.module.scss'

const ConstantsNode = ({ data }) => {  
  return (
    <>
      <div className={`${style.customNode}`}>
        <p className={`${style.customNodeLabel}`}>{data.label}</p>

        {data.outputs.map((e) => (
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
        
        {data.inputs.map((e) => (
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
