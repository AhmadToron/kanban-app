import { Board } from './components/Board';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { useTasks } from './hooks/useTasks';

function App() {
  const { tasks, isLoading, error, addTask, moveTask, removeTask } = useTasks();

  return (
    <>
      <Header />
      <main className="container">
        <TaskForm onAdd={addTask} />

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}

        {isLoading ? (
          <p className="loading" aria-live="polite">
            Laddar uppgifter...
          </p>
        ) : (
          <Board tasks={tasks} onMove={moveTask} onDelete={removeTask} />
        )}
      </main>
    </>
  );
}

export default App;
