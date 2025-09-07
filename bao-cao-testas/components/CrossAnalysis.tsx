import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StudentData, CrossAnalysis as CrossAnalysisType } from '../types';
import Card from './Card';
import ChartBarIcon from './icons/ChartBarIcon';

interface Props {
    data: StudentData[];
    analysis: CrossAnalysisType;
    startAnimation?: boolean;
}

const CrossAnalysis: React.FC<Props> = ({ data, analysis, startAnimation = false }) => {
    return (
        <Card title="Phân tích chéo" icon={<ChartBarIcon />} subtitle={`Tỷ lệ đậu theo Hình thức thi & Lớp học (N=${data.length}).`}>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analysis.passRateByFormatAndGroup} layout="vertical" margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis type="number" domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} stroke="#64748b" />
                        <YAxis type="category" dataKey="name" width={120} stroke="#64748b" />
                        <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, 'Tỷ lệ đậu']} contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)', border: '1px solid rgba(200, 200, 200, 0.5)', borderRadius: '10px' }}/>
                        <Bar dataKey="Tỷ lệ đậu" fill="url(#gradient-1)" isAnimationActive={startAnimation} animationDuration={7000} animationEasing="ease-in" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default CrossAnalysis;