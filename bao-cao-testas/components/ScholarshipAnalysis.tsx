import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StudentData, ScholarshipAnalysis as ScholarshipAnalysisType } from '../types';
import Card from './Card';
import TrophyIcon from './icons/TrophyIcon';
import AnimatedCounter from './AnimatedCounter';

interface Props {
    data: StudentData[];
    analysis: ScholarshipAnalysisType;
    startAnimation?: boolean; // Prop mới để nhận tín hiệu bắt đầu hoạt ảnh
}

const ScholarshipAnalysis: React.FC<Props> = ({ analysis, startAnimation = false }) => {

    return (
        <Card title="Phân tích học bổng" icon={<TrophyIcon />} subtitle="So sánh tỷ lệ học bổng giữa các chương trình.">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2 h-80">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analysis.byOutcome} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="name" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)', border: '1px solid rgba(200, 200, 200, 0.5)', borderRadius: '10px' }}/>
                            <Legend wrapperStyle={{color: '#475569'}}/>
                            <Bar dataKey="100%" fill="url(#gradient-1)" isAnimationActive={startAnimation} animationDuration={7000} animationEasing="ease-in" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="≤ 50%" fill="url(#gradient-2)" isAnimationActive={startAnimation} animationDuration={7000} animationEasing="ease-in" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="≤ 25%" fill="url(#gradient-3)" isAnimationActive={startAnimation} animationDuration={7000} animationEasing="ease-in" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex flex-col items-center justify-center bg-white/50 p-6 rounded-lg border border-slate-200/80 text-center">
                    <p className="text-lg font-semibold text-slate-600">Tổng số suất</p>
                    <p className="text-2xl font-bold text-amber-600 mb-2">Học bổng 100%</p>
                    <p className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600">
                        <AnimatedCounter end={analysis.total100} />
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default ScholarshipAnalysis;