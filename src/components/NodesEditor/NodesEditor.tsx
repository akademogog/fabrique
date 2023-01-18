import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import uuid from "react-uuid";
import style from "./NodesEditor.module.scss";
import { appendNodeInput, changeNodeData } from "@/store/slicers/flowSlicer";
import { NodeInputType, Node, SelectedNode } from "@/types/node.types";
import { NodesEditorSection } from "./components/NodesEditorSection";
import { UIInput } from "../UI";

interface NodesEditorProps extends SelectedNode {}

export const NodesEditor: React.FC<NodesEditorProps> = ({ areaId, nodeId }) => {
  const dispatch = useAppDispatch();
  const actor = useAppSelector((state) =>
    state.flow.actors.find((actor) => actor.id === areaId)
  );
  const selectedNode: Node | undefined =
    actor && actor.nodes?.find((node) => node.id === nodeId);

  const onInputChange = (e: any, id: string, type: NodeInputType) => {
    dispatch(
      changeNodeData({
        areaId: areaId,
        nodeId: nodeId,
        inputId: id,
        value: e.target.value,
        type
      })
    );
  };
  const appendInput = (type: NodeInputType) => {
    dispatch(
      appendNodeInput({
        areaId: areaId,
        nodeId: nodeId,
        type,
        input: { id: uuid(), type: "float", value: "" },
      })
    );
  };

  const setName = (e: any) => {
    return e;
  };

  return (
    <div className={style.nodesEditor}>
      {actor && (
        <>
          <NodesEditorSection title="General">
            <p>id: {selectedNode?.id}</p>
            <p>type: {selectedNode?.type}</p>
            <UIInput
              placeholder="name"
              label="name"
              value={selectedNode?.data.label}
              onChange={setName}
            />
            <textarea name="" cols={30} rows={2}></textarea>
          </NodesEditorSection>

          <NodesEditorSection title="Inputs">
            <button onClick={(e) => appendInput("inputs")}>append</button>
            {selectedNode &&
              selectedNode.data.inputs.map((input) => (
                <div key={input.id} className={style.nodesEditorInputBlock}>
                  <UIInput
                    placeholder="name"
                    value={input.value}
                    onChange={(e) => onInputChange(e, input.id, "inputs")}
                  />
                  <select name="type">
                    <option value="number">Number</option>
                    <option value="integer">Integer</option>
                    <option value="string">String</option>
                  </select>
                </div>
              ))}
          </NodesEditorSection>
          <NodesEditorSection title="Outputs">
            <button onClick={() => appendInput("outputs")}>append</button>
            {selectedNode &&
              selectedNode.data.outputs.map((input) => (
                <div key={input.id} className={style.nodesEditorInputBlock}>
                  <UIInput
                    placeholder="name"
                    value={input.value}
                    onChange={(e) => onInputChange(e, input.id, "outputs")}
                  />
                  <select name="type">
                    <option value="number">Number</option>
                    <option value="integer">Integer</option>
                    <option value="string">String</option>
                  </select>
                </div>
              ))}
          </NodesEditorSection>
        </>
      )}
    </div>
  );
};
