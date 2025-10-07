import { createContext, useContext, useMemo, useState } from "react";

const DisplayModeContext = createContext({
    mode: "detailed",          // "compact" | "detailed"
    toggleMode: () => {},
});

export function DisplayModeProvider({ children }) {
    const [mode, setMode] = useState("detailed");
    const toggleMode = () => setMode(m => (m === "detailed" ? "compact" : "detailed"));
    const value = useMemo(() => ({ mode, toggleMode }), [mode]);
    return <DisplayModeContext.Provider value={value}>{children}</DisplayModeContext.Provider>;
}

export function useDisplayMode() {
    return useContext(DisplayModeContext);
}
