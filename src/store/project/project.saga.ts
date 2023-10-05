import { all, call, put, takeLatest } from 'typed-redux-saga';
import { getProjectDocument } from '../../utils/firebase/firebase.utils';
import {
  FetchProjectStart,
  fetchProjectFailed,
  fetchProjectSuccess
} from './project.action';
import { PROJECT_ACTION_TYPES } from './project.types';

export function* fetchProjectAsync({ payload }: FetchProjectStart) {
  try {
    const product = yield* call(getProjectDocument, payload);
    yield* put(fetchProjectSuccess(product));
  } catch (error) {
    yield* put(fetchProjectFailed(error as Error));
  }
}
export function* onFetchProject() {
  yield* takeLatest(PROJECT_ACTION_TYPES.FETCH_PROJECT_START, fetchProjectAsync);
}
export function* projectSaga() {
  yield* all([call(onFetchProject)]);
}
