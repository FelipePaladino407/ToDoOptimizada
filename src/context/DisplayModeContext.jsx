import { createContext, useContext, useMemo, useState, useCallback } from "react";


const DisplayModeContext = createContext({ mode: "detailed", toggleMode: () => {} });


export function DisplayModeProvider({ children }) {
    const [mode, setMode] = useState("detailed");
    const toggleMode = useCallback(() => setMode((m) => (m === "detailed" ? "compact" : "detailed")), []);


    const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);
    return <DisplayModeContext.Provider value={value}>{children}</DisplayModeContext.Provider>;
}


export function useDisplayMode() {
    return useContext(DisplayModeContext);
}