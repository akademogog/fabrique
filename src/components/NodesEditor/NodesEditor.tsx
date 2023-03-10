import { useAppDispatch, useAppSelector } from "@/store/hooks";
import uuid from "react-uuid";
import style from "./NodesEditor.module.scss";
import { NodeInputType, Node, portData, portDatas } from "@/types/node.types";
import { NodesEditorSection } from "./components/NodesEditorSection";
import { UIIButton, UIInput, UISelect } from "../UI";
import { RootState } from "@/store/store";
import {
  appendPipelineNodeInput,
  changePipelineDescriptionValue,
  changePipelineInputData,
  changePipelineNameValue,
} from "@/store/slicers/pipelinesSlicer";
import {
  appendActorNodeInput,
  changeActorDescriptionValue,
  changeActorInputData,
  changeActorNameValue,
} from "@/store/slicers/actorsSlicer";
import { useNodeEditorData } from "@/hooks";
import { NodesEditorInfo } from "./components/NodesEditorInfo";
import { NodesEditorInputGroup } from "./components/NodesEditorInputGroup";

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

  const onInputChange = (
    e: any,
    indx: number,
    type: NodeInputType,
    field: "name" | "type_"
  ) => {
    const payload = {
      areaID: areaID,
      nodeID: nodeID,
      index: indx,
      value: e.target.value,
      type,
      field,
    };

    if (area === "pipeline") {
      dispatch(changePipelineInputData(payload));
    } else {
      dispatch(changeActorInputData(payload));
    }
  };
  const onNameChange = (e: any) => {
    if (area === "pipeline") {
      dispatch(
        changePipelineNameValue({
          areaID,
          nodeID: nodeID,
          value: e.target.value,
        })
      );
    } else {
      dispatch(
        changeActorNameValue({
          areaID,
          nodeID: nodeID,
          value: e.target.value,
        })
      );
    }
  };
  const onDescriptionChange = (e: any) => {
    const payload = {
      areaID,
      nodeID: nodeID,
      value: e.target.value,
    };
    if (area === "pipeline") {
      dispatch(changePipelineDescriptionValue(payload));
    } else {
      dispatch(changeActorDescriptionValue(payload));
    }
  };
  const appendInput = (type: NodeInputType) => {
    const payload = {
      areaID,
      nodeID: nodeID,
      type,
      input: {
        code: "",
        id_: uuid(),
        name: "",
        required: false,
        schema_: "",
        special: false,
        type_: "boolean",
        visible: true,
      },
    };
    if (area === "pipeline") {
      dispatch(appendPipelineNodeInput(payload));
    } else {
      dispatch(appendActorNodeInput(payload));
    }
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
              onChange={(e) => onNameChange(e)}
            />
            <textarea
              onChange={(e) => onDescriptionChange(e)}
              name="description"
              cols={30}
              rows={2}
            ></textarea>
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
            <NodesEditorInputGroup
              inputs={inputs}
              area={area}
              areaID={areaID}
              nodeID={nodeID}
              inputsType={"g_ports_in"}
            />
          </NodesEditorSection>
          <NodesEditorSection
            title="Outputs"
            control={
              <UIIButton
                variant="plus"
                onClick={() => appendInput("g_ports_out")}
              />
            }
          >
            <NodesEditorInputGroup
              inputs={outputs}
              area={area}
              areaID={areaID}
              nodeID={nodeID}
              inputsType={"g_ports_out"}
            />
          </NodesEditorSection>
        </>
      )}
    </div>
  );
};
