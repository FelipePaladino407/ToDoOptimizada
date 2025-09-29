import React from "react";
import { useState } from "react";

const TaskForm = ({ onAddTask }) => {
    const [task, setTask] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim()) {
            onAddTask({
                id: Date.now(),
                text: task.trim(),
                completed: false,
                createdAt: new Date().toISOString()
            });
            setTask('')
        }
    };

    const handleChange = (e) => {
        setTask(e.target.value);
    };

    return(
        <form onSubmit={handleSubmit} className="task-form">
            <div className="form-group">
                <input
                    type="text"
                    value={task}
                    onChange={handleChange}
                    placeholder="Escribir tarea"
                    className="task-input"
                    maxLength={200}
                />
                <button
                    type="submit"
                    className="add-button"
                    disabled={!task.trim()}
                >
                    Agregar Tarea
                </button>
            </div>
        </form>
    );
};  

export default TaskForm;