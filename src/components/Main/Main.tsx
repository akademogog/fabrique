
import { useRouteNode } from "react-router5";
import PiplinePage from "@/pages/PiplinePage";
import ActorPage from "@/pages/ActorPage";

const Main = () => {
  const { route } = useRouteNode('');

  if (route.name === "projects") {
    return (
      <PiplinePage piplineID={String(route.params.piplineID)}/>
    );
  }

  if (route.name === "projects.actor") {
    return (
      <ActorPage piplineID={String(route.params.piplineID)} actorID={String(route.params.actorID)}/>
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
