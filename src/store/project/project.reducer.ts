import { AnyAction } from 'redux';
import { ProjectItem } from '../projects/projects.types';
import {
  fetchProjectFailed,
  fetchProjectStart,
  fetchProjectSuccess
} from './project.action';

export type ProjectState = {
  readonly project: ProjectItem;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const PROJECT_INITIAL_STATE: ProjectState = {
  project: { title: '', description: '', tasks: [] },
  isLoading: false,
  error: null
};

export const projectReducer = (
  state = PROJECT_INITIAL_STATE,
  action: AnyAction
): ProjectState => {
  if (fetchProjectStart.match(action)) {
    return { ...state, isLoading: true };
  }
  if (fetchProjectSuccess.match(action)) {
    return { ...state, isLoading: false, project: action.payload };
  }
  if (fetchProjectFailed.match(action)) {
    return { ...state, isLoading: false, error: action.payload };
  }
  return state;
};
