import type { Task, TaskStatus } from '../types/task';
import { COLUMNS } from '../utils/status';
import { Column } from './Column';

interface BoardProps {
  tasks: Task[];
  onMove: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

export function Board({ tasks, onMove, onDelete }: BoardProps) {
  return (
    <div className="board">
      {COLUMNS.map((column) => (
        <Column
          key={column.status}
          column={column}
          tasks={tasks.filter((task) => task.status === column.status)}
          onMove={onMove}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
