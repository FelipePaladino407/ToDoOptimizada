import React from "react";

const TaskList = ({ tasks, toggleTask, deleteTask }) => {
    if (!tasks || tasks.length === 0) {
        return (
            <div>
                No hay tareas para mostrar
            </div>
        );
    }


    return (
        <div>
            {tasks.map(task => (
                <div key={task.id}>
                    <div>
                        <span className={task.completed ? 'completed' : ''}>
                            {task.text}
                        </span>
                        <small>
                            prioridad: {task.priority} |
                            Creado: {new Date(task.createdAt).toLocaleDateString()}
                        </small>
                    </div>

                    <div>
                        <button onClick={() => toggleTask(task.id)}>
                            {task.completed ? 'Desmarcar' : 'Completar'}
                        </button>

                        <button onClick={() => deleteTask(task.id)}>
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;