import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setActorState, setProjectActors } from "@/store/slicers/actorsSlicer";
import { setPipelineState } from "@/store/slicers/pipelinesSlicer";
import { RootState } from "@/store/store";
import { useRef } from "react";
import style from "./uploadButton.module.scss"

const UploadButton = () => {
  const dispatch = useAppDispatch();
  const { name, pipelineID, actorID } = useAppSelector(
    (state: RootState) => state.route
  );

  const inputFile = useRef<any>();
  const readJSONFile = async (file: any) => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.onload = (event: any) => {
        resolve(JSON.parse(event.target.result));
      };
      fileReader.onerror = (error) => reject(error);
      fileReader.readAsText(file);
    });
  };
  const fileChange = async (file: any) => {
    readJSONFile(file).then((json: any) => {
      if (name === "actor" && actorID) {
        dispatch(setActorState({ actorID: actorID, actor: json }));
      }
      if (name === "projects" && pipelineID) {
        dispatch(setPipelineState({ pipelineID: pipelineID, pipeline: json }));
        dispatch(setProjectActors({ actors: json.actors }));
      }
      if (inputFile.current) {
        inputFile.current.value = "";
      }
    });
  };

  return (
    <label className={`${style.uploadButton}`}>
      Upload {actorID ? "actor" : "project"}{" "}
      <svg
        data-icon="cloud-upload"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        role="img"
      >
        <path
          d="M8.71 7.29C8.53 7.11 8.28 7 8 7s-.53.11-.71.29l-3 3a1.003 1.003 0 001.42 1.42L7 10.41V15c0 .55.45 1 1 1s1-.45 1-1v-4.59l1.29 1.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71l-3-3zM12 4c-.03 0-.07 0-.1.01A5 5 0 002 5c0 .11.01.22.02.33a3.495 3.495 0 00.07 6.37c-.05-.23-.09-.46-.09-.7 0-.83.34-1.58.88-2.12l3-3a2.993 2.993 0 014.24 0l3 3c.54.54.88 1.29.88 2.12 0 .16-.02.32-.05.47C15.17 10.78 16 9.5 16 8c0-2.21-1.79-4-4-4z"
          fillRule="evenodd"
        ></path>
      </svg>
      <input
        type="file"
        ref={inputFile}
        onChange={(e: any) => {
          fileChange(e.target.files[0]);
        }}
      />
    </label>
  );
};

export default UploadButton;
