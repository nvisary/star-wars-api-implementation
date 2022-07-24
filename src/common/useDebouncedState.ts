import { useEffect, useState } from "react";

export const useDebouncedState = <T>(state: T, delay: number): T => {
    const [debouncedState, setDebouncedState] = useState(state);

    useEffect(() => {
        const t = setTimeout(() => {
            setDebouncedState(state);
        }, delay);

        return () => {
            clearTimeout(t);
        };
    }, [state, delay]);

    return debouncedState;
};