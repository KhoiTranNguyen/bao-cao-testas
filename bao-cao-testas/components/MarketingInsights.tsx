import React from 'react';
import { OverallAnalysis, AchievementAnalysis } from '../types';
import Card from './Card';
import LightBulbIcon from './icons/LightBulbIcon';

interface Props {
    analysis: OverallAnalysis;
    achievements: AchievementAnalysis;
}

const InsightItem: React.FC<{ icon: string; text: React.ReactNode }> = ({ icon, text }) => (
    <li className="flex items-start py-2">
        <span className="text-2xl mr-4 mt-1">{icon}</span>
        <p className="text-slate-600 text-lg">{text}</p>
    </li>
);

const MarketingInsights: React.FC<Props> = ({ analysis, achievements }) => {
    const digitalHighScorersCount = achievements.digitalHighScorers;
    const digitalTotal = achievements.digitalTotal;
    const digitalHighScorerPercentage = digitalTotal > 0 ? (digitalHighScorersCount / digitalTotal) * 100 : 0;
    
    return (
        <Card title="Key Takeaways & Marketing Insights" icon={<LightBulbIcon />} subtitle="Những thông điệp chính từ dữ liệu.">
            <ul className="space-y-4">
                <InsightItem 
                    icon="🚀" 
                    text={
                        <>
                            <strong className="font-semibold text-slate-800">Tỷ lệ đậu vượt trội:</strong> "Học viên của chúng tôi đạt tỷ lệ đậu lên đến 
                            <span className="font-bold text-brand-orange"> {analysis.passRate.toFixed(1)}%</span>."
                        </>
                    }
                />
                <InsightItem 
                    icon="🏆" 
                    text={
                        <>
                            <strong className="font-semibold text-slate-800">Chinh phục điểm cao:</strong> "
                            <span className="font-bold text-brand-orange">
                                {digitalHighScorerPercentage.toFixed(0)}%
                            </span> học viên thi Digital đạt điểm CT Score trên 130."
                        </>
                    }
                />
                <InsightItem 
                    icon="🎯" 
                    text={
                        <>
                            <strong className="font-semibold text-slate-800">Hiệu quả đã được chứng minh:</strong> "Điểm CT Score trung bình của học viên là 
                            <span className="font-bold text-brand-orange"> {analysis.avgCtScore.toFixed(1)} điểm</span>, minh chứng cho chất lượng đào tạo."
                        </>
                    } 
                />
                 <InsightItem 
                    icon="💡" 
                    text={
                        <>
                            <strong className="font-semibold text-slate-800">Đa dạng lựa chọn:</strong> "Cung cấp nhiều lựa chọn ngành học, trong đó các ngành 
                            <span className="font-bold text-brand-orange"> CSE, MEN, BBA </span> 
                             thu hút nhiều học viên nhất và có kết quả tốt."
                        </>
                    } 
                />
            </ul>
        </Card>
    );
};

export default MarketingInsights;