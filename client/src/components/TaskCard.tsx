import type { Task, TaskStatus } from '../types/task';
import { formatDate } from '../utils/formatDate';
import { getNextStatus, getPreviousStatus, getStatusTitle } from '../utils/status';

interface TaskCardProps {
  task: Task;
  onMove: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onMove, onDelete }: TaskCardProps) {
  const previousStatus = getPreviousStatus(task.status);
  const nextStatus = getNextStatus(task.status);

  return (
    <article className="task-card">
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <time dateTime={task.createdAt}>Skapad {formatDate(task.createdAt)}</time>

      <div className="task-actions">
        {previousStatus && (
          <button
            type="button"
            onClick={() => onMove(task.id, previousStatus)}
            aria-label={`Flytta ${task.title} till ${getStatusTitle(previousStatus)}`}
          >
            ←
          </button>
        )}
        {nextStatus && (
          <button
            type="button"
            onClick={() => onMove(task.id, nextStatus)}
            aria-label={`Flytta ${task.title} till ${getStatusTitle(nextStatus)}`}
          >
            →
          </button>
        )}
        <button
          type="button"
          className="delete-button"
          onClick={() => onDelete(task.id)}
          aria-label={`Ta bort ${task.title}`}
        >
          Ta bort
        </button>
      </div>
    </article>
  );
}
