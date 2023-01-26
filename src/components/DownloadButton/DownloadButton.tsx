import { getPipelineJson } from "@/helpers/mapping";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { useState } from "react";
import style from "./downloadButton.module.scss"

const DownloadButton = () => {
  const { pipelineID, actorID } = useAppSelector(
    (state: RootState) => state.route
  );

  const [dataFile, setDataFile] = useState("");
  const [fileName, setFileName] = useState("");

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

  return (
    <a
      onClick={fileDownload}
      href={dataFile}
      download={fileName}
      className={`${style.downloadButton}`}
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
  );
};

export default DownloadButton;
