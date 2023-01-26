import { Node } from "reactflow";
import { portData, portDatas } from "@/types/node.types";
type TRules = {
  [name: string]: string[];
};

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

export const connectedRules = (
  sourceNode: Node,
  targetNode: Node,
  sourceHandle: string,
  targetHandle: string
) => {
  let sourceHadleType: string = "";
  let targetHadleType: string = "";
  sourceNode.data.g_ports_out.find((group: portDatas) => {
    group.find((handle: portData) => {
      if (handle.id_ === sourceHandle) {
        sourceHadleType = handle.type_;
      }
    });
  });
  targetNode.data.g_ports_in.find((group: portDatas) => {
    group.find((handle: portData) => {
      if (handle.id_ === targetHandle) {
        targetHadleType = handle.type_;
      }
    });
  });

  const whitelistFromTo: TRules = {
    number: ["number", "integer", "bool", "any"],
    integer: ["number", "integer", "bool", "any"],
    string: ["string", "bool", "any"],
    object: ["object", "bool", "any"],
    array: ["array", "bool", "any"],
    bool: ["bool", "any"],
    any: ["number", "integer", "string", "object", "array", "bool", "any"],
    bus_in: ["bus_in"],
    bus_out: ["bus_out"],
  };

  if (!whitelistFromTo[sourceHadleType]) {
    return false;
  }

  if (
    whitelistFromTo[sourceHadleType].find(
      (allowedType) => allowedType === targetHadleType
    )
  ) {
    return true;
  }

  return false;
};
