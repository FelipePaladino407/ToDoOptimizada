import TaskItem from "./TaskItem.jsx";

export default function TaskList({ todos, onToggleComplete, onDelete }) {
    if (!todos.length) {
        return <p className="muted">No hay tareas que mostrar.</p>;
    }
    return (
        <ul className="task-list">
            {todos.map((t) => (
                <TaskItem
                    key={t.id}
                    task={t}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}
