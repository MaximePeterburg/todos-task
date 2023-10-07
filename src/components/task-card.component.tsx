import css from 'styled-jsx/macro';
import { TaskItem } from '../store/projects/projects.types';

type TaskCardProps = {
  taskItem: TaskItem;
};

const TaskCard = ({ taskItem }: TaskCardProps) => {
  const { className, styles } = css.resolve`
    div {
      width: 100%;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      border: 1px solid lightgray;
      border-radius: 0.25rem;
    }
  `;
  return (
    <div className={className}>
      {taskItem.title}
      {styles}
    </div>
  );
};

export default TaskCard;
