import { useRouteNode } from "react-router5";
import PipelinesPage from "@/pages/PipelinesPage/PipelinesPage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { changeCurrentPage } from "@/store/slicers/routeSlicer";
import FlowPage from "@/pages/FlowPage";
import { useEffect } from "react";
import { changeSelectedNode } from "@/store/slicers/selectedSlicer";

const Main = () => {
  const dispatch = useAppDispatch();
  const { route } = useRouteNode("");
  useEffect(() => {
    if (route) {
      dispatch(
        changeCurrentPage({
          name: route.name ? route.name : "",
          pipelineID: route.params.pipelineID ? route.params.pipelineID : "",
          actorID: route.params.actorID ? route.params.actorID : "",
        })
      );
      dispatch(
        changeSelectedNode({
          area: "",
          areaID: "",
          nodeID: "",
        })
      );
    }
  }, [route]);
  const { name } = useAppSelector((state: RootState) => state.route);  

  if (name === "projects" || name === "actor") {
    return <FlowPage />;
  }
  if (name === "home") {
    return <PipelinesPage />;
  }

  return <div>404</div>;
};

export default Main;
