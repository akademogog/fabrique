import { objectToArray } from "@/helpers/mapping";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createPipeline } from "@/store/slicers/pipelinesSlicer";
import { RootState } from "@/store/store";
import { Link } from "react-router5";

const PipelinesPage = () => {
  const dispatch = useAppDispatch();
  const pipelines = useAppSelector((state: RootState) =>
    objectToArray(state.pipelines)
  );
  const onClick = () => {
    dispatch(createPipeline());
  };

  return (
    <div>
      {pipelines && (
        <ul>
          {pipelines.map((pipeline) => (
            <li key={pipeline.id}>
              <Link
                routeName="projects"
                routeParams={{
                  pipelineID: pipeline.id,
                }}
              >
                projects {pipeline.id}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <button onClick={onClick}>NewProject</button>
    </div>
  );
};

export default PipelinesPage;
