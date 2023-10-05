import { all, call } from 'typed-redux-saga';
import { projectSaga } from './project/project.saga';
import { projectsSaga } from './projects/projects.saga';

export function* rootSaga() {
  yield* all([call(projectsSaga), call(projectSaga)]);
}
