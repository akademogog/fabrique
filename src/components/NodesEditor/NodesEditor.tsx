import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import uuid from "react-uuid";
import style from "./NodesEditor.module.scss";
import { NodeInputType, Node, SelectedNode } from "@/types/node.types";
import { NodesEditorSection } from "./components/NodesEditorSection";
import { UIIButton, UIInput, UISelect } from "../UI";
import { RootState } from "@/store/store";
import { objectToArray } from "@/helpers/mapping";
import { appendPipelineNodeInput, changePipelineNodeData } from "@/store/slicers/pipelinesSlicer";

export const NodesEditor = () => {
  const dispatch = useAppDispatch();
  const { area, areaID, nodeID } = useAppSelector(
    (state: RootState) => state.selected
  );
  const actor = useAppSelector((state) => {
    if (area === "pipeline") {
      const pipelines = objectToArray(state.pipelines);
      return pipelines.find((pipeline) => pipeline.id === areaID);
    }
    if (area === "actor") {
      const actors = objectToArray(state.actors);
      return actors.find((actors) => actors.id === areaID);
    }
  });
  const selectedNode: Node | undefined = useMemo(() => {
    if (actor) {
      const nodes = objectToArray(actor.nodes);
      return nodes.find((node) => node.id === nodeID);
    }
  }, [actor]);
  const inputs: any = useMemo(() => {
    if (selectedNode) {
      const inputs = objectToArray(selectedNode.data.inputs);
      return inputs;
    }
  }, [selectedNode]);
  const outputs: any = useMemo(() => {
    if (selectedNode) {
      const outputs = objectToArray(selectedNode.data.outputs);
      return outputs;
    }
  }, [selectedNode]);

  const onInputChange = (e: any, id: string, type: NodeInputType) => {
    if (area === 'pipeline') {
      dispatch(
        changePipelineNodeData({
          piplineID: areaID,
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
    if (area === 'pipeline') {
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
            <textarea name="description" cols={30} rows={2}></textarea>
          </NodesEditorSection>

          <NodesEditorSection title="Inputs">
            <UIIButton variant="green" onClick={() => appendInput("inputs")}>
              append
            </UIIButton>
            {selectedNode &&
              inputs.map((input) => (
                <div key={input.id} className={style.nodesEditorInputBlock}>
                  <UIInput
                    placeholder="name"
                    value={input.value}
                    onChange={(e) => onInputChange(e, input.id, "inputs")}
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
          <NodesEditorSection title="Outputs">
            <UIIButton variant="green" onClick={() => appendInput("outputs")}>
              append
            </UIIButton>
            {selectedNode &&
              outputs.map((input) => (
                <div key={input.id} className={style.nodesEditorInputBlock}>
                  <UIInput
                    placeholder="name"
                    value={input.value}
                    onChange={(e) => onInputChange(e, input.id, "outputs")}
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
