import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import uuid from "react-uuid";
import style from "./NodeDatas.module.scss";
import { appendNodeInput, changeNodeData } from "../../store/slicers/flowSlicer";

const NodeDatas = ({ currentSelectedNode }) => {
  const dispatch = useAppDispatch();
  const actor = useAppSelector((state) =>
    state.flow.actors.find((actor) => actor.id === currentSelectedNode.areaId)
  );
  const selectedNode = actor && actor.nodes.find((node) => node.id === currentSelectedNode.nodeId);

  const onInput = (e, id, type) => {
    dispatch(
      changeNodeData({
        areaId: currentSelectedNode.areaId,
        nodeId: currentSelectedNode.nodeId,
        inputId: id,
        value: e.target.value,
        type,
      })
    );
  };
  const appendInput = (type) => {
    dispatch(
      appendNodeInput({
        areaId: currentSelectedNode.areaId,
        nodeId: currentSelectedNode.nodeId,
        type,
        input: { id: uuid(), type: "float", value: "" },
      })
    );
  };

  return (
    actor && (
      <div className={style.nodeDatas}>
        <div className={style.nodeDatasGeneral}>
          <div className={style.nodeDatasTitle}>
            <h3>General</h3>
          </div>
          <p>id: {selectedNode.id}</p>
          <p>type: {selectedNode.type}</p>
          <label>
            <input type="text" placeholder="name" />
          </label>
          <textarea name="" cols="30" rows="2"></textarea>
        </div>
        <div className={style.nodeDatasInputs}>
          <div className={style.nodeDatasTitle}>
            <h3>Inputs</h3>
            <button onClick={e => appendInput('inputs')}>append</button>
          </div>
          {selectedNode &&
            selectedNode.data.inputs.map((input) => (
              <div key={input.id} className={style.nodeDatasInputBlock}>
                <label>
                  <input
                    type="text"
                    placeholder="name"
                    value={input.value}
                    onInput={(e) => onInput(e, input.id, "inputs")}
                  />
                </label>
                <select name="type">
                  <option value="number">Number</option>
                  <option value="integer">Integer</option>
                  <option value="string">String</option>
                </select>
              </div>
            ))}
        </div>
        <div className={style.nodeDatasOutputs}>
          <div className={style.nodeDatasTitle}>
            <h3>Outputs</h3>
            <button onClick={e => appendInput('outputs')}>append</button>
          </div>
          {selectedNode &&
            selectedNode.data.outputs.map((input) => (
              <div key={input.id} className={style.nodeDatasInputBlock}>
                <label>
                  <input
                    type="text"
                    placeholder="name"
                    value={input.value}
                    onInput={(e) => onInput(e, input.id, "outputs")}
                  />
                </label>
                <select name="type">
                  <option value="number">Number</option>
                  <option value="integer">Integer</option>
                  <option value="string">String</option>
                </select>
              </div>
            ))}
        </div>
      </div>
    )
  );
};

export default NodeDatas;
