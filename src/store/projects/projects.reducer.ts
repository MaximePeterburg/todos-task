import { AnyAction } from 'redux';
import { Project } from '../../utils/firebase/firebase.utils';
import {
  fetchProjectsFailed,
  fetchProjectsStart,
  fetchProjectsSuccess
} from './projects.action';

export type ProjectsState = {
  readonly projects: Project[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const PROJECTS_INITIAL_STATE: ProjectsState = {
  projects: [],
  isLoading: false,
  error: null
};

export const projectsReducer = (
  state = PROJECTS_INITIAL_STATE,
  action: AnyAction
): ProjectsState => {
  if (fetchProjectsStart.match(action)) {
    return { ...state, isLoading: true };
  }
  if (fetchProjectsSuccess.match(action)) {
    return { ...state, isLoading: false, projects: action.payload };
  }
  if (fetchProjectsFailed.match(action)) {
    return { ...state, isLoading: false, error: action.payload };
  }
  return state;
};
