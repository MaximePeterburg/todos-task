import css from 'styled-jsx/macro';

const ProjectChoice = () => {
  const { className, styles } = css.resolve`
    main {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
    }
  `;
  return (
    <main className={className}>
      <h1 className={className}>Проекты</h1>
      {styles}
    </main>
  );
};

export default ProjectChoice;
