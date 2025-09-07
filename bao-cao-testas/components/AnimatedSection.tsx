import React, { useState, useEffect, useRef, ReactElement } from 'react';

interface AnimatedSectionProps {
    children: ReactElement; // Yêu cầu children là một React Element duy nhất để có thể clone
    className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                rootMargin: '0px',
                threshold: 0.1, // Kích hoạt khi 10% của element hiển thị
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`${className || ''} transition-opacity duration-1000 ${isVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}
        >
            {/* Truyền prop startAnimation xuống cho child component khi nó hiển thị */}
            {/* FIX: Cast `children` to a type that accepts `startAnimation` to resolve the TypeScript error. This is safe as child components will ignore props they don't use. */}
            {React.cloneElement(children as React.ReactElement<{ startAnimation?: boolean }>, { startAnimation: isVisible })}
        </div>
    );
};

export default AnimatedSection;
