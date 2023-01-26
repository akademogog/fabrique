import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import DownloadButton from "../DownloadButton/DownloadButton";
import UploadButton from "../UploadButton/UploadButton";
import style from "./Header.module.scss";

const Header = () => {
  const { name } = useAppSelector((state: RootState) => state.route);
  const { areaID, nodeID } = useAppSelector(
    (state: RootState) => state.selected
  );
  const { pipelines, actors } = useAppSelector((state: RootState) => state);
  const [nameCurrentNode, setNameCurrentNode] = useState("");
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

  return (
    <div className={`${style.header}`}>
      <div className={`${style.headerLeft}`}>
        <p>{name !== "home" ? `Edit node: ${nameCurrentNode}` : "Projects:"}</p>
      </div>
      {name !== "home" && (
        <div className={`${style.headerRight}`}>
          <DownloadButton />
          <UploadButton />
        </div>
      )}
    </div>
  );
};

export default Header;
