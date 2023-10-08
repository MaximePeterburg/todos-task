import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher
} from '../../utils/actions/actions.utils';
import { ProjectItem, TaskItem } from '../projects/projects.types';
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

export type SortTaskStart = ActionWithPayload<
  PROJECT_ACTION_TYPES.SORT_TASK_START,
  TaskItemsInProject
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
  (taskItemAddedToProject: TaskItemInProject): AddTaskStart =>
    createAction(PROJECT_ACTION_TYPES.ADD_TASK_START, taskItemAddedToProject)
);

export const sortTaskStart = withMatcher(
  (taskItemsInProject: TaskItemsInProject): SortTaskStart =>
    createAction(PROJECT_ACTION_TYPES.SORT_TASK_START, taskItemsInProject)
);

export const addTaskSuccess = withMatcher(
  (): AddTaskSuccess => createAction(PROJECT_ACTION_TYPES.ADD_TASK_SUCCESS)
);

export const addTaskFailed = withMatcher(
  (error: Error): AddTaskFailed =>
    createAction(PROJECT_ACTION_TYPES.ADD_TASK_FAILED, error)
);
