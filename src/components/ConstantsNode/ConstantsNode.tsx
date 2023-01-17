import { Handle, Position } from "reactflow";

const ConstantsNode = ({ data }) => {
  return (
    <>
      <div style={{ backgroundColor: "#fff", border: "1px solid #000" }}>
        <p className="customNodeLabel">{data.label}</p>

        {data.outputs.map((e) => (
          <div className="rightHandle" key={e.id}>
            <span>{e.value}</span>
            <Handle
              id={e.id}
              className="rightHandleCircle"
              type="source"
              position={Position.Right}
            />
          </div>
        ))}
        
        {data.inputs.map((e) => (
          <div className="leftHandle" key={e.id}>
            <Handle
              id={e.id}
              className="leftHandleCircle"
              type="target"
              position={Position.Left}
            />
            <span>{e.value}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default ConstantsNode;
