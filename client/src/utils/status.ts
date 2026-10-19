import type { BoardColumn, TaskStatus } from '../types/task';

export const COLUMNS: BoardColumn[] = [
  { status: 'todo', title: 'Att göra' },
  { status: 'in-progress', title: 'Pågående' },
  { status: 'done', title: 'Klart' },
];

export function getStatusTitle(status: TaskStatus): string {
  return COLUMNS.find((column) => column.status === status)?.title ?? status;
}

export function getNextStatus(status: TaskStatus): TaskStatus | null {
  const index = COLUMNS.findIndex((column) => column.status === status);
  return COLUMNS[index + 1]?.status ?? null;
}

export function getPreviousStatus(status: TaskStatus): TaskStatus | null {
  const index = COLUMNS.findIndex((column) => column.status === status);
  return index > 0 ? COLUMNS[index - 1].status : null;
}
