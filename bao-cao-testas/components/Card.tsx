import React, { ReactNode } from 'react';

interface CardProps {
    title: string;
    icon: ReactNode;
    children: ReactNode;
    subtitle?: string;
}

const Card: React.FC<CardProps> = ({ title, icon, children, subtitle }) => {
    return (
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-6 md:p-8 transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-brand-amber/20 hover:scale-[1.03] hover:-translate-y-2 border border-slate-200/80">
            <div className="flex items-center mb-4">
                <div className="text-brand-orange mr-4">
                    {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'h-8 w-8' })}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
                    {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
                </div>
            </div>
            <div className="mt-6">
                {children}
            </div>
        </div>
    );
};

export default Card;