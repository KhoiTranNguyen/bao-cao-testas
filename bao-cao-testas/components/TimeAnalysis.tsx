import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { StudentData, TimeAnalysis as TimeAnalysisType } from '../types';
import Card from './Card';
import ClockIcon from './icons/ClockIcon';

interface Props {
    data: StudentData[];
    analysis: TimeAnalysisType;
    startAnimation?: boolean;
}

const TimeAnalysis: React.FC<Props> = ({ data, analysis, startAnimation = false }) => {
    return (
        <Card title="Chỉ số theo thời gian" icon={<ClockIcon />} subtitle={`Phân tích tỷ lệ đậu theo tháng thi (N=${data.length}).`}>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analysis.passRateByMonth} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                         <defs>
                            <linearGradient id="timeAnalysisGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF8C00" stopOpacity={0.6}/>
                            <stop offset="95%" stopColor="#FFA500" stopOpacity={0.1}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b"/>
                        <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} stroke="#64748b" />
                        <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, 'Tỷ lệ đậu']} contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)', border: '1px solid rgba(200, 200, 200, 0.5)', borderRadius: '10px' }}/>
                        <Legend wrapperStyle={{color: '#475569'}}/>
                        <Area type="monotone" dataKey="Tỷ lệ đậu" stroke="#FF8C00" strokeWidth={3} fillOpacity={1} fill="url(#timeAnalysisGradient)" activeDot={{ r: 8, filter: 'drop-shadow(0 0 5px #FF8C00)' }} isAnimationActive={startAnimation} animationDuration={2000} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default TimeAnalysis;