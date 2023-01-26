import { getPipelineJson } from "@/helpers/mapping";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setActorState, setProjectActors } from "@/store/slicers/actorsSlicer";
import { setPipelineState } from "@/store/slicers/pipelinesSlicer";
import { RootState } from "@/store/store";
import { LegacyRef, useEffect, useRef, useState } from "react";
import style from "./Header.module.scss";

const Header = () => {
  const dispatch = useAppDispatch();
  const { name, pipelineID, actorID } = useAppSelector(
    (state: RootState) => state.route
  );
  const { areaID, nodeID } = useAppSelector(
    (state: RootState) => state.selected
  );
  const { pipelines, actors } = useAppSelector((state: RootState) => state);
  const [dataFile, setDataFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [nameCurrentNode, setNameCurrentNode] = useState("");
  const inputFile = useRef<any>();

  useEffect(() => {
    if (nodeID) {
      getNameCurrentNode();
    } else {
      setNameCurrentNode("");
    }
  }, [nodeID]);

  const getNameCurrentNode = () => {
    if (name === "projects") {
      if (pipelines[areaID]) {
        setNameCurrentNode(pipelines[areaID].nodes[nodeID].data.type_);
      }
    } else if (name === "actor") {
      if (actors[areaID]) {
        setNameCurrentNode(actors[areaID].nodes[nodeID].data.type_);
      }
    }
  };
  const fileDownload = () => {
    let pipelineJson;
    if (actorID) {
      pipelineJson = getPipelineJson(pipelineID, actorID);
      setFileName('actor.json');
    } else {
      pipelineJson = getPipelineJson(pipelineID);
      setFileName('project.json');
    }
    const jsonFile = new Blob([JSON.stringify(pipelineJson)], {
      type: "application/json",
    });
    setDataFile(URL.createObjectURL(jsonFile));
  };
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
    <div className={`${style.header}`}>
      <div className={`${style.headerLeft}`}>
        <p>{name !== "home" ? `Edit node: ${nameCurrentNode}` : "Projects:"}</p>
      </div>
      <div className={`${style.headerRight}`}>
        {name !== "home" && (
          <>
            <a
              onClick={fileDownload}
              href={dataFile}
              download={fileName}
              className={`${style.headerButton}`}
            >
              Download {actorID ? "actor" : "project"}{" "}
              <svg
                data-icon="cloud-download"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                role="img"
              >
                <path
                  d="M11 11c-.28 0-.53.11-.71.29L9 12.59V8c0-.55-.45-1-1-1s-1 .45-1 1v4.59L5.71 11.3A.965.965 0 005 11a1.003 1.003 0 00-.71 1.71l3 3c.18.18.43.29.71.29s.53-.11.71-.29l3-3A1.003 1.003 0 0011 11zm1-7c-.03 0-.07 0-.1.01A5 5 0 002 5c0 .11.01.22.02.33A3.51 3.51 0 000 8.5c0 1.41.84 2.61 2.03 3.17C2.2 10.17 3.46 9 5 9c.06 0 .13.02.19.02C5.07 8.7 5 8.36 5 8c0-1.66 1.34-3 3-3s3 1.34 3 3c0 .36-.07.7-.19 1.02.06 0 .13-.02.19-.02 1.48 0 2.7 1.07 2.95 2.47A3.964 3.964 0 0016 8c0-2.21-1.79-4-4-4z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </a>
            <label className={`${style.headerButton}`}>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
