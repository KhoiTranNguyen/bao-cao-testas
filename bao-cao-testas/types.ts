export interface StudentData {
    id: number;
    fullName: string;
    gradeLevel: string;
    outcome: 'VGU' | 'Du học Đức';
    formatTest: 'Paper' | 'Digital';
    classGroup: 'kèm 1-1' | 'Nhóm';
    ctScore: number;
    moduleScore: number;
    examResult: 'pass' | 'fail';
    scholarshipStatus: '100%' | '≤ 50%' | '≤ 25%' | 'Không';
    admissionDate: Date;
    examDate: Date;
    major: string;
    note?: string;
    prepDays: number;
    monthExam: string;
    passFlag: 0 | 1;
    hasScholarship100: 0 | 1;
    hasScholarship50: 0 | 1;
    hasScholarship25: 0 | 1;
}

export type PieChartData = { name: string; value: number; fill: string; };
export type BarChartData = { name: string; [key: string]: number | string; };
export type LineChartData = { name: string; [key: string]: number | string; };

export interface OverallAnalysis {
    totalStudents: number;
    passRate: number;
    avgCtScore: number;
    avgModuleScore: number;
    passFailData: PieChartData[];
}

export interface ScholarshipAnalysis {
    total100: number;
    byOutcome: BarChartData[];
}

export interface ScoreAnalysis {
    top5CtScores: StudentData[];
    avgScores: BarChartData[];
}

export interface TrainingFormatAnalysis {
    comparisonData: BarChartData[];
}

export interface TimeAnalysis {
    passRateByMonth: LineChartData[];
}

export interface MajorData extends BarChartData {
    passRate: number;
    avgCtScore: number;
    avgModuleScore: number;
    students: number;
}

export interface ScoreDistributionAnalysis {
    paper: BarChartData[];
    digital: BarChartData[];
}

export interface CrossAnalysis {
    passRateByFormatAndGroup: BarChartData[];
}

export interface LearningPaceAnalysis {
    byPace: BarChartData[];
}

export interface AchievementAnalysis {
    highestCtScore: StudentData | null;
    highestModuleScore: StudentData | null;
    total100Scholarships: number;
    digitalHighScorers: number;
    // FIX: Add digitalTotal to provide necessary data for MarketingInsights component.
    digitalTotal: number;
}


export interface AnalysisResults {
    overall: OverallAnalysis;
    scholarship: ScholarshipAnalysis;
    score: ScoreAnalysis;
    trainingFormat: TrainingFormatAnalysis;
    time: TimeAnalysis;
    major: MajorData[];
    achievements: AchievementAnalysis;
    scoreDistribution: ScoreDistributionAnalysis;
    cross: CrossAnalysis;
    learningPace: LearningPaceAnalysis;
}

export interface FilterState {
    outcome: 'All' | 'VGU' | 'Du học Đức';
    formatTest: 'All' | 'Paper' | 'Digital';
    classGroup: 'All' | 'kèm 1-1' | 'Nhóm';
}