import { useAppDispatch, useAppSelector } from "@/store/hooks";
import uuid from "react-uuid";
import style from "./NodesEditor.module.scss";
import { NodeInputType, Node, portData } from "@/types/node.types";
import { NodesEditorSection } from "./components/NodesEditorSection";
import { UIIButton, UIInput, UISelect } from "../UI";
import { RootState } from "@/store/store";
import {
  appendPipelineNodeInput,
  changePipelineNodeData,
} from "@/store/slicers/pipelinesSlicer";
import {
  appendActorNodeInput,
  changeActorNodeData,
} from "@/store/slicers/actorsSlicer";
import { useNodeEditorData } from "@/hooks";
import { NodesEditorInfo } from "./components/NodesEditorInfo";

export const NodesEditor = () => {
  const dispatch = useAppDispatch();
  const { area, areaID, nodeID } = useAppSelector(
    (state: RootState) => state.selected
  );

  const { actor, selectedNode, inputs, outputs } = useNodeEditorData(
    area,
    areaID,
    nodeID
  );

  const onInputChange = (e: any, id: string, type: NodeInputType) => {
    if (area === "pipeline") {
      dispatch(
        changePipelineNodeData({
          pipelineID: areaID,
          nodeID: nodeID,
          inputID: id,
          value: e.target.value,
          type,
        })
      );
    } else {
      dispatch(
        changeActorNodeData({
          actorID: areaID,
          nodeID: nodeID,
          inputID: id,
          value: e.target.value,
          type,
        })
      );
    }
  };
  const appendInput = (type: NodeInputType) => {
    const params: any = {};
    if (area === "pipeline") {
      dispatch(
        appendPipelineNodeInput({
          piplineID: areaID,
          nodeID: nodeID,
          type,
          input: { id: uuid(), type: "float", value: "" },
        })
      );
    } else {
      dispatch(
        appendActorNodeInput({
          actorID: areaID,
          nodeID: nodeID,
          type,
          input: { id: uuid(), type: "float", value: "" },
        })
      );
    }
  };

  const setName = (e: any) => {
    return e;
  };

  return (
    <div className={style.nodesEditor}>
      {actor && selectedNode && (
        <>
          <NodesEditorSection title="General">
            <NodesEditorInfo id={nodeID} type={selectedNode.data.type_} />
            <UIInput
              placeholder="name"
              label="name"
              value={selectedNode?.data.name}
              onChange={setName}
            />
            <textarea name="description" cols={30} rows={2}></textarea>
          </NodesEditorSection>

          <NodesEditorSection
            title="Inputs"
            control={
              <UIIButton
                variant="plus"
                onClick={() => appendInput("g_ports_in")}
              />
            }
          >
            {selectedNode &&
              inputs.map((input: portData) => (
                <div key={input.id_} className={style.nodesEditorInputBlock}>
                  <UIInput
                    placeholder="name"
                    value={input.code}
                    onChange={(e) => onInputChange(e, input.id_, "g_ports_in")}
                  />
                  <UISelect
                    name="type"
                    options={[
                      { value: "number", title: "Number" },
                      { value: "string", title: "String" },
                      { value: "integer", title: "integer" },
                    ]}
                  />
                </div>
              ))}
          </NodesEditorSection>
          <NodesEditorSection
            title="Inputs"
            control={
              <UIIButton
                variant="plus"
                onClick={() => appendInput("g_ports_out")}
              />
            }
          >
            {selectedNode &&
              outputs.map((input: portData) => (
                <div key={input.id_} className={style.nodesEditorInputBlock}>
                  <UIInput
                    placeholder="name"
                    value={input.code}
                    onChange={(e) =>
                      onInputChange(e, input.code, "g_ports_out")
                    }
                  />
                  <UISelect
                    name="type"
                    options={[
                      { value: "number", title: "Number" },
                      { value: "string", title: "String" },
                      { value: "integer", title: "integer" },
                    ]}
                  />
                </div>
              ))}
          </NodesEditorSection>
        </>
      )}
    </div>
  );
};
