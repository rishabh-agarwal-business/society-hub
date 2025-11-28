import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const readValue = (): T => {
        if (typeof window === "undefined") return initialValue;

        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState<T>(readValue);

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const newValue = value instanceof Function ? value(storedValue) : value;
            setStoredValue(newValue);

            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(newValue));
            }
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    };

    useEffect(() => {
        const handleStorage = () => {
            setStoredValue(readValue());
        };

        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    return [storedValue, setValue] as const;
}
