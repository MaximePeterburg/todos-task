import { DndContext } from '@dnd-kit/core';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from 'styled-jsx/macro';
import { TASK_STATUS } from '../store/projects/projects.types';
import { useStore } from '../store/store';
import TasksColumn from './tasks-column.component';

type ProjectRouteParams = {
  projectId: string;
};

const ProjectContainer = () => {
  const {
    fetchProjectStart,
    project: { title, description },
    projectIsLoading
  } = useStore();

  const { projectId } = useParams<keyof ProjectRouteParams>() as ProjectRouteParams;

  useEffect(() => {
    fetchProjectStart(projectId);
  }, []);

  const { className, styles } = css.resolve`
    header {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: linear-gradient(135deg, #ffd700, #ffa500, #ff6347);
    }
    h1 {
      padding: 2rem;
    }
    h2 {
      padding: 1rem;
    }
    main {
      display: flex;
      justify-content: center;
      width: 45rem;
      margin: 4rem auto 0 auto;
      border-top: 1px solid gray;
      gap: 1rem;
      padding: 2rem;
    }
    div {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  `;
  return (
    <>
      {projectIsLoading ? (
        'Загрузка...'
      ) : (
        <div className={className}>
          <header className={className}>
            <h1 className={className}>{title}</h1>
            <h2 className={className}>{description}</h2>
            {styles}
          </header>

          <main className={className}>
            <DndContext>
              <TasksColumn taskStatus={TASK_STATUS.QUEUE} />
              <TasksColumn taskStatus={TASK_STATUS.DEVELOPMENT} />
              <TasksColumn taskStatus={TASK_STATUS.DONE} />
            </DndContext>
          </main>
        </div>
      )}
    </>
  );
};

export default ProjectContainer;
