import { Route, Routes } from 'react-router-dom';
import ProjectChoice from '../components/project-choice.component';
import Project from './project';

const Home = () => {
  return (
    <Routes>
      <Route index element={<ProjectChoice />}></Route>
      <Route path=':project-id' element={<Project />} />
    </Routes>
  );
};

export default Home;
