import React from "react";
import PropTypes from "prop-types";
import { useDisplayMode } from "../context/DisplayModeContext.jsx";

function TaskItemBase({ id, title, completed, priority, createdAt, onComplete, onDelete }) {
    const { mode } = useDisplayMode();

    return (
        <li
            className={`task-item ${completed ? "completed" : ""} ${priority}-priority`}
        >
            <div className="task-left">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => onComplete(id)}
                />
                <div className="task-info">
                    <span className="task-title">{title}</span>
                    {mode === "detailed" && (
                        <span className="task-details">
              Prioridad: {priority.toUpperCase()} • Creada:{" "}
                            {new Date(createdAt).toLocaleString()}
            </span>
                    )}
                </div>
            </div>

            <button className="btn-delete" onClick={() => onDelete(id)}>
                Eliminar
            </button>
        </li>
    );
}

TaskItemBase.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    priority: PropTypes.oneOf(["low", "medium", "high"]).isRequired,
    createdAt: PropTypes.number.isRequired,
    onComplete: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

const TaskItem = React.memo(TaskItemBase);
export default TaskItem;
