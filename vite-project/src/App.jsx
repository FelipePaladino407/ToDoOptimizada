import { useCallback, useMemo, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import { DisplayModeProvider, useDisplayMode } from "./context/DisplayModeContext.jsx";
import "./App.css";

function Header() {
    const { mode, toggleMode } = useDisplayMode();
    return (
        <header className="header">
            <h1>To-Do List Optimizada</h1>
            <button className="btn" onClick={toggleMode}>
                Vista: {mode === "detailed" ? "Detallada" : "Compacta"} (clic para cambiar)
            </button>
        </header>
    );
}

function AppInner() {
    const [todos, setTodos] = useState([
        { id: 1, text: "Estudiar hooks", completed: false, high: true },
        { id: 2, text: "Hacer los TAs de algoritmos", completed: true, high: false },
    ]);

    const [onlyHigh, setOnlyHigh] = useState(false);

    // useCallback → handlers con referencia estable:
    const addTask = useCallback((text, high) => {
        setTodos(prev => [
            { id: Date.now(), text: text.trim(), completed: false, high: !!high },
            ...prev,
        ]);
    }, []);

    const toggleComplete = useCallback((id) => {
        setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    }, []);

    const removeTask = useCallback((id) => {
        setTodos(prev => prev.filter(t => t.id !== id));
    }, []);

    // useMemo → filtrado y conteo “caribe con k”:
    const filteredTodos = useMemo(() => {
        return onlyHigh ? todos.filter(t => t.high) : todos;
    }, [todos, onlyHigh]);

    const pendingCount = useMemo(() => {
        return todos.reduce((acc, t) => acc + (t.completed ? 0 : 1), 0);
    }, [todos]);

    return (
        <div className="container">
            <Header />
            <div className="toolbar">
                <label className="checkbox">
                    <input
                        type="checkbox"
                        checked={onlyHigh}
                        onChange={(e) => setOnlyHigh(e.target.checked)}
                    />
                    Mostrar solo alta prioridad
                </label>
                <span className="muted">Pendientes: {pendingCount}</span>
            </div>

            <TaskForm onAdd={addTask} />
            <TaskList
                todos={filteredTodos}
                onToggleComplete={toggleComplete}
                onDelete={removeTask}
            />
        </div>
    );
}

export default function App() {
    return (
        <DisplayModeProvider>
            <AppInner />
        </DisplayModeProvider>
    );
}
