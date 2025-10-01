import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, toggleTask, deleteTask }) => {
    if (!tasks || tasks.length === 0) {
        return (
            <div>
                No hay tareas para mostrar
            </div>
        );
    }

    return (
        <ul>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    id={task.id}
                    title={task.text}
                    completed={task.completed}
                    priority={task.priority}
                    createdAt={Date.parse(task.createdAt)}
                    onComplete={toggleTask}
                    onDelete={deleteTask}
                />
            ))}
        </ul>
    );
};

export default TaskList;