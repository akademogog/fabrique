import { customNode } from "@/types/groupPorts.types";
import uuid from "react-uuid";
import { Node } from "reactflow";

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
    if (key === "Topic") {
      return [
        {
          code: "",
          id_: uuid(),
          name: group.valid_types[0],
          required: true,
          schema_: "",
          special: false,
          type_: group.valid_types[0],
          visible: true,
        },
      ];
    }

    if (key === "Actor") {
      return [];
    }

    return [
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
  });

  const outputsData = UIParams[key].output_groups.map((group) => {
    if (key === "Topic") {
      return [
        {
          code: "",
          id_: uuid(),
          name: group.valid_types[0],
          required: true,
          schema_: "",
          special: false,
          type_: group.valid_types[0],
          visible: true,
        },
      ];
    }

    if (key === "Actor") {
      return [];
    }

    return [
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
  });

  return {
    category: "",
    description: "",
    label: key,
    g_ports_in: inputsData,
    g_ports_out: outputsData,
    group_type_: null,
    name: key,
    schema_: "",
    type_: key,
    ui_config: null,
  };
};

export const getPipelineJson = (pipelineID: string, actorID?: string) => {
  const jsonLocalState = localStorage.getItem("persist:root");
  if (actorID) {
    if (jsonLocalState) {
      const localeState = JSON.parse(jsonLocalState);
      const localeActors = JSON.parse(localeState.actors);
      return localeActors[actorID];
    }
  }
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

export const connectedRules = (sourceNode: Node, targetNode: Node) => {
  type TRules = {
    [name: string]: string[]
  }
  
  const rules: TRules = {
    Actor: ["Actor"],
    Topic: ["Topic"],
  };
  
  if (!rules[sourceNode?.data.type_]) {
    return true;
  }

  if (rules[sourceNode?.data.type_].find(e => e != targetNode?.data.type_)) {
    return true;
  }
  return false;
};
