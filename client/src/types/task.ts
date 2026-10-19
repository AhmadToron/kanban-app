export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}

export interface NewTask {
  title: string;
  description: string;
}

export interface BoardColumn {
  status: TaskStatus;
  title: string;
}
