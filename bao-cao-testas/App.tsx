import React, { useState, useMemo } from 'react';
import { useStudentData, analyzeData } from './hooks/useStudentData';
import { FilterState } from './types';
import Filters from './components/Filters';
import OverallResults from './components/OverallResults';
import ScholarshipAnalysis from './components/ScholarshipAnalysis';
import ScoreAnalysis from './components/ScoreAnalysis';
import TrainingFormatAnalysis from './components/TrainingFormatAnalysis';
import TimeAnalysis from './components/TimeAnalysis';
import MajorAnalysis from './components/MajorAnalysis';
import SpecialAchievements from './components/SpecialAchievements';
import DemographicsPlaceholder from './components/DemographicsPlaceholder';
import ScoreDistribution from './components/ScoreDistribution';
import CrossAnalysis from './components/CrossAnalysis';
import LearningPaceAnalysis from './components/LearningPaceAnalysis';
import MarketingInsights from './components/MarketingInsights';
import AnimatedHeader from './components/AnimatedHeader';
import AnimatedSection from './components/AnimatedSection';


const App: React.FC = () => {
    const { allStudents, loading, error } = useStudentData();
    const [filters, setFilters] = useState<FilterState>({
        outcome: 'All',
        formatTest: 'All',
        classGroup: 'All',
    });
    const [headerAnimationComplete, setHeaderAnimationComplete] = useState(false);


    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    const filteredStudents = useMemo(() => {
        if (!allStudents) return [];
        return allStudents.filter(student => {
            const outcomeMatch = filters.outcome === 'All' || student.outcome === filters.outcome;
            const formatTestMatch = filters.formatTest === 'All' || student.formatTest === filters.formatTest;
            const classGroupMatch = filters.classGroup === 'All' || student.classGroup === filters.classGroup;
            return outcomeMatch && formatTestMatch && classGroupMatch;
        });
    }, [allStudents, filters]);

    const analysis = useMemo(() => {
        if (!filteredStudents) return null;
        return analyzeData(filteredStudents);
    }, [filteredStudents]);


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-2xl font-semibold text-slate-700">Đang tải và phân tích dữ liệu...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-100">
                <div className="text-2xl font-semibold text-red-700">Lỗi: {error}</div>
            </div>
        );
    }

    if (!allStudents || !analysis) {
        return (
             <div className="flex items-center justify-center min-h-screen">
                <div className="text-2xl font-semibold text-slate-700">Đang chuẩn bị dữ liệu...</div>
            </div>
        );
    }
    
    const noResults = filteredStudents.length === 0 && allStudents.length > 0;

    const components = noResults 
        ? []
        : [
            <OverallResults data={filteredStudents} analysis={analysis.overall} />,
            <ScholarshipAnalysis data={filteredStudents} analysis={analysis.scholarship} />,
            <ScoreAnalysis data={filteredStudents} analysis={analysis.score} />,
            <TrainingFormatAnalysis data={filteredStudents} analysis={analysis.trainingFormat} />,
            <TimeAnalysis data={filteredStudents} analysis={analysis.time} />,
            <MajorAnalysis data={filteredStudents} analysis={analysis.major} />,
            <SpecialAchievements data={filteredStudents} analysis={analysis.achievements} />,
            <DemographicsPlaceholder />,
            <ScoreDistribution data={filteredStudents} analysis={analysis.scoreDistribution} />,
            <CrossAnalysis data={filteredStudents} analysis={analysis.cross} />,
            <LearningPaceAnalysis data={filteredStudents} analysis={analysis.learningPace} />,
            <MarketingInsights analysis={analysis.overall} achievements={analysis.achievements} />,
        ];

    return (
        <div className="relative isolate min-h-screen font-sans">
            <svg width="0" height="0" className="absolute">
                <defs>
                    <linearGradient id="gradient-1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF8C00" />
                        <stop offset="100%" stopColor="#FFA500" />
                    </linearGradient>
                    <linearGradient id="gradient-2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFA500" />
                        <stop offset="100%" stopColor="#FBBF24" />
                    </linearGradient>
                    <linearGradient id="gradient-3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F97316" />
                        <stop offset="100%" stopColor="#FF8C00" />
                    </linearGradient>
                </defs>
            </svg>

             <main className="container mx-auto px-4 py-8 md:py-16">
                <div className="flex flex-col items-center text-center mb-12 md:mb-16">
                    <AnimatedHeader 
                        title="Báo cáo Phân tích Kết quả Thi TestAS"
                        onAnimationEnd={() => setHeaderAnimationComplete(true)}
                    />
                </div>
                
                <div className={`space-y-8 transition-opacity duration-500 ${headerAnimationComplete ? 'opacity-100' : 'opacity-0'}`}>
                    <AnimatedSection>
                         <Filters onFilterChange={handleFilterChange} />
                    </AnimatedSection>

                    {noResults ? (
                        <AnimatedSection>
                            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-8 text-center text-slate-700 border border-slate-200">
                                <h3 className="text-2xl font-bold mb-2">Không tìm thấy kết quả</h3>
                                <p>Vui lòng thử thay đổi các tùy chọn trong bộ lọc.</p>
                            </div>
                        </AnimatedSection>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {components.map((component, index) => (
                                <AnimatedSection key={index}>
                                    {component}
                                </AnimatedSection>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;