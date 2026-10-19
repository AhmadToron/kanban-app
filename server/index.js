import express from 'express';
import cors from 'cors';
import { randomUUID } from 'node:crypto';
import { readTasks, writeTasks } from './taskStore.js';

const app = express();
const PORT = process.env.PORT || 3001;
const VALID_STATUSES = ['todo', 'in-progress', 'done'];

app.use(cors());
app.use(express.json());

app.get('/api/tasks', async (req, res) => {
  const tasks = await readTasks();
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const { title, description = '' } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: 'Titel saknas' });
  }

  const newTask = {
    id: randomUUID(),
    title: title.trim(),
    description: description.trim(),
    status: 'todo',
    createdAt: new Date().toISOString(),
  };

  const tasks = await readTasks();
  tasks.push(newTask);
  await writeTasks(tasks);

  res.status(201).json(newTask);
});

app.patch('/api/tasks/:id', async (req, res) => {
  const { status } = req.body;

  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ message: 'Ogiltig status' });
  }

  const tasks = await readTasks();
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Uppgiften hittades inte' });
  }

  task.status = status;
  await writeTasks(tasks);

  res.json(task);
});

app.delete('/api/tasks/:id', async (req, res) => {
  const tasks = await readTasks();
  const remainingTasks = tasks.filter((t) => t.id !== req.params.id);

  if (remainingTasks.length === tasks.length) {
    return res.status(404).json({ message: 'Uppgiften hittades inte' });
  }

  await writeTasks(remainingTasks);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
