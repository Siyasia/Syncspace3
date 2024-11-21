import { useEffect, useState } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from "../amplify/backend/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [tasks, setTasks] = useState<Array<Schema["Task"]["type"]>>([]);
  const { signOut } = useAuthenticator();

  useEffect(() => {
    client.models.Task.observeQuery().subscribe({
      next: (data) => setTasks([...data.items]),
    });
  }, []);

  function createTask() {
    const content = window.prompt("Task content:");
    if (content) client.models.Task.create({ content });
  }

  function deleteTask(id: string) {
    client.models.Task.delete({ id });
  }

  return (
    <main>
      <h1>Welcome to SyncSpace</h1>
      <button onClick={createTask}>+ New Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} onClick={() => deleteTask(task.id)}>
            {task.content}
          </li>
        ))}
      </ul>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;

