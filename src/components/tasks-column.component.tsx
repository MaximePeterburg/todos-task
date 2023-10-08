import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDroppable
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { MouseEventHandler, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
import css from 'styled-jsx/macro';
import { TaskItemsInProject } from '../store/project/project.action';
import { TASK_STATUS, TaskItem } from '../store/projects/projects.types';
import { useStore } from '../store/store';
import { ProjectRouteParams } from './project-container.component';
import TaskCard from './task-card.component';
import TaskForm from './task-form.component';

type TasksColumnProps = {
  taskStatus: TASK_STATUS;
};

const TasksColumn = ({ taskStatus }: TasksColumnProps) => {
  const { projectId } = useParams<keyof ProjectRouteParams>() as ProjectRouteParams;
  const modalRef = useRef<HTMLDialogElement>(null);
  const { tasks, sortTaskStart } = useStore();

  const { isOver, setNodeRef } = useDroppable({
    id: taskStatus
  });
  const style = {
    color: isOver ? 'green' : undefined
  };

  const [activeTask, setActiveTask] = useState<TaskItem | null>(null);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.taskItem);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeTaskId = active.id;
    const overTaskId = over.id;
    if (activeTaskId === overTaskId) return;
    const activeTaskItem = active.data.current?.taskItem;
    const overTaskItem = over.data.current?.taskItem;
    console.log('activeTaskItem', activeTaskItem);
    console.log('overTaskItem', overTaskItem);

    const tasksToSortAndProject: TaskItemsInProject = {
      taskItems: [activeTaskItem, overTaskItem],
      projectId
    };
    sortTaskStart(tasksToSortAndProject);
  };

  const tasksToRender = tasks.filter((task) => task.status === taskStatus);

  const tasksToRenderId = useMemo(
    () => tasksToRender.map((taskToRender) => taskToRender.createdAt.toString()),
    [tasksToRender]
  );

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
    ul {
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
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <ul ref={setNodeRef} className={className} style={style}>
          <SortableContext items={tasksToRenderId}>
            {tasksToRender.map((task) => (
              <TaskCard key={task.createdAt.toString()} taskItem={task} />
            ))}
          </SortableContext>
        </ul>
        {createPortal(
          <DragOverlay>{activeTask && <TaskCard taskItem={activeTask} />}</DragOverlay>,
          document.body
        )}
      </DndContext>
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
