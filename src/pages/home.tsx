import { Link, Route, Routes } from 'react-router-dom';
import css from 'styled-jsx/macro';
import ProjectChoice from '../components/project-choice.component';
import Project from './project';

const Home = () => {
  const { className, styles } = css.resolve`
    div {
      display: flex;
      justify-content: center;
      padding: 2rem;
      font-weight: 600;
    }
  `;
  return (
    <>
      <div className={className}>
        <Link to='/'> 🏚️ На Главную</Link>
        {styles}
      </div>
      <Routes>
        <Route index element={<ProjectChoice />}></Route>
        <Route path=':projectId' element={<Project />} />
      </Routes>
    </>
  );
};

export default Home;
