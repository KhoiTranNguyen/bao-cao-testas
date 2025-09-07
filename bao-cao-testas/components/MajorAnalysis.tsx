import React, { useState, useMemo } from 'react';
import { StudentData, MajorData } from '../types';
import Card from './Card';
import BookOpenIcon from './icons/BookOpenIcon';

interface Props {
    data: StudentData[];
    analysis: MajorData[];
}

type SortKey = keyof MajorData;

const MajorAnalysis: React.FC<Props> = ({ data, analysis }) => {
    const [sortKey, setSortKey] = useState<SortKey>('students');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const sortedData = useMemo(() => {
        const sorted = [...analysis].sort((a, b) => {
            if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
            if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [analysis, sortKey, sortOrder]);

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('desc');
        }
    };
    
    const findMaxValues = useMemo(() => ({
        students: Math.max(...analysis.map(item => item.students)),
        passRate: Math.max(...analysis.map(item => item.passRate)),
        avgCtScore: Math.max(...analysis.map(item => item.avgCtScore)),
        avgModuleScore: Math.max(...analysis.map(item => item.avgModuleScore)),
    }), [analysis]);

    const SortableHeader: React.FC<{ headerKey: SortKey, title: string }> = ({ headerKey, title }) => (
        <th className="p-4 cursor-pointer hover:bg-slate-200/80 transition-colors duration-200 text-left font-semibold" onClick={() => handleSort(headerKey)}>
            {title} {sortKey === headerKey && (sortOrder === 'desc' ? '▼' : '▲')}
        </th>
    );

    return (
        <Card title="Chỉ số theo ngành học" icon={<BookOpenIcon />} subtitle={`Hiệu suất theo từng ngành (N=${data.length}). Click vào tiêu đề cột để sắp xếp.`}>
             <div className="overflow-x-auto">
                <table className="w-full text-left table-auto">
                    <thead className="bg-slate-100/80 text-slate-600 uppercase text-sm">
                        <tr>
                            <SortableHeader headerKey="name" title="Ngành học" />
                            <SortableHeader headerKey="students" title="Số lượng" />
                            <SortableHeader headerKey="passRate" title="Tỷ lệ đậu" />
                            <SortableHeader headerKey="avgCtScore" title="Điểm CT TB" />
                            <SortableHeader headerKey="avgModuleScore" title="Điểm Module TB" />
                        </tr>
                    </thead>
                    <tbody className="text-slate-700">
                        {sortedData.map((major) => (
                            <tr key={major.name} className="border-b border-slate-200 last:border-0 hover:bg-amber-50/50 transition-colors duration-200">
                                <td className="p-4 font-medium">{major.name}</td>
                                <td className={`p-4 ${major.students === findMaxValues.students ? 'font-bold text-brand-orange' : ''}`}>{major.students}</td>
                                <td className={`p-4 ${major.passRate === findMaxValues.passRate ? 'font-bold text-brand-orange' : ''}`}>{major.passRate.toFixed(1)}%</td>
                                <td className={`p-4 ${major.avgCtScore === findMaxValues.avgCtScore ? 'font-bold text-brand-orange' : ''}`}>{major.avgCtScore.toFixed(1)}</td>
                                <td className={`p-4 ${major.avgModuleScore === findMaxValues.avgModuleScore ? 'font-bold text-brand-orange' : ''}`}>{major.avgModuleScore.toFixed(1)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default MajorAnalysis;