import React from 'react';
import { StudentData, AchievementAnalysis } from '../types';
import Card from './Card';
import SparklesIcon from './icons/SparklesIcon';

interface Props {
    data: StudentData[];
    analysis: AchievementAnalysis;
}

const AchievementItem: React.FC<{ title: string; value: string; name?: string }> = ({ title, value, name }) => (
    <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-slate-200/80">
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-brand-orange">{value}</p>
        {name && <p className="text-xs text-slate-400">bởi {name}</p>}
    </div>
);

const SpecialAchievements: React.FC<Props> = ({ analysis }) => {
    return (
        <Card title="Thành tích đặc biệt" icon={<SparklesIcon />} subtitle="Ghi nhận những nỗ lực và kết quả vượt trội.">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {analysis.highestCtScore && (
                    <AchievementItem 
                        title="Điểm CT Score cao nhất" 
                        value={analysis.highestCtScore.ctScore.toString()}
                        name={analysis.highestCtScore.fullName}
                    />
                )}
                 {analysis.highestModuleScore && (
                    <AchievementItem 
                        title="Điểm Module Score cao nhất" 
                        value={analysis.highestModuleScore.moduleScore.toString()}
                        name={analysis.highestModuleScore.fullName}
                    />
                )}
                <AchievementItem 
                    title="Học bổng 100%" 
                    value={`${analysis.total100Scholarships} suất`}
                />
                <AchievementItem 
                    title="Điểm CT > 130 (Digital)" 
                    value={`${analysis.digitalHighScorers} học viên`}
                />
            </div>
        </Card>
    );
};

export default SpecialAchievements;