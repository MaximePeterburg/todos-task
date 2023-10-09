import { DragOverlay } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MouseEventHandler, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import css from 'styled-jsx/macro';
import { TASK_STATUS, TaskItem } from '../store/projects/projects.types';
import { useStore } from '../store/store';
import TaskCard from './task-card.component';
import TaskForm from './task-form.component';

type TasksColumnProps = {
  taskStatus: TASK_STATUS;
  activeTask: TaskItem | null;
};

const TasksColumn = ({ taskStatus, activeTask }: TasksColumnProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { tasks } = useStore();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: taskStatus,
      data: {
        type: 'Column',
        taskStatus
      }
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  const tasksToRender = tasks.filter((task) => task.status === taskStatus);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const handleButtonClick = () => {
    modalRef.current?.showModal();
  };

  const handleBackdropClick: MouseEventHandler<HTMLDialogElement> = (e) => {
    if (modalRef.current) {
      const modalDimensions = modalRef.current.getBoundingClientRect();
      if (
        e.clientX < modalDimensions.left ||
        e.clientX > modalDimensions.right ||
        e.clientY < modalDimensions.top ||
        e.clientY > modalDimensions.bottom
      ) {
        modalRef.current.close();
      }
    }
  };

  const { className, styles } = css.resolve`
    li {
      display: flex;
      flex-direction: column;
      background-color: white;
      gap: 0.5rem;
      min-width: 15rem;
      border: 1px solid black;
      padding: 1rem;
      border-radius: 0.25rem;
      height: 20rem;
    }
    div {
      border: 1px solid lightgray;
      padding: 1rem;
      border-radius: 0.25rem;
      height: 20rem;
      min-width: 15rem;
    }
    ul {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    button {
      width: 100%;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      display: flex;
    }
    button:hover {
      background: linear-gradient(135deg, #ffd700, #ffa500, #ff6347, #ff4500);
    }
    dialog {
      position: absolute;
      top: 20%;
      left: 35%;
    }
  `;

  if (isDragging) {
    return (
      <div className={className}>
        <br />
      </div>
    );
  }
  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={className}>
      <header>
        <h3>{taskStatus}</h3>
      </header>

      <ul className={className}>
        <SortableContext items={tasksIds}>
          {tasksToRender.map((task) => (
            <TaskCard key={task.createdAt.toString()} taskItem={task} />
          ))}
        </SortableContext>
      </ul>
      {createPortal(
        <DragOverlay>{activeTask && <TaskCard taskItem={activeTask} />}</DragOverlay>,
        document.body
      )}
      <button className={className} onClick={handleButtonClick}>
        + Добавить
      </button>
      <dialog className={className} ref={modalRef} onClick={handleBackdropClick}>
        <TaskForm taskStatus={taskStatus} />
      </dialog>
      {styles}
    </li>
  );
};

export default TasksColumn;
