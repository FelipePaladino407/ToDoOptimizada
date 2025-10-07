import { memo, useMemo } from "react";
import { useDisplayMode } from "../context/DisplayModeContext.jsx";

function TaskItemBase({ task, onToggleComplete, onDelete }) {
    const { mode } = useDisplayMode();

    const className = useMemo(() => {
        const base = "task-item";
        const done = task.completed ? " done" : "";
        const priority = task.high ? " high" : "";
        const density = mode === "compact" ? " compact" : " detailed";
        return base + done + priority + density;
    }, [task.completed, task.high, mode]);

    return (
        <li className={className}>
            <label className="checkbox">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleComplete(task.id)}
                />
                <span className="text">{task.text}</span>
            </label>

            <div className="actions">
                {task.high && <span className="badge">Alta</span>}
                <button className="btn secondary" onClick={() => onDelete(task.id)}>
                    Eliminar
                </button>
            </div>
        </li>
    );
}

// React.memo → re-renderiza solo si cambian sus props (task, handlers)
const TaskItem = memo(TaskItemBase);
export default TaskItem;
