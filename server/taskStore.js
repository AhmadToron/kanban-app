import { readFile, writeFile } from 'node:fs/promises';

const DATA_FILE = new URL('./data/tasks.json', import.meta.url);

export async function readTasks() {
  const content = await readFile(DATA_FILE, 'utf-8');
  return JSON.parse(content);
}

export async function writeTasks(tasks) {
  await writeFile(DATA_FILE, JSON.stringify(tasks, null, 2));
}
