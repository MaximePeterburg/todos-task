import { all, call, put, takeLatest } from 'typed-redux-saga';
import { getProjectsAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchProjectsFailed, fetchProjectsSuccess } from './projects.action';
import { PROJECTS_ACTION_TYPES } from './projects.types';

export function* fetchProjectsAsync() {
  try {
    const projects = yield* call(getProjectsAndDocuments);
    yield* put(fetchProjectsSuccess(projects));
  } catch (error) {
    yield* put(fetchProjectsFailed(error as Error));
  }
}

export function* onFetchProjects() {
  yield* takeLatest(PROJECTS_ACTION_TYPES.FETCH_PROJECTS_START, fetchProjectsAsync);
}

export function* projectsSaga() {
  yield* all([call(onFetchProjects)]);
}
