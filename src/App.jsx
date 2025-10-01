import React, { useState, useMemo } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

function App() {
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
        setTasks([...tasks, newTask]);
    };

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
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
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

export default App;
