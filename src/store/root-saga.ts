import { all, call } from 'typed-redux-saga';
import { projectsSaga } from './projects/projects.saga';

export function* rootSaga() {
  yield* all([call(projectsSaga)]);
}
