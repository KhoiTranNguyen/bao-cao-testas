import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StudentData, OverallAnalysis, PieChartData } from '../types';
import Card from './Card';
import AnimatedCounter from './AnimatedCounter';
import AcademicCapIcon from './icons/AcademicCapIcon';

interface Props {
    data: StudentData[];
    analysis: OverallAnalysis;
    startAnimation?: boolean; // Prop mới để nhận tín hiệu bắt đầu hoạt ảnh
}

const KpiCard: React.FC<{ title: string; value: number; suffix: string; decimals?: number }> = ({ title, value, suffix, decimals = 0 }) => (
    <div className="bg-white/50 rounded-lg p-4 text-center border border-slate-200/80">
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber">
            <AnimatedCounter end={value} decimals={decimals} suffix={suffix} />
        </p>
    </div>
);

const OverallResults: React.FC<Props> = ({ analysis, startAnimation = false }) => {
    const passFailColors = {
        'Đậu': 'url(#gradient-1)',
        'Rớt': '#9ca3af', // gray-400
    };

    return (
        <Card title="Kết quả tổng thể" icon={<AcademicCapIcon />} subtitle={`Dựa trên phân tích ${analysis.totalStudents} lượt thi.`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="grid grid-cols-2 gap-4">
                    <KpiCard title="Tổng số học viên" value={analysis.totalStudents} suffix="" />
                    <KpiCard title="Tỷ lệ đậu" value={analysis.passRate} suffix="%" decimals={1} />
                    <KpiCard title="Điểm CT TB" value={analysis.avgCtScore} suffix="" decimals={1} />
                    <KpiCard title="Điểm Module TB" value={analysis.avgModuleScore} suffix="" decimals={1} />
                </div>
                <div className="h-64">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={analysis.passFailData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={90}
                                innerRadius={50}
                                dataKey="value"
                                isAnimationActive={startAnimation} // Điều khiển hoạt ảnh
                                animationDuration={2000}
                            >
                                {analysis.passFailData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={passFailColors[entry.name as keyof typeof passFailColors]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => [value, 'Số lượng']} contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)', border: '1px solid rgba(200, 200, 200, 0.5)', borderRadius: '10px' }}/>
                            <Legend wrapperStyle={{color: '#475569'}}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Card>
    );
};

export default OverallResults;