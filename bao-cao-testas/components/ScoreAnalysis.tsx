import React from 'react';
import { StudentData, ScoreAnalysis } from '../types';
import Card from './Card';
import ChartBarIcon from './icons/ChartBarIcon';

interface Props {
    data: StudentData[];
    analysis: ScoreAnalysis;
}

const ScoreAnalysis: React.FC<Props> = ({ data, analysis }) => {
    return (
        <Card title="Phân tích điểm thi" icon={<ChartBarIcon />} subtitle={`Điểm trung bình và các học viên xuất sắc nhất (N=${data.length}).`}>
            <div className="bg-white/50 border border-slate-200/80 rounded-lg p-6">
                <h3 className="text-xl font-bold text-brand-orange mb-4">🏆 Top 5 học viên có điểm CT Score cao nhất</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-slate-500">
                            <tr>
                                <th className="p-3 font-semibold">Họ và tên</th>
                                <th className="p-3 font-semibold">CT Score</th>
                                <th className="p-3 font-semibold">Module Score</th>
                                <th className="p-3 font-semibold">Ngành học</th>
                            </tr>
                        </thead>
                        <tbody>
                            {analysis.top5CtScores.map((student) => (
                                <tr key={student.id} className="border-t border-slate-200 hover:bg-amber-50/50 transition-colors duration-200">
                                    <td className="p-3 font-medium text-slate-700">{student.fullName}</td>
                                    <td className="p-3 font-bold text-lg text-brand-orange">{student.ctScore}</td>
                                    <td className="p-3 text-slate-600">{student.moduleScore}</td>
                                    <td className="p-3 text-slate-600">{student.major}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    );
};

export default ScoreAnalysis;