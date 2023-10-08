import { all, call, put, takeLatest } from 'typed-redux-saga';
import {
  addTaskToDocument,
  getProjectDocument,
  sortTaskInDocument
} from '../../utils/firebase/firebase.utils';
import {
  AddTaskStart,
  FetchProjectStart,
  SortTaskStart,
  fetchProjectFailed,
  fetchProjectStart,
  fetchProjectSuccess
} from './project.action';
import { PROJECT_ACTION_TYPES } from './project.types';

export function* fetchProjectAsync({ payload }: FetchProjectStart) {
  try {
    const project = yield* call(getProjectDocument, payload);
    yield* put(fetchProjectSuccess(project));
  } catch (error) {
    yield* put(fetchProjectFailed(error as Error));
  }
}

export function* addTaskAsync({ payload }: AddTaskStart) {
  yield* call(addTaskToDocument, payload);
  yield* put(fetchProjectStart(payload.projectId));
}

export function* sortTaskAsync({ payload }: SortTaskStart) {
  yield* call(sortTaskInDocument, payload);
  yield* put(fetchProjectStart(payload.projectId));
}

export function* onFetchProject() {
  yield* takeLatest(PROJECT_ACTION_TYPES.FETCH_PROJECT_START, fetchProjectAsync);
}

export function* onAddTask() {
  yield* takeLatest(PROJECT_ACTION_TYPES.ADD_TASK_START, addTaskAsync);
}

export function* onSortTask() {
  yield* takeLatest(PROJECT_ACTION_TYPES.SORT_TASK_START, sortTaskAsync);
}

export function* projectSaga() {
  yield* all([call(onFetchProject), call(onAddTask), call(onSortTask)]);
}
