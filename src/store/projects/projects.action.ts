import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher
} from '../../utils/actions/actions.utils';
import { PROJECTS_ACTION_TYPES, ProjectItem } from './projects.types';

export type FetchProjectsStart = Action<PROJECTS_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchProjectsSuccess = ActionWithPayload<
  PROJECTS_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  ProjectItem[]
>;

export type FetchProjectsFailed = ActionWithPayload<
  PROJECTS_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
  Error
>;

export const fetchProjectsStart = withMatcher(
  (): FetchProjectsStart => createAction(PROJECTS_ACTION_TYPES.FETCH_CATEGORIES_START)
);

export const fetchProjectsSuccess = withMatcher(
  (projectItems: ProjectItem[]): FetchProjectsSuccess =>
    createAction(PROJECTS_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, projectItems)
);

export const fetchProjectsFailed = withMatcher(
  (error: Error): FetchProjectsFailed =>
    createAction(PROJECTS_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
);
