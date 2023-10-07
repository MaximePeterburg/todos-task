import { MouseEventHandler, useRef } from 'react';
import css from 'styled-jsx/macro';
import { TASK_STATUS } from '../store/projects/projects.types';
import { useStore } from '../store/store';
import TaskCard from './task-card.component';
import TaskForm from './task-form.component';

type TasksColumnProps = {
  taskStatus: TASK_STATUS;
};

const TasksColumn = ({ taskStatus }: TasksColumnProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { tasks } = useStore();
  const tasksToRender = tasks.filter((task) => task.status === taskStatus);

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
    section {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    div {
      min-width: 15rem;
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
  return (
    <section className={className}>
      <header>
        <h3>{taskStatus}</h3>
      </header>
      <div className={className}>
        {tasksToRender.map((task) => (
          <TaskCard key={task.createdAt.toString()} taskItem={task} />
        ))}
      </div>
      <button className={className} onClick={handleButtonClick}>
        + Добавить
      </button>
      <dialog className={className} ref={modalRef} onClick={handleBackdropClick}>
        <TaskForm taskStatus={taskStatus} />
      </dialog>
      {styles}
    </section>
  );
};

export default TasksColumn;
