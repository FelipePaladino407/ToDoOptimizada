import { useEffect, useRef, useState } from "react";

export default function TaskForm({ onAdd }) {
    const [text, setText] = useState("");
    const [high, setHigh] = useState(false);
    const inputRef = useRef(null);

    // useRef + focus al montar y tras agregar el semejanete infame este:
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = text.trim();
        if (!trimmed) return;
        onAdd(trimmed, high);
        setText("");
        setHigh(false);

        inputRef.current?.focus();
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Nueva tarea..."
                maxLength={200}
            />
            <label className="checkbox">
                <input
                    type="checkbox"
                    checked={high}
                    onChange={(e) => setHigh(e.target.checked)}
                />
                Alta prioridad
            </label>
            <button className="btn" type="submit" disabled={!text.trim()}>
                Agregar
            </button>
        </form>
    );
}
