
import React, { useState, useEffect } from 'react';

interface AnimatedCounterProps {
    end: number;
    duration?: number;
    decimals?: number;
    suffix?: string;
    className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, duration = 1500, decimals = 0, suffix = '', className }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const endValue = end;
        if (start === endValue) return;

        let startTime: number | null = null;

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const current = start + progress * (endValue - start);
            setCount(parseFloat(current.toFixed(decimals)));
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [end, duration, decimals]);

    return (
        <span className={className}>
            {count.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
            {suffix}
        </span>
    );
};

export default AnimatedCounter;
