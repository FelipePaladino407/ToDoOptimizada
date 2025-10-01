import React, { useState, useMemo, useCallback } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import { DisplayModeProvider, useDisplayMode } from "./context/DisplayModeContext.jsx";

function AppContent() {
    const { mode, toggleMode } = useDisplayMode();
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

    const toggleTask = useCallback((id) => {
        setTasks(prevTasks =>
            prevTasks.map(task => 
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    }, []);

    const deleteTask = useCallback((id) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }, []);

    return (
        <div>
            <div>
                <h1>To-Do List Optimizada</h1>
                <button onClick={toggleMode}>
                    Modo: {mode === 'compact' ? 'Compacto' : 'Detallado'}
                </button>
            </div>

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

function App() {
    return (
        <DisplayModeProvider>
            <AppContent />
        </DisplayModeProvider>
    );
}

export default App;
