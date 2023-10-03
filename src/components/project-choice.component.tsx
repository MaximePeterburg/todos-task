import { useEffect } from 'react';
import css from 'styled-jsx/macro';
// import { PROJECTS_DATA } from '../projects-data';
import { useStore } from '../store/store';
import {
  addCollectionAndDocuments,
  getProjectsAndDocuments
} from '../utils/firebase/firebase.utils';
import ProjectCard from './project-card.component';

const ProjectChoice = () => {
  // useEffect(() => {
  //   addCollectionAndDocuments('projects', PROJECTS_DATA);
  // }, []);
  const { fetchProjectsStart, projects, projectsIsLoading } = useStore();
  useEffect(() => {
    fetchProjectsStart();
  }, []);
  const { className, styles } = css.resolve`
    main {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 2rem;
    }
    ul {
      display: flex;
      gap: 1rem;
    }
  `;
  return (
    <main className={className}>
      <h1 className={className}>Проекты</h1>
      {projectsIsLoading ? (
        'Загрузка...'
      ) : (
        <ul className={className}>
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </ul>
      )}
      {styles}
    </main>
  );
};

export default ProjectChoice;
