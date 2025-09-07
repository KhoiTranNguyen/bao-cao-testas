import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { StudentData, TrainingFormatAnalysis as TrainingFormatAnalysisType } from '../types';
import Card from './Card';
import UsersIcon from './icons/UsersIcon';

interface Props {
    data: StudentData[];
    analysis: TrainingFormatAnalysisType;
    startAnimation?: boolean;
}

const TrainingFormatAnalysis: React.FC<Props> = ({ data, analysis, startAnimation = false }) => {
    
    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        const value1 = payload[0].value.toFixed(1);
        const value2 = payload[1].value.toFixed(1);
        const suffix = label === 'Tỷ lệ đậu (%)' ? '%' : ' điểm';
        return (
          <div className="bg-white/80 backdrop-blur-sm p-3 border border-slate-200/80 rounded-lg shadow-lg">
            <p className="font-bold text-slate-700">{label}</p>
            <p className="text-brand-orange font-semibold">{`Kèm 1-1: ${value1}${suffix}`}</p>
            <p className="text-amber-500 font-semibold">{`Nhóm: ${value2}${suffix}`}</p>
          </div>
        );
      }
      return null;
    };
    
    return (
        <Card title="Chỉ số theo hình thức đào tạo" icon={<UsersIcon />} subtitle={`So sánh hiệu quả giữa lớp "Kèm 1-1" và "Nhóm" (N=${data.length}).`}>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analysis.comparisonData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis tickFormatter={(value) => `${value.toFixed(0)}`} stroke="#64748b" />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(251, 191, 36, 0.1)' }}/>
                        <Legend wrapperStyle={{color: '#475569'}}/>
                        <Bar dataKey="kèm 1-1" name="Kèm 1-1" fill="url(#gradient-1)" isAnimationActive={startAnimation} animationDuration={7000} animationEasing="ease-in" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Nhóm" fill="url(#gradient-2)" isAnimationActive={startAnimation} animationDuration={7000} animationEasing="ease-in" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default TrainingFormatAnalysis;