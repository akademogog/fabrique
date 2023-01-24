import { useRouteNode } from "react-router5";
import PipelinesPage from "@/pages/PipelinesPage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { changeCurrentPage } from "@/store/slicers/routeSlicer";
import FlowPage from "@/pages/FlowPage";

const Main = () => {
  const dispatch = useAppDispatch();
  const { route } = useRouteNode("");
  if (route) {
    dispatch(
      changeCurrentPage({
        name: route.name ? route.name : "",
        pipelineID: route.params.pipelineID ? route.params.pipelineID : "",
        actorID: route.params.actorID ? route.params.actorID : "",
      })
    );
  }
  const { name } = useAppSelector((state: RootState) => state.route);

  if (name === "projects" || name === "actor") {
    return <FlowPage />;
  }
  if (name === "home") {
    return (
      <PipelinesPage />
    );
  }

  return <div>list</div>;
};

export default Main;
