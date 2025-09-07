import React, { useState, useEffect, useCallback } from 'react';
import { FilterState } from '../types';
import Card from './Card';
import UsersIcon from './icons/UsersIcon';

interface FiltersProps {
    onFilterChange: (filters: FilterState) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
    const [filters, setFilters] = useState<FilterState>({
        outcome: 'All',
        formatTest: 'All',
        classGroup: 'All',
    });

    const stableOnFilterChange = useCallback(onFilterChange, []);

    useEffect(() => {
        stableOnFilterChange(filters);
    }, [filters, stableOnFilterChange]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value as any }));
    };

    return (
        <Card title="Bộ lọc dữ liệu" icon={<UsersIcon />} subtitle="Lọc dữ liệu để xem các báo cáo chi tiết hơn.">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label htmlFor="outcome" className="block text-sm font-medium text-slate-600 mb-1">Chương trình</label>
                    <select
                        id="outcome"
                        name="outcome"
                        value={filters.outcome}
                        onChange={handleChange}
                        className="w-full p-2.5 bg-white/80 border border-slate-300 rounded-md shadow-sm focus:ring-brand-orange focus:border-brand-orange transition duration-150 ease-in-out text-slate-800"
                    >
                        <option value="All">Tất cả</option>
                        <option value="VGU">VGU</option>
                        <option value="Du học Đức">Du học Đức</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="formatTest" className="block text-sm font-medium text-slate-600 mb-1">Hình thức thi</label>
                    <select
                        id="formatTest"
                        name="formatTest"
                        value={filters.formatTest}
                        onChange={handleChange}
                        className="w-full p-2.5 bg-white/80 border border-slate-300 rounded-md shadow-sm focus:ring-brand-orange focus:border-brand-orange transition duration-150 ease-in-out text-slate-800"
                    >
                        <option value="All">Tất cả</option>
                        <option value="Paper">Paper</option>
                        <option value="Digital">Digital</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="classGroup" className="block text-sm font-medium text-slate-600 mb-1">Hình thức lớp</label>
                    <select
                        id="classGroup"
                        name="classGroup"
                        value={filters.classGroup}
                        onChange={handleChange}
                        className="w-full p-2.5 bg-white/80 border border-slate-300 rounded-md shadow-sm focus:ring-brand-orange focus:border-brand-orange transition duration-150 ease-in-out text-slate-800"
                    >
                        <option value="All">Tất cả</option>
                        <option value="kèm 1-1">Kèm 1-1</option>
                        <option value="Nhóm">Nhóm</option>
                    </select>
                </div>
            </div>
        </Card>
    );
};

export default Filters;