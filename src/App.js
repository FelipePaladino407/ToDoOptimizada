reto1
import { useState, useMemo } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

export default function App() {
    const [tasks, setTasks] = useState([
    { id: 1, text: "Estudiar React", completed: false, priority: "alta" },
    { id: 2, text: "Comprar pan", completed: true, priority: "baja" },
    { id: 3, text: "Jugar LoL", completed: false, priority: "alta" },
  ]);

    const pendingCount = useMemo(() => {
      return tasks.filter((task) => !task.completed).length; }, [tasks]);

    const HighPriority = useMemo(() => {
      return tasks.filter((task) => task.priority === "alta")
    }, [tasks]);

    const addTask = (text, priority) => {
      const newTask = {
        id: Date.now(),
        text,
        completed: false,
        priority,
      };
      setTask([...tasks, newTask]);
    };

    const deleteTask = (id) => {
      setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
      <div>
        <h1> list</h1>
        <TaskForm onAddTask={handleAddTask} />

        <div className="tasks-list">
          {tasks.map(task => (
            <div key={task.id} className="task-item">
              <span>{task.text}</span>
              <small>{new Date(task.createdAt).toLocaleString()}</small>
            </div>


        <h3>Tareas pendientes {pendingCount}</h3>
        <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
        <h2>Solo alta prioridad</h2>
        <TaskList
          tasks={highPriorityTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />


      </div>
    )
export default App
}
