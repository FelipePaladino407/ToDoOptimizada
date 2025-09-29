import React, { useState } from "react";

const TaskForm = ({ onAddTask }) => {
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('baja');

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
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Escribir nueva tarea..."
                    style={{ padding: '8px', flex: 1 }}
                />
                <select 
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value)}
                    style={{ padding: '8px' }}
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