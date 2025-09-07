import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts';
import { StudentData, LearningPaceAnalysis as LearningPaceAnalysisType } from '../types';
import Card from './Card';
import ClockIcon from './icons/ClockIcon';

interface Props {
    data: StudentData[];
    analysis: LearningPaceAnalysisType;
    startAnimation?: boolean;
}

const LearningPaceAnalysis: React.FC<Props> = ({ data, analysis, startAnimation = false }) => {
    return (
        <Card title="Tốc độ học & Hiệu suất" icon={<ClockIcon />} subtitle={`So sánh hiệu suất giữa các nhóm thời gian chuẩn bị (N=${data.length}).`}>
            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={analysis.byPace} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis yAxisId="left" orientation="left" stroke="#FF8C00" label={{ value: 'Điểm TB', angle: -90, position: 'insideLeft', fill: '#c2410c' }} />
                        <YAxis yAxisId="right" orientation="right" stroke="#b45309" domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} label={{ value: 'Tỷ lệ đậu', angle: 90, position: 'insideRight', fill: '#b45309' }} />
                        <Tooltip formatter={(value: number, name: string) => [`${value.toFixed(1)}${name.includes('Tỷ lệ') ? '%' : ''}`, name]} contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)', border: '1px solid rgba(200, 200, 200, 0.5)', borderRadius: '10px' }}/>
                        <Legend wrapperStyle={{color: '#475569'}}/>
                        <Bar yAxisId="left" dataKey="Điểm CT TB" fill="url(#gradient-2)" isAnimationActive={startAnimation} animationDuration={7000} radius={[4, 4, 0, 0]} />
                        <Line yAxisId="right" type="monotone" dataKey="Tỷ lệ đậu" stroke="#FF8C00" strokeWidth={3} isAnimationActive={startAnimation} animationDuration={2000} dot={{ r: 5 }} activeDot={{ r: 8 }}/>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default LearningPaceAnalysis;