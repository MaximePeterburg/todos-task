import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher
} from '../../utils/actions/actions.utils';
import { ProjectItem, TASK_STATUS, TaskItem } from '../projects/projects.types';
import { PROJECT_ACTION_TYPES } from './project.types';

export type TaskItemInProject = {
  taskItem: TaskItem;
  projectId: string;
};
export type TaskItemsInProject = {
  taskItems: TaskItem[];
  projectId: string;
};

export type FetchProjectStart = ActionWithPayload<
  PROJECT_ACTION_TYPES.FETCH_PROJECT_START,
  string
>;

export type FetchProjectSuccess = ActionWithPayload<
  PROJECT_ACTION_TYPES.FETCH_PROJECT_SUCCESS,
  ProjectItem
>;

export type FetchProjectFailed = ActionWithPayload<
  PROJECT_ACTION_TYPES.FETCH_PROJECT_FAILED,
  Error
>;

export type AddTaskStart = ActionWithPayload<
  PROJECT_ACTION_TYPES.ADD_TASK_START,
  TaskItemInProject
>;

export type DeleteTaskStart = ActionWithPayload<
  PROJECT_ACTION_TYPES.DELETE_TASK_START,
  TaskItemInProject
>;

export type SortTaskStart = ActionWithPayload<
  PROJECT_ACTION_TYPES.SORT_TASK_START,
  TaskItemsInProject
>;

export type UpdateTaskStatusStart = ActionWithPayload<
  PROJECT_ACTION_TYPES.UPDATE_TASK_STATUS_START,
  TaskItemInProject & { status: TASK_STATUS }
>;

export type AddTaskSuccess = Action<PROJECT_ACTION_TYPES.ADD_TASK_SUCCESS>;

export type AddTaskFailed = ActionWithPayload<
  PROJECT_ACTION_TYPES.ADD_TASK_FAILED,
  Error
>;

export const fetchProjectStart = withMatcher(
  (title: string): FetchProjectStart =>
    createAction(PROJECT_ACTION_TYPES.FETCH_PROJECT_START, title)
);

export const fetchProjectSuccess = withMatcher(
  (projectItem: ProjectItem): FetchProjectSuccess =>
    createAction(PROJECT_ACTION_TYPES.FETCH_PROJECT_SUCCESS, projectItem)
);

export const fetchProjectFailed = withMatcher(
  (error: Error): FetchProjectFailed =>
    createAction(PROJECT_ACTION_TYPES.FETCH_PROJECT_FAILED, error)
);

export const addTaskStart = withMatcher(
  (taskItemInProject: TaskItemInProject): AddTaskStart =>
    createAction(PROJECT_ACTION_TYPES.ADD_TASK_START, taskItemInProject)
);

export const deleteTaskStart = withMatcher(
  (taskItemInProject: TaskItemInProject): DeleteTaskStart =>
    createAction(PROJECT_ACTION_TYPES.DELETE_TASK_START, taskItemInProject)
);

export const sortTaskStart = withMatcher(
  (taskItemsInProject: TaskItemsInProject): SortTaskStart =>
    createAction(PROJECT_ACTION_TYPES.SORT_TASK_START, taskItemsInProject)
);

export const updateTaskStatusStart = withMatcher(
  (
    taskItemWithNewStatusInProject: TaskItemInProject & { status: TASK_STATUS }
  ): UpdateTaskStatusStart =>
    createAction(
      PROJECT_ACTION_TYPES.UPDATE_TASK_STATUS_START,
      taskItemWithNewStatusInProject
    )
);

export const addTaskSuccess = withMatcher(
  (): AddTaskSuccess => createAction(PROJECT_ACTION_TYPES.ADD_TASK_SUCCESS)
);

export const addTaskFailed = withMatcher(
  (error: Error): AddTaskFailed =>
    createAction(PROJECT_ACTION_TYPES.ADD_TASK_FAILED, error)
);
