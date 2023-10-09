import createSagaMiddleware from '@redux-saga/core';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Middleware, applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import {
  TaskItemInProject,
  TaskItemsInProject,
  addTaskStart,
  deleteTaskStart,
  fetchProjectStart,
  sortTaskStart,
  updateTaskStatusStart
} from './project/project.action';
import { fetchProjectsStart } from './projects/projects.action';
import { TASK_STATUS } from './projects/projects.types';
import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const sagaMiddleware = createSagaMiddleware();

const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, composedEnhancers);
sagaMiddleware.run(rootSaga);

const useTypedDispatch: () => AppDispatch = useDispatch;

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useStore = () => {
  const dispatch = useTypedDispatch();

  const projects = useTypedSelector((state: RootState) => state.projects.projects);
  const projectsIsLoading = useTypedSelector(
    (state: RootState) => state.projects.isLoading
  );

  const project = useTypedSelector((state: RootState) => state.project.project);
  const projectIsLoading = useTypedSelector(
    (state: RootState) => state.project.isLoading
  );
  const tasks = useTypedSelector((state: RootState) => state.project.project.tasks);

  return {
    projects,
    projectsIsLoading,
    fetchProjectsStart: () => dispatch(fetchProjectsStart()),

    project,
    projectIsLoading,
    tasks,

    fetchProjectStart: (title: string) => dispatch(fetchProjectStart(title)),

    addTaskStart: (taskAddedToProject: TaskItemInProject) =>
      dispatch(addTaskStart(taskAddedToProject)),

    deleteTaskStart: (taskItemInProject: TaskItemInProject) =>
      dispatch(deleteTaskStart(taskItemInProject)),

    sortTaskStart: (taskItemsInProject: TaskItemsInProject) =>
      dispatch(sortTaskStart(taskItemsInProject)),

    updateTaskStatusStart: (
      taskItemWithNewStatusInProject: TaskItemInProject & { status: TASK_STATUS }
    ) => dispatch(updateTaskStatusStart(taskItemWithNewStatusInProject))
  };
};
