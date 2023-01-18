import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import uuid from "react-uuid";
import style from "./NodesEditor.module.scss";
import { appendNodeInput, changeNodeData } from "@/store/slicers/flowSlicer";
import { NodeInputType, Node, SelectedNode } from "@/types/node.types";

interface NodesEditorProps extends SelectedNode {}

export const NodesEditor: React.FC<NodesEditorProps> = ({ areaId, nodeId }) => {
  const dispatch = useAppDispatch();
  const actor = useAppSelector((state) =>
    state.flow.actors.find((actor) => actor.id === areaId)
  );
  const selectedNode: Node | undefined = actor && actor.nodes?.find((node) => node.id === nodeId);

  const onInput = (e: any, id: string, type: NodeInputType) => {
    dispatch(
      changeNodeData({
        areaId: areaId,
        nodeId: nodeId,
        inputId: id,
        value: e.target.value,
        type,
      })
    );
  };
  const appendInput = (type: NodeInputType) => {
    dispatch(
      appendNodeInput({
        areaId: areaId,
        nodeId: nodeId,
        type,
        input: { id: uuid(), type: "float", value: "" }
      })
    );
  };

  return (
    <div className={style.nodeDatas}>
      {
        actor && (
          <>
            <div className={style.nodeDatasGeneral}>
              <div className={style.nodeDatasTitle}>
                <h3>General</h3>
              </div>
              <p>id: {selectedNode?.id}</p>
              <p>type: {selectedNode?.type}</p>
              <label>
                <input type="text" placeholder="name" />
              </label>
              <textarea name="" cols={30} rows={2}></textarea>
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
                <button onClick={() => appendInput('outputs')}>append</button>
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
          </>
        )
      }
    </div>
  )
};