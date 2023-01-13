import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useAppDispatch } from '../../store/hooks';
import { changeNodeData } from '../../store/slicers/flowSlicer';

const ConstantsNode = ({ id, data }) => {
  const dispatch = useAppDispatch();
  const onChange = useCallback((e) => {
    dispatch(changeNodeData({
      blockId: data.blockId,
      id,
      data: {...data, ['value']: e.target.value},
    }));
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div style={{padding: '20px', backgroundColor: '#fff', border: '1px solid #000'}}>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} value={data.value}/>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}

export default ConstantsNode