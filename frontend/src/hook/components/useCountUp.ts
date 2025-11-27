import { useEffect, useState } from "react";

export function useCountUp(value: number, duration = 2200) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (value === null || value === undefined || isNaN(value)) {
            setDisplay(0);
            return;
        }

        const end = Number(value);

        // começa de um valor alto (70% do final)
        const start = end * 0.7;

        const diff = end - start;
        const frameDuration = 16.6; // 60fps
        const totalFrames = duration / frameDuration;
        const increment = diff / totalFrames;

        let current = start;

        setDisplay(start);

        const timer = setInterval(() => {
            current += increment;

            if (current >= end) {
                current = end;
                clearInterval(timer);
            }

            setDisplay(current);
        }, frameDuration);

        return () => clearInterval(timer);
    }, [value, duration]);

    return display;
}
