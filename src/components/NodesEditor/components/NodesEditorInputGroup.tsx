import { UIIButton, UIInput, UISelect } from '@/components/UI'
import { useAppDispatch } from '@/store/hooks';
import { changeActorInputData, removeActorInput } from '@/store/slicers/actorsSlicer';
import { changePipelineInputData, removePipelineInput } from '@/store/slicers/pipelinesSlicer';
import { NodeInputType, portData, portDatas } from '@/types/node.types';
import React, { useState } from 'react'
import uuid from 'react-uuid'
import style from '../NodesEditor.module.scss';
import IconDelete from '@/assets/img/icon-delete.svg';

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

    const onInputDelete = (
        e: any,
        indx: number,
        type: NodeInputType,
      ) => {
        const payload = {
          areaID: areaID,
          nodeID: nodeID,
          index: indx,
          value: e.target.value,
          type
        };
    
        if (area === "pipeline") {
          dispatch(removePipelineInput(payload));
        } else {
          dispatch(removeActorInput(payload));
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
                        defaultValue={input.name}
                        onBlur={(e) =>
                            onInputChange(e, indx, inputsType, "name")}
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
                      <UIIButton variant='default' onClick={e => onInputDelete(e, indx, inputsType)}>
                        <img src={IconDelete} alt="delete" />
                      </UIIButton>
                    </div>
                  </li>
                ))}
              </ul>
            ))}
    </>
  )
}
