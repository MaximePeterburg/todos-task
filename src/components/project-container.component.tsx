import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store/store';
type ProjectRouteParams = {
  projectId: string;
};
const ProjectContainer = () => {
  const { projectId } = useParams<keyof ProjectRouteParams>() as ProjectRouteParams;

  useEffect(() => {
    fetchProjectStart(projectId);
  }, []);

  const {
    fetchProjectStart,
    project: { title, description },
    projectIsLoading
  } = useStore();

  return (
    <>
      {projectIsLoading ? (
        'Загрузка...'
      ) : (
        <header>
          <h1>{title}</h1>
          <h2>{description}</h2>
        </header>
      )}
    </>
  );
};

export default ProjectContainer;
