import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useParams } from 'react-router-dom';
import css from 'styled-jsx/macro';
import { TaskItem } from '../store/projects/projects.types';
import { useStore } from '../store/store';
import { ProjectRouteParams } from './project-container.component';

type TaskCardProps = {
  taskItem: TaskItem;
};

const TaskCard = ({ taskItem }: TaskCardProps) => {
  const { projectId } = useParams<keyof ProjectRouteParams>() as ProjectRouteParams;
  const { deleteTaskStart } = useStore();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: taskItem.createdAt.toString(),
      data: {
        type: 'Task',
        taskItem
      }
    });
  const style = { transition, transform: CSS.Transform.toString(transform) };

  const handleDelete = () => {
    deleteTaskStart({ projectId, taskItem });
  };

  const { className, styles } = css.resolve`
    li {
      display:flex;
      justify-content: space-between;
      width: 100%;
      border: 1px solid #E0E8F0;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      border-radius: 0.25rem;
      background-color:#E0E8F0
    }
    li:hover{
      border: 1px solid #ffa500;

    }
    span:hover{
      cursor:pointer;
    }

    div {
      width: 100%;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      border: 1px solid lightgray;
      border-radius: 0.25rem;
      opacity: 0.6:
    }
  `;

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={className}>
        <br />
      </div>
    );
  }
  return (
    <li
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={className}>
      {taskItem.title}
      <span onClick={handleDelete} className={className}>
        🗑️
      </span>
      {styles}
    </li>
  );
};

export default TaskCard;
