import { Link, useRouteNode } from "react-router5";
import PiplinePage from "@/pages/PiplinePage";
import ActorPage from "@/pages/ActorPage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changeCurrentPage, createActor } from "@/store/slicers/flowSlicer";
import { RootState } from "@/store/store";

const Main = () => {
  const dispatch = useAppDispatch();
  const { route } = useRouteNode("");

  dispatch(changeCurrentPage({ params: route.params }));

  if (route.name === "projects") {
    return <PiplinePage />;
  }

  if (route.name === "actor") {
    return <ActorPage />;
  }

  if (route.name === "home") {
    return (
      <div>
        <Link
          routeName="projects"
          routeParams={{
            piplineID: "1",
          }}
        >
          projects 1
        </Link>
      </div>
    );
  }

  // if (route.name === "projects.actor") {
  //   const currentActor = actors.find(
  //     (actor) => actor.id == route.params.actorID
  //   );

  //   if (!currentActor) {
  //     dispatch(createNewActorNodes({actorID: String(route.params.actorID)}));
  //   }

  //   return (
  //     <div className="flowAreaContainer">
  //       <FlowActor
  //         area={"actor"}
  //         actorID={String(route.params.actorID)}
  //         storeNodes={currentActor && currentActor.nodes}
  //         storeEdges={currentActor && currentActor.edges}
  //       />
  //       <NodesEditor areaId={areaId} nodeId={nodeId} />
  //     </div>
  //   );
  // }

  return <div>list</div>;
};

export default Main;
