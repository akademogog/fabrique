import uuid from "react-uuid";
import { defaultCustomNode } from "./constants";

export const objectToArray = (object: any) => {
  const array = [];
  for (const key in object) {
    array.push(object[key]);
  }  
  return array;
}

export const getObjectKeys = (object: any) => {
  const array = [];
  for (const key in object) {
    array.push(key);
  }  
  return array;
}

export const arrayToObject = (array: any[]) => {
  const object: any = {};
  array.forEach((e: any) => {
    object[e.id] = e;
  });  
  return object;
}

export const createNodeData = (key: string) => {
  const inputsData = defaultCustomNode[
    key
  ].input_groups.map((group) => {
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

  const outputsData = defaultCustomNode[
    key
  ].output_groups.map((group) => {
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
    category: "Conditional",
    description: "Filters by \"is_true\" signal",
    label: key,
    g_ports_in: inputsData,
    g_ports_out: outputsData,
    group_type_: null,
    name: "Filter",
    schema_: "",
    type_: key,
    ui_config: null,
  }
}