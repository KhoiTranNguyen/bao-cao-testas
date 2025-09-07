import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StudentData, ScoreDistributionAnalysis } from '../types';
import Card from './Card';
import PresentationChartLineIcon from './icons/PresentationChartLineIcon';

interface Props {
    data: StudentData[];
    analysis: ScoreDistributionAnalysis;
    startAnimation?: boolean;
}

const ScoreDistribution: React.FC<Props> = ({ data, analysis, startAnimation = false }) => {
    const paperCount = data.filter(s => s.formatTest === 'Paper').length;
    const digitalCount = data.filter(s => s.formatTest === 'Digital').length;

    return (
        <Card title="Phân bố điểm chi tiết" icon={<PresentationChartLineIcon />} subtitle="Phổ điểm CT Score theo hình thức thi.">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <h3 className="font-bold text-center mb-4 text-slate-700">Hình thức Paper (N={paperCount})</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analysis.paper}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} stroke="#64748b" />
                                <YAxis allowDecimals={false} stroke="#64748b" />
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)', border: '1px solid rgba(200, 200, 200, 0.5)', borderRadius: '10px' }}/>
                                <Bar dataKey="Số lượng" fill="url(#gradient-1)" isAnimationActive={startAnimation} animationDuration={7000} animationEasing="ease-in" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                 <div>
                    <h3 className="font-bold text-center mb-4 text-slate-700">Hình thức Digital (N={digitalCount})</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analysis.digital}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} stroke="#64748b" />
                                <YAxis allowDecimals={false} stroke="#64748b" />
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)', border: '1px solid rgba(200, 200, 200, 0.5)', borderRadius: '10px' }}/>
                                <Bar dataKey="Số lượng" fill="url(#gradient-2)" isAnimationActive={startAnimation} animationDuration={7000} animationEasing="ease-in" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ScoreDistribution;