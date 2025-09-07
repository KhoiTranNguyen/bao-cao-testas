import React, { useEffect } from 'react';

const AnimatedHeader: React.FC<{ title: string; onAnimationEnd: () => void; }> = ({ title, onAnimationEnd }) => {
    const characters = title.split('');
    const animationDurationPerChar = 60; // ms
    const totalDuration = characters.length * animationDurationPerChar + 500; // Add buffer

    useEffect(() => {
        const timer = setTimeout(onAnimationEnd, totalDuration);
        return () => clearTimeout(timer);
    }, [onAnimationEnd, totalDuration]);

    return (
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber tracking-tight">
            {characters.map((char, index) => (
                <span
                    key={index}
                    className="opacity-0 animate-focus-in"
                    style={{ animationFillMode: 'forwards', animationDelay: `${index * animationDurationPerChar}ms` }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </h1>
    );
};

export default AnimatedHeader;