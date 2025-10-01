import React, { useEffect, useRef, useState } from "react";

const TaskForm = ({ onAddTask }) => {
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('baja');
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim()) {
            onAddTask({
                id: Date.now(),
                text: task.trim(),
                completed: false,
                priority: priority,
                createdAt: new Date().toISOString()
            });
            setTask('');
            setPriority('baja');
            setTimeout(() => inputRef.current?.focus(), 0);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    ref={inputRef}
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Escribir nueva tarea..."
                />
                <select 
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="baja">Baja</option>
                    <option value="alta">Alta</option>
                </select>
                <button
                    type="submit"
                    disabled={!task.trim()}
                >
                    Agregar
                </button>
            </div>
        </form>
    );
};

export default TaskForm;