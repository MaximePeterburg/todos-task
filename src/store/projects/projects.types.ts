export enum PROJECTS_ACTION_TYPES {
  FETCH_PROJECTS_START = 'projects/FETCH_PROJECTS_START',
  FETCH_PROJECTS_SUCCESS = 'projects/FETCH_PROJECTS_SUCCESS',
  FETCH_PROJECTS_FAILED = 'projects/FETCH_PROJECTS_FAILED'
}

export enum PRIORITY_LEVELS {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export enum TASK_STATUS {
  QUEUE = 'Queue',
  DEVELOPMENT = 'Development',
  DONE = 'Done'
}

export type ProjectItem = {
  title: string;
  description: string;
};

export type SubtaskItem = {
  id: string;
  status: boolean;
  subTask: string;
  taskItemId: number;
};

export type CommentaryItem = {
  id: string;
  userId: string;
  createdAt: Date;
  parentId: string;
  text: string;
};

export type TaskItem = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  spentTime: string;
  finishedAt: Date;
  priority: PRIORITY_LEVELS;
  addedFiles: string;
  status: TASK_STATUS;
  subtasks: SubtaskItem;
  commentaries: CommentaryItem[];
};
