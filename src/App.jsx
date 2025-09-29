import { useState, useMemo } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

export default function App() {
    const [tasks, setTasks] = useState([
        { id: 1, text: "Estudiar React", completed: false, priority: "alta", createdAt: new Date().toISOString() },
        { id: 2, text: "Comprar pan", completed: true, priority: "baja", createdAt: new Date().toISOString() },
        { id: 3, text: "Jugar LoL", completed: false, priority: "alta", createdAt: new Date().toISOString() },
    ]);

    const pendingCount = useMemo(
        () => tasks.filter(task => !task.completed).length,
        [tasks]
    );

    const highPriorityTasks = useMemo(
        () => tasks.filter(task => task.priority === "alta"),
        [tasks]
    );

    const addTask = (newTask) => {
        if (!newTask.priority) newTask.priority = "baja";
        setTasks([...tasks, newTask]);
    };

    // Marcar completada/desmarcar
    const toggleTask = (id) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>To-Do List Optimizada</h1>

            <TaskForm onAddTask={addTask} />

            <h3>Tareas pendientes: {pendingCount}</h3>

            <h2>Lista completa</h2>
            <TaskList
                tasks={tasks}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
            />

            <h2>Solo alta prioridad</h2>
            <TaskList
                tasks={highPriorityTasks}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
            />
        </div>
    );
}
