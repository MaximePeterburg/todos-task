import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
import css from 'styled-jsx/macro';
import { TaskItemInProject, TaskItemsInProject } from '../store/project/project.action';
import {
  TASK_STATUS,
  TASK_STATUS_DATA,
  TaskItem
} from '../store/projects/projects.types';
import { useStore } from '../store/store';
import TasksColumn from './tasks-column.component';

export type ProjectRouteParams = {
  projectId: string;
};

const ProjectContainer = () => {
  const {
    fetchProjectStart,
    project: { title, description },
    projectIsLoading
  } = useStore();

  const { projectId } = useParams<keyof ProjectRouteParams>() as ProjectRouteParams;

  const { sortTaskStart, updateTaskStatusStart, project } = useStore();

  const [activeTask, setActiveTask] = useState<TaskItem | null>(null);

  const [activeColumn, setActiveColumn] = useState<TASK_STATUS | null>(null);

  const columnIds = useMemo(
    () => TASK_STATUS_DATA.map((taskStatus) => taskStatus),
    [project.tasks]
  );

  useEffect(() => {
    fetchProjectStart(projectId);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3
      }
    })
  );

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.taskItem);
      return;
    }
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.taskStatus);
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

    const tasksToSortAndProject = {
      taskItems: [activeTaskItem, overTaskItem],
      projectId
    };
    sortTaskStart(tasksToSortAndProject);
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeTaskId = active.id;
    const overTaskId = over.id;

    if (activeTaskId === overTaskId) return;

    const isActiveATask = active.data.current?.type === 'Task';

    const isOverAColumn = over.data.current?.type === 'Column';

    if (isActiveATask && isOverAColumn) {
      const activeTaskItem = active.data.current?.taskItem;
      const overStatus = over.data.current?.taskStatus;

      const taskItemWithNewStatusInProject = {
        taskItem: activeTaskItem,
        status: overStatus,
        projectId
      };

      updateTaskStatusStart(taskItemWithNewStatusInProject);
    }
  };

  const { className, styles } = css.resolve`
    header {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: linear-gradient(135deg, #ffd700, #ffa500, #ff6347);
    }
    h1 {
      padding: 2rem;
    }
    h2 {
      padding: 1rem;
    }
    ul {
      width: 45rem;
      padding: 2rem;
      margin: 4rem auto 0 auto;
      border-top: 1px solid gray;
      justify-content: center;
      display: flex;
      gap: 1rem;
    }
    div {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  `;
  return (
    <>
      {projectIsLoading ? (
        'Загрузка...'
      ) : (
        <div className={className}>
          <header className={className}>
            <h1 className={className}>{title}</h1>
            <h2 className={className}>{description}</h2>
            {styles}
          </header>

          <main>
            <DndContext
              sensors={sensors}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onDragOver={onDragOver}>
              <SortableContext items={TASK_STATUS_DATA}>
                <ul className={className}>
                  {TASK_STATUS_DATA.map((taskStatus) => (
                    <TasksColumn
                      key={taskStatus}
                      activeTask={activeTask}
                      taskStatus={taskStatus}
                    />
                  ))}
                </ul>
                {createPortal(
                  <DragOverlay>
                    {activeColumn && (
                      <TasksColumn taskStatus={activeColumn} activeTask={activeTask} />
                    )}
                  </DragOverlay>,
                  document.body
                )}
              </SortableContext>
            </DndContext>
          </main>
        </div>
      )}
    </>
  );
};

export default ProjectContainer;
