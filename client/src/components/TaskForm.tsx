import { useState, type FormEvent } from 'react';
import type { NewTask } from '../types/task';

interface TaskFormProps {
  onAdd: (task: NewTask) => Promise<void>;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    await onAdd({ title: title.trim(), description: description.trim() });
    setIsSubmitting(false);
    setTitle('');
    setDescription('');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Ny uppgift</h2>
      <div className="form-field">
        <label htmlFor="task-title">Titel</label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="task-description">Beskrivning</label>
        <textarea
          id="task-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={2}
        />
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Lägger till...' : 'Lägg till'}
      </button>
    </form>
  );
}
