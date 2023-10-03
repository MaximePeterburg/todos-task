import createSagaMiddleware from '@redux-saga/core';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { applyMiddleware, compose, createStore } from 'redux';
import { fetchProjectsStart } from './projects/projects.action';
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

const middleWares = [sagaMiddleware];

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

  return {
    projects,
    projectsIsLoading,
    fetchProjectsStart: () => dispatch(fetchProjectsStart())
  };
};
