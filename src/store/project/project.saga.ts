import { all, call, put, takeLatest } from 'typed-redux-saga';
import {
  addTaskToDocument,
  getProjectDocument
} from '../../utils/firebase/firebase.utils';
import {
  AddTaskStart,
  FetchProjectStart,
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

export function* onFetchProject() {
  yield* takeLatest(PROJECT_ACTION_TYPES.FETCH_PROJECT_START, fetchProjectAsync);
}

export function* onAddTask() {
  yield* takeLatest(PROJECT_ACTION_TYPES.ADD_TASK_START, addTaskAsync);
}

export function* projectSaga() {
  yield* all([call(onFetchProject), call(onAddTask)]);
}
