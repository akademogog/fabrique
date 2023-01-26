import { UIInput, UISelect } from '@/components/UI'
import { useAppDispatch } from '@/store/hooks';
import { changeActorInputData } from '@/store/slicers/actorsSlicer';
import { changePipelineInputData } from '@/store/slicers/pipelinesSlicer';
import { NodeInputType, portData, portDatas } from '@/types/node.types';
import React from 'react'
import uuid from 'react-uuid'
import style from '../NodesEditor.module.scss';

interface NodesEditorInputGroupProps {
    areaID: string;
    nodeID: string;
    area: string;
    inputs: portDatas[];
    inputsType: NodeInputType;
}

export const NodesEditorInputGroup: React.FC<NodesEditorInputGroupProps> = ({area, areaID, nodeID, inputs, inputsType}) => {
    const dispatch = useAppDispatch();
    
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
    
  return (
    <>
    {inputs.map((inputGroup: portDatas, i: number) => (
              <ul
                className={style.nodesEditorInputGroup}
                key={"inputGroup" + i}
              >
                <span>input_group: {i}</span>
                {inputGroup.map((input: portData, indx) => (
                  <li key={uuid()}>
                    <div className={style.nodesEditorInputBlock}>
                      <UIInput
                        label="name"
                        isDisabled={i === 1}
                        placeholder="name"
                        value={input.name}
                        onChange={(e) =>
                          onInputChange(e, indx, inputsType, "name")
                        }
                      />
                      <UISelect
                        className={style.nodesEditorInputSelect}
                        name="type"
                        value={input.type_}
                        onChange={(e) =>
                          onInputChange(e, indx, inputsType, "type_")
                        }
                        options={[
                          { value: "any", title: "any" },
                          { value: "int", title: "int" },
                          { value: "bool", title: "bool" },
                        ]}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ))}
    </>
  )
}
