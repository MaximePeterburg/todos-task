import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import css from 'styled-jsx/macro';
import { TaskItem } from '../store/projects/projects.types';

type TaskCardProps = {
  taskItem: TaskItem;
};

const TaskCard = ({ taskItem }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: taskItem.createdAt.toString(),
      data: {
        type: 'Task',
        taskItem
      }
    });
  const style = { transition, transform: CSS.Transform.toString(transform) };

  const { className, styles } = css.resolve`
    li {
      width: 100%;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      border: 1px solid #ffa500;
      border-radius: 0.25rem;
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
      {styles}
    </li>
  );
};

export default TaskCard;
