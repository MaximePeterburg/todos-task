import {
  ActionWithPayload,
  createAction,
  withMatcher
} from '../../utils/actions/actions.utils';
import { ProjectItem } from '../projects/projects.types';
import { PROJECT_ACTION_TYPES } from './project.types';

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
