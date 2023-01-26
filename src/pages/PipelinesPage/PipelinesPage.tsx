import { objectToArray } from "@/helpers/mapping";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createPipeline,
  removePipeline,
} from "@/store/slicers/pipelinesSlicer";
import { RootState } from "@/store/store";
import { Link } from "react-router5";
import IconDelete from '@/assets/img/icon-delete.svg';
import style from "./PipelinesPage.module.scss";

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
            <li key={pipeline.id} className={`${style.pipelineEl}`}>
              <svg
                data-icon="folder-close"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                role="img"
              >
                <path
                  d="M-.01 14c0 .55.45 1 1 1h14c.55 0 1-.45 1-1V7h-16v7zm15-10H7.41L5.7 2.3a.965.965 0 00-.71-.3h-4c-.55 0-1 .45-1 1v3h16V5c0-.55-.45-1-1-1z"
                  fillRule="evenodd"
                  fill="#5f6b7c"
                ></path>
              </svg>
              <span className={`${style.pipelineName}`}>projects {pipeline.id}</span>
              <div className={`${style.pipelineButtons}`}>
                <Link
                  className={`${style.editButton}`}
                  routeName="projects"
                  routeParams={{
                    pipelineID: pipeline.id,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M15 6.5L17.5 9M11 20H20M4 20V17.5L16.75 4.75C17.4404 4.05964 18.5596 4.05964 19.25 4.75V4.75C19.9404 5.44036 19.9404 6.55964 19.25 7.25L6.5 20H4Z"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <span
                  className={`${style.deleteButton}`}
                  onClick={() => dispatch(removePipeline({ pipelineID: pipeline.id }))}
                >
                  <img src={IconDelete} alt="delete" />
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button className={`${style.createButton}`} onClick={onClick}>New Project</button>
    </div>
  );
};

export default PipelinesPage;
