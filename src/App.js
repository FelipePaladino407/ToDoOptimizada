import React, { useState } from 'react';
import './App.css';
import TaskForm from './components/taskForm';

function App() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lista de Tareas</h1>
        <TaskForm onAddTask={handleAddTask} />

        <div className="tasks-list">
          {tasks.map(task => (
            <div key={task.id} className="task-item">
              <span>{task.text}</span>
              <small>{new Date(task.createdAt).toLocaleString()}</small>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
