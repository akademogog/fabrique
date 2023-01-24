import { customNode } from "@/types/groupPorts.types";
import uuid from "react-uuid";
import { defaultCustomNodeActor } from "./constants";

export const objectToArray = (object: any) => {
  const array = [];
  for (const key in object) {
    array.push(object[key]);
  }
  return array;
};

export const getObjectKeys = (object: any) => {
  const array = [];
  for (const key in object) {
    array.push(key);
  }
  return array;
};

export const arrayToObject = (array: any[]) => {
  const object: any = {};
  array.forEach((e: any) => {
    object[e.id] = e;
  });
  return object;
};

export const createNodeData = (key: string, UIParams: customNode) => {
  const inputsData = UIParams[key].input_groups.map((group) => {
    const inputData = [
      {
        code: "",
        id_: uuid(),
        name: "value",
        required: true,
        schema_: "",
        special: false,
        type_: "any",
        visible: true,
      },
    ];
    return inputData;
  });

  const outputsData = UIParams[key].output_groups.map((group) => {
    const outputData = [
      {
        code: "",
        id_: uuid(),
        name: "value",
        required: true,
        schema_: "",
        special: false,
        type_: "any",
        visible: true,
      },
    ];
    return outputData;
  });

  return {
    category: "",
    description: "",
    label: key,
    g_ports_in: key === "Actor" || key === "Topic" ? [] : inputsData,
    g_ports_out: key === "Actor" || key === "Topic" ? [] : outputsData,
    group_type_: null,
    name: key,
    schema_: "",
    type_: key,
    ui_config: null,
  };
};

export const getPipelineJson = (pipelineID: string) => {
  const jsonLocalState = localStorage.getItem("persist:root");
  if (jsonLocalState) {
    const localeState = JSON.parse(jsonLocalState);
    const localePipelines = JSON.parse(localeState.pipelines);
    const localeActors = JSON.parse(localeState.actors);
    const currentLocalePilpeline = localePipelines[pipelineID];
    const currentLocalePilpelineNodes = currentLocalePilpeline.nodes;
    let currentLocalePilpelineActor: any = {};
    for (const key in currentLocalePilpelineNodes) {
      currentLocalePilpelineActor[key] = localeActors[key];
    }
    currentLocalePilpeline["actors"] = currentLocalePilpelineActor;
    return currentLocalePilpeline;
  }
};
