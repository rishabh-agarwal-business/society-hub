import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    // localStorage state
    const [mode, setMode] = useLocalStorage<boolean>("theme", false);

    // theme state (source of truth)
    const [isDarkMode, setIsDarkMode] = useState<boolean>(mode);

    // toggle theme
    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    const setDarkMode = (value: boolean) => {
        setIsDarkMode(value);
    };

    // keep localStorage synced
    useEffect(() => {
        setMode(isDarkMode);
    }, [isDarkMode]);

    // update HTML class
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, setDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;

// Custom hook to use theme context
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be usd within Theme Provider');
    }
    return context;
}
