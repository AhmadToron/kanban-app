import { useEffect, useState } from 'react';
import type { NewTask, Task, TaskStatus } from '../types/task';
import * as api from '../services/api';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    api
      .fetchTasks()
      .then((data) => {
        if (!ignore) setTasks(data);
      })
      .catch(() => {
        if (!ignore) setError('Kunde inte hämta uppgifterna. Är servern igång?');
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    // Förhindrar att state uppdateras om komponenten hunnit avmonteras
    return () => {
      ignore = true;
    };
  }, []);

  async function addTask(newTask: NewTask) {
    try {
      const createdTask = await api.createTask(newTask);
      setTasks((prev) => [...prev, createdTask]);
      setError(null);
    } catch {
      setError('Kunde inte skapa uppgiften.');
    }
  }

  async function moveTask(id: string, status: TaskStatus) {
    try {
      const updatedTask = await api.updateTaskStatus(id, status);
      setTasks((prev) => prev.map((task) => (task.id === id ? updatedTask : task)));
      setError(null);
    } catch {
      setError('Kunde inte flytta uppgiften.');
    }
  }

  async function removeTask(id: string) {
    try {
      await api.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setError(null);
    } catch {
      setError('Kunde inte ta bort uppgiften.');
    }
  }

  return { tasks, isLoading, error, addTask, moveTask, removeTask };
}
