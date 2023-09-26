import { useNavigate } from 'react-router-dom';
import css from 'styled-jsx/macro';

export type ProjectCardProps = {
  project: {
    title: string;
    description: string;
  };
};
const ProjectCard = ({ project: { title, description } }: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(title);
  };

  const { className, styles } = css.resolve`
    li {
      padding: 0.5rem;
      border-radius: 0.75rem;
      width: 10rem;
      height: 6rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: linear-gradient(135deg, #ffd700, #ffa500, #ff6347);
    }
    :hover {
      cursor: pointer;
    }
  `;

  return (
    <li className={className} onClick={handleClick}>
      <h2 className={className}>{title}</h2>
      <p className={className}>{description}</p>
      {styles}
    </li>
  );
};

export default ProjectCard;
