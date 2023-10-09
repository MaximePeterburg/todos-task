import { all, call, put, takeLatest } from 'typed-redux-saga';
import {
  addTaskToDocument,
  deleteTaskFromDocument,
  getProjectDocument,
  sortTaskInDocument,
  updateTaskStatusInDocument
} from '../../utils/firebase/firebase.utils';
import {
  AddTaskStart,
  DeleteTaskStart,
  FetchProjectStart,
  SortTaskStart,
  UpdateTaskStatusStart,
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

export function* deleteTaskAsync({ payload }: DeleteTaskStart) {
  yield* call(deleteTaskFromDocument, payload);
  console.log('called firebase delete function');
  yield* put(fetchProjectStart(payload.projectId));
}

export function* sortTaskAsync({ payload }: SortTaskStart) {
  yield* call(sortTaskInDocument, payload);
  yield* put(fetchProjectStart(payload.projectId));
}

export function* updateTaskStatusAsync({ payload }: UpdateTaskStatusStart) {
  yield call(updateTaskStatusInDocument, payload);
  yield* put(fetchProjectStart(payload.projectId));
}

export function* onFetchProject() {
  yield* takeLatest(PROJECT_ACTION_TYPES.FETCH_PROJECT_START, fetchProjectAsync);
}

export function* onAddTask() {
  yield* takeLatest(PROJECT_ACTION_TYPES.ADD_TASK_START, addTaskAsync);
}

export function* onDeleteTask() {
  yield* takeLatest(PROJECT_ACTION_TYPES.DELETE_TASK_START, deleteTaskAsync);
}

export function* onSortTask() {
  yield* takeLatest(PROJECT_ACTION_TYPES.SORT_TASK_START, sortTaskAsync);
}

export function* onUpdateTask() {
  yield* takeLatest(PROJECT_ACTION_TYPES.UPDATE_TASK_STATUS_START, updateTaskStatusAsync);
}

export function* projectSaga() {
  yield* all([
    call(onFetchProject),
    call(onAddTask),
    call(onDeleteTask),
    call(onSortTask),
    call(onUpdateTask)
  ]);
}
