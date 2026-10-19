import type { BoardColumn, Task, TaskStatus } from '../types/task';
import { TaskCard } from './TaskCard';

interface ColumnProps {
  column: BoardColumn;
  tasks: Task[];
  onMove: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

export function Column({ column, tasks, onMove, onDelete }: ColumnProps) {
  const headingId = `column-${column.status}`;

  return (
    <section className="column" aria-labelledby={headingId}>
      <h2 id={headingId}>
        {column.title} <span className="count">({tasks.length})</span>
      </h2>

      {tasks.length === 0 ? (
        <p className="empty">Inga uppgifter</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskCard task={task} onMove={onMove} onDelete={onDelete} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
