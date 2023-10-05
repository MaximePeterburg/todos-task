import { combineReducers } from 'redux';
import { projectReducer } from './project/project.reducer';
import { projectsReducer } from './projects/projects.reducer';

export const rootReducer = combineReducers({
  projects: projectsReducer,
  project: projectReducer
});
