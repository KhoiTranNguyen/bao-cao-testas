import { useState, useEffect } from 'react';
import { StudentData, AnalysisResults, MajorData, BarChartData } from '../types';

const rawData = `
# Full_Name	Grade_Level	Outcome	Format_test	Class_group	CT Score	Module Score	Exam_Result	Scholarship_Status	Thời gian nhập học	Thời gian thi	Ngành học	Note
1	Thái Khôi Vỹ	Lớp 12	VGU	Paper	kèm 1-1	111	106	Đậu	≤ 25%	23/02/25	23/04/25	ECE	
2	Nguyễn Hữu Hạo Thiên	Lớp 12	VGU	Paper	kèm 1-1	118	107	Đậu	≤ 25%	07/09/24	07/11/24	CSE	
3	Trần Khánh Hưng	Lớp 12	VGU	Paper	Nhóm	104	90	Đậu	Không	24/03/25	24/05/25	SME	
4	Vũ Sơn Hà	Lớp 12	VGU	Paper	Nhóm	106	103	Đậu	Không	25/03/25	25/05/25	MEN	
5	Nguyễn Tiến Nam	Lớp 11	VGU	Paper	kèm 1-1	99	97	Đậu	Không	26/03/25	26/05/25	BFA	
6	Nguyễn Trần Nhật Anh	Lớp 12	Du học Đức	Paper	Nhóm	113	108	Đậu	Không	25/04/25	25/06/25	CSE	
7	Bùi Minh Duy	Lớp 12	VGU	Paper	Nhóm	100	102	Đậu	Không	25/03/25	25/05/25	MEN	
8	Phạm Xuân Khiêm	Lớp 12	Du học Đức	Digital	kèm 1-1	140	128	Đậu	Không	17/04/25	17/06/25	MEN	
9	Hoàng Lê Minh	Lớp 12	VGU	Paper	Nhóm	118	121	Đậu	100%	25/03/25	25/05/25	ECE	
10	Trần Gia Huy	Lớp 12	VGU	Paper	Nhóm	112	97	Đậu	Không	25/03/25	25/05/25	ECE	
11	Nguyễn Lê Minh Châu	Lớp 12	VGU	Paper	Nhóm	100	94	Đậu	Không	25/03/25	25/05/25	MEN	
12	Nguyễn Trần Duy An	Đại học	VGU	Paper	Nhóm	106	97	Đậu	Không	25/03/25	25/05/25	MEN	
13	Nguyễn Minh Khoa	Lớp 12	VGU	Paper	kèm 1-1	101	91	Đậu	Không	25/03/25	25/05/25	MEN	
14	Võ Tuấn	Lớp 12	VGU	Paper	kèm 1-1	111	100	Đậu	Không	25/03/25	25/05/25	CSE	
15	Nguyễn Hoàng Khánh Vy	Lớp 12	VGU	Paper	Nhóm	118	111	Đậu	≤ 25%	25/03/25	25/05/25	ARC	
16	Đào Bá Đạt	Lớp 12	VGU	Paper	kèm 1-1	130	115	Đậu	100%	25/03/25	25/05/25	MEN	
17	Doãn Yến Trang	Lớp 12	Du học Đức	Paper	Nhóm	102	106	Đậu	Không	20/02/25	24/04/25	CSE	
18	Trần Đức Minh	Lớp 12	Du học Đức	Digital	kèm 1-1	133	200	Đậu	100%	17/05/25	17/06/25	BBA	
19	Nguyễn Ngọc Khánh Mai	Lớp 12	Du học Đức	Digital	kèm 1-1	106	111	Đậu	Không	17/05/25	17/06/25	CSE	
20	Trương Chí Bình	Lớp 12	VGU	Paper	kèm 1-1	97	97	Đậu	Không	25/03/25	25/05/25	BBA	
21	Nguyễn Hải Đăng	Lớp 12	VGU	Paper	kèm 1-1	112	111	Đậu	≤ 25%	25/03/25	25/05/25	MEN	
22	Lương Hiếu Đạt	Lớp 12	VGU	Paper	Nhóm	128	109	Đậu	100%	25/03/25	25/05/25	MEN	
23	Đinh Việt Hoàng	Lớp 12	VGU	Paper	Nhóm	117	104	Đậu	≤ 25%	25/03/25	25/05/25	ECE	
24	Phạm Thị Hoài Linh	Lớp 12	VGU	Paper	kèm 1-1	105	99	Đậu	Không	25/03/25	25/05/25	BBA	
25	Nguyễn Thị Khánh Linh	Lớp 12	Du học Đức	Paper	kèm 1-1	94	95	Đậu	Không	18/12/24	18/02/25	MEN	
26	Phạm Hải Đăng	Lớp 12	VGU	Paper	Nhóm	111	101	Đậu	Không	25/03/25	25/05/25	MEN	
27	Võ Mai Diễm Quỳnh	Lớp 12	VGU	Paper	Nhóm	110	104	Đậu	Không	25/03/25	25/05/25	ARC	
28	Mai Thùy Trang	Lớp 12	VGU	Paper	Nhóm	106	98	Đậu	Không	25/03/25	25/05/25	CSE	
29	Lê Trường Sơn	Lớp 12	VGU	Paper	kèm 1-1	108	99	Đậu	Không	25/03/25	25/05/25	ARC	
30	Nguyễn Công Thái Phước	Lớp 12	Du học Đức	Paper	kèm 1-1	102	109	Đậu	Không	26/02/25	26/04/25	CSE	
31	Trương Lê Thanh Bình	Lớp 11	Du học Đức	Paper	Nhóm	103	95	Đậu	Không	26/02/25	26/04/25	MEN	
32	Bùi Ngọc Phương Anh	Lớp 12	Du học Đức	Paper	Nhóm	113	113	Đậu	Không	26/02/25	26/04/25	HUM	
33	Ngô Xuân Thảo	Lớp 12	VGU	Paper	Nhóm	99	96	Đậu	Không	26/02/25	26/04/25	MEN	
34	Bạch Thùy Dương	Lớp 12	Du học Đức	Paper	Nhóm	109	110	Đậu	Không	19/08/24	19/10/24	CSE	
35	Phạm Đình Lương	Lớp 12	Du học Đức	Paper	Nhóm	119	119	Đậu	Không	18/12/24	18/02/25	MEN	
36	Lê Thị Anh Thơ	Lớp 12	Du học Đức	Paper	Nhóm	95	100	Đậu	Không	19/08/24	19/10/24	BBA	
37	Phùng Lê Diệu Anh	Lớp 12	Du học Đức	Digital	kèm 1-1	146	153	Đậu	Không	15/01/25	15/03/25	CSE	
38	Trần Lê Đức Anh	Lớp 12	Du học Đức	Paper	Nhóm	102	109	Đậu	Không	18/12/25	18/02/25	CSE	
39	Nguyễn Đặng Gia Linh	Lớp 12	VGU	Paper	kèm 1-1	109	102	Đậu	Không	15/01/25	15/03/25	BBA	
40	Khâu Quỳnh Anh	Lớp 12	Du học Đức	Paper	Nhóm	100	108	Đậu	Không	15/01/25	15/03/25	CSE	
41	Huỳnh Lê Ngân Giang	Lớp 12	Du học Đức	Paper	Nhóm	102	98	Đậu	Không	15/01/25	15/03/25	CSE	
42	Trần Linh Ngân	Lớp 12	Du học Đức	Paper	Nhóm	106	84	Rớt	Không	15/01/25	15/03/25	HUM	
43	Phạm Châu Anh	Lớp 12	Du học Đức	Paper	kèm 1-1	101	100	Đậu	Không	15/01/25	15/03/25	BBA	
44	Nguyễn Quỳnh Anh	Lớp 12	Du học Đức	Paper	Nhóm	95	94	Đậu	Không	15/01/25	15/03/25	BBA	
45	Nguyễn Thị Minh Anh	Lớp 12	Du học Đức	Paper	kèm 1-1	100	104	Đậu	Không	18/12/25	18/02/25	BBA	
46	Phan Nguyễn Anh Thư	Lớp 12	Du học Đức	Paper	Nhóm	112	105	Đậu	Không	18/12/25	18/02/25	CSE	
47	Nguyễn Phúc Bảo Trân	Lớp 12	Du học Đức	Paper	kèm 1-1	99	106	Đậu	Không	18/12/25	18/02/25	CSE	
48	Lê Nguyễn Hiếu Ngân	Lớp 12	VGU	Paper	kèm 1-1	96	96	Đậu	Không	25/03/25	25/05/25	CSE	
49	Nguyễn Minh Châu	Lớp 12	Du học Đức	Paper	Nhóm	108	110	Đậu	Không	19/08/24	19/10/24	HUM	
50	Bùi Ngọc Phương Bối	Lớp 12	Du học Đức	Digital	kèm 1-1	139	140	Đậu	Không	10/10/24	10/12/24	BBA	
51	Nguyễn Trần Khôi	Lớp 12	Du học Đức	Paper	Nhóm	100	102	Đậu	Không	19/08/24	19/10/24	MEN	
52	Lê Nguyên Cát Tường	Lớp 12	Du học Đức	Paper	Nhóm	107	103	Đậu	Không	19/08/24	19/10/24	CSE	
53	Nguyễn Minh Ánh	Lớp 12	VGU	Paper	Nhóm	110	101	Đậu	Không	19/08/24	19/10/24	MEN	
54	Nguyễn Quang Vinh	Lớp 12	VGU	Paper	Nhóm	117	109	Đậu	≤ 50%	25/03/24	25/05/24	CSE	
55	Trần Lê Tấn Phúc	Lớp 11	VGU	Paper	Nhóm	92	93	Đậu	Không	25/03/24	25/05/24	CSE	
56	Lê Thu Thủy	Lớp 12	Du học Đức	Paper	kèm 1-1	109	86	Rớt	Không	24/12/23	24/02/24	CSE	
57	Cao Đăng Trí	Lớp 12	VGU	Paper	kèm 1-1	105	99	Đậu	Không	20/03/23	20/05/23	ECE	
58	Trần Thái Tuấn	Lớp 12	VGU	Paper	kèm 1-1	101	94	Đậu	Không	20/03/23	20/05/23	ECE	
59	Trần Thảo Vy	Lớp 12	Du học Đức	Paper	kèm 1-1	105	107	Đậu	Không	20/03/23	20/05/23	CSE	
60	Yu I Feng	Lớp 12	VGU	Paper	Nhóm	92	97	Đậu	Không	25/03/25	25/05/25	MEN	
61	Trần Ngọc Duy	Lớp 12	VGU	Paper	Nhóm	108	94	Đậu	Không	25/03/25	25/05/25	MEN	
62	Nguyễn Doãn Ngọc Doanh	Lớp 12	VGU	Paper	Nhóm	103	113	Đậu	Không	25/03/25	25/05/25	BFA	
63	Quỳnh Thị Như Ngô	Lớp 12	Du học Đức	Paper	Nhóm	98	105	Đậu	Không	18/12/24	18/02/25	BBA	
64	Nguyễn Minh Khôi	Lớp 12	Du học Đức	Paper	Nhóm	98	102	Đậu	Không	18/12/24	18/02/25	MEN	
65	Hoàng Minh Thư	Lớp 12	VGU	Paper	kèm 1-1	113	113	Đậu	≤ 50%	18/12/24	18/02/25	MEN	
66	Lê Nguyễn Khánh Vy	Lớp 12	Du học Đức	Paper	kèm 1-1	100	100	Đậu	Không	19/08/24	19/10/24	BBA	
67	Bốc Minh Quân	Lớp 12	Du học Đức	Paper	Nhóm	101	86	Rớt	Không	19/08/24	19/10/24	CSE	
68	Bùi Minh Victor	Lớp 12	VGU	Paper	Nhóm	88	93	Đậu	Không	25/03/24	25/05/24	ECE	
69	Nguyễn Quốc Trung	Lớp 12	VGU	Paper	Nhóm	112	107	Đậu	Không	25/03/24	25/05/24	CSE	
70	Nguyễn Đình Khang	Lớp 12	VGU	Paper	Nhóm	104	98	Đậu	Không	25/03/24	25/05/24	MEN	
71	Phạm Minh Trí	Lớp 12	VGU	Paper	kèm 1-1	115	111	Đậu	100%	25/03/24	25/05/24	MEN	
72	Vũ Trường Giang	Lớp 12	VGU	Paper	kèm 1-1	112	111	Đậu	100%	25/03/24	25/05/24	EPE	
73	Nguyễn Hoàng Chương	Lớp 12	VGU	Paper	kèm 1-1	101	90	Đậu	Không	25/03/24	25/05/24	CSE	
74	Phạm Minh Đạo	Lớp 12	VGU	Paper	kèm 1-1	90	96	Đậu	Không	25/03/24	25/05/24	CSE	
75	Nguyễn Phương Hy	Lớp 12	VGU	Paper	kèm 1-1	96	91	Đậu	Không	20/03/23	20/05/23	ARC	
76	Lê Ngọc Bảo Trân	Lớp 12	VGU	Paper	Nhóm	95	95	Đậu	Không	25/02/24	25/04/24	BBA	
77	Nguyễn Văn Kim	Lớp 12	Du học Đức	Paper	Nhóm	110	101	Đậu	Không	25/02/24	25/04/24	MEN	
78	Ngọc Linh	Lớp 12	Du học Đức	Paper	Nhóm	92	97	Đậu	Không	25/02/24	25/04/24	HUM	
79	Lê Nguyễn Anh Thơ	Lớp 12	Du học Đức	Paper	kèm 1-1	95	100	Đậu	Không	19/08/24	19/10/24	BBA	
80	Nguyễn Trần Phan Anh	Lớp 12	Du học Đức	Paper	Nhóm	99	90	Đậu	Không	19/08/24	19/10/24	CSE	
81	Nguyễn Chí Kiên	Lớp 12	Du học Đức	Paper	Nhóm	105	102	Đậu	Không	19/08/24	19/10/24	CSE	
82	Nguyễn Minh Ánh	Lớp 12	Du học Đức	Paper	kèm 1-1	110	101	Đậu	Không	19/08/24	19/10/24	MEN	
83	Nguyễn Tiến Khôi	Lớp 12	Du học Đức	Paper	Nhóm	95	95	Đậu	Không	25/03/24	25/05/24	ECE	
84	Nguyễn Ngọc Linh	Lớp 12	Du học Đức	Paper	kèm 1-1	107	107	Đậu	Không	19/08/24	19/10/24	BBA	
85	Nguyễn Khánh Nhi	Lớp 12	Du học Đức	Paper	Nhóm	94	97	Đậu	Không	19/08/24	19/10/24	CSE	
86	Nguyễn Ngọc Thảo Anh	Lớp 12	Du học Đức	Paper	Nhóm	109	99	Đậu	Không	19/08/24	19/10/24	BBA	
87	Nguyễn Đức Khương	Lớp 12	VGU	Paper	Nhóm	114	105	Đậu	≤ 25%	20/03/23	20/05/23	ECE	
88	Nguyễn Thái Tuấn	Lớp 12	VGU	Paper	Nhóm	101	94	Đậu	Không	20/03/23	20/05/23	ARC	
89	Trần Đức Khiêm	Lớp 12	VGU	Paper	kèm 1-1	94	97	Đậu	Không	25/03/24	25/05/24	CSE	
90	Cao Đăng Lương	Lớp 12	VGU	Paper	kèm 1-1	104	98	Đậu	Không	25/03/24	25/05/24	CSE	
91	Trần Nguyễn Bảo Phúc	Lớp 11	VGU	Paper	Nhóm	99	106	Đậu	Không	25/03/24	25/05/24	CSE	
92	Nguyễn Công Thái	Lớp 12	Du học Đức	Paper	kèm 1-1	101	97	Đậu	Không	18/12/23	18/02/25	CSE	
93	Nguyễn Nho Minh Tường	Lớp 12	VGU	Paper	kèm 1-1	93	95	Đậu	Không	25/03/24	25/05/24	MEN	
94	Trần Đào Mai Huy	Lớp 12	Du học Đức	Paper	Nhóm	102	108	Đậu	Không	18/12/23	18/02/25	MEN	
95	Ellyn	Lớp 12	VGU	Paper	kèm 1-1	98	96	Đậu	Không	18/12/23	18/02/25	CSE	
96	Nguyễn Minh Khôi	Lớp 12	Du học Đức	Paper	kèm 1-1	98	102	Đậu	Không	18/12/23	18/02/25	MEN	
97	Nguyễn Hiếu Lê Ngân	Lớp 12	Du học Đức	Paper	Nhóm	96	96	Đậu	Không	18/12/23	18/02/25	BBA	
98	Ngô Thị Quỳnh Như	Lớp 12	Du học Đức	Paper	Nhóm	98	105	Đậu	Không	18/12/23	18/02/25	BBA	
99	Nguyễn Hữu Hạo Thiên	Lớp 12	Du học Đức	Paper	kèm 1-1	119	108	Đậu	≤ 50%	18/12/23	18/02/25	CSE	
100	Nguyễn Phan Anh Thư	Lớp 12	Du học Đức	Paper	kèm 1-1	112	105	Đậu	Không	18/12/23	18/02/25	CSE	
101	Yến Nhi	Lớp 12	Du học Đức	Paper	Nhóm	94	97	Đậu	Không	18/12/23	18/02/25	HUM	
`;

const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('/');
    return new Date(`20${year}-${month}-${day}`);
};

const processData = (): StudentData[] => {
    const lines = rawData.trim().split('\n').slice(1);
    const seen = new Set<string>();
    const uniqueData: StudentData[] = [];

    lines.forEach(line => {
        if (seen.has(line)) return;
        seen.add(line);

        const columns = line.split('\t').map(c => c.trim());
        if (columns.length < 12) return;
        
        try {
            const admissionDate = parseDate(columns[9]);
            const examDate = parseDate(columns[10]);
            
            const student: StudentData = {
                id: parseInt(columns[0]),
                fullName: columns[1],
                gradeLevel: columns[2],
                outcome: columns[3] as 'VGU' | 'Du học Đức',
                formatTest: columns[4] as 'Paper' | 'Digital',
                classGroup: columns[5] as 'kèm 1-1' | 'Nhóm',
                ctScore: parseInt(columns[6]),
                moduleScore: parseInt(columns[7]),
                examResult: columns[8] === 'Đậu' ? 'pass' : 'fail',
                scholarshipStatus: columns[9] as '100%' | '≤ 50%' | '≤ 25%' | 'Không',
                admissionDate: admissionDate,
                examDate: examDate,
                major: columns[11],
                note: columns.length > 12 ? columns[12] : undefined,
                prepDays: Math.round((examDate.getTime() - admissionDate.getTime()) / (1000 * 60 * 60 * 24)),
                monthExam: `${(examDate.getMonth() + 1).toString().padStart(2, '0')}/${examDate.getFullYear()}`,
                passFlag: columns[8] === 'Đậu' ? 1 : 0,
                hasScholarship100: columns[9] === '100%' ? 1 : 0,
                hasScholarship50: columns[9] === '≤ 50%' ? 1 : 0,
                hasScholarship25: columns[9] === '≤ 25%' ? 1 : 0,
            };
            uniqueData.push(student);
        } catch (e) {
            console.error(`Error parsing line: ${line}`, e);
        }
    });

    return uniqueData;
};

export const analyzeData = (data: StudentData[]): AnalysisResults => {
    if (data.length === 0) {
        return {
            overall: { totalStudents: 0, passRate: 0, avgCtScore: 0, avgModuleScore: 0, passFailData: [] },
            scholarship: { total100: 0, byOutcome: [] },
            score: { top5CtScores: [], avgScores: [] },
            trainingFormat: { comparisonData: [] },
            time: { passRateByMonth: [] },
            major: [],
            achievements: { highestCtScore: null, highestModuleScore: null, total100Scholarships: 0, digitalHighScorers: 0, digitalTotal: 0 },
            scoreDistribution: { paper: [], digital: [] },
            cross: { passRateByFormatAndGroup: [] },
            learningPace: { byPace: [] },
        };
    }

    const totalStudents = data.length;
    const totalPassed = data.filter(s => s.examResult === 'pass').length;
    const passRate = totalStudents > 0 ? (totalPassed / totalStudents) * 100 : 0;
    
    const sum = <T,>(arr: T[], key: keyof T) => arr.reduce((acc, item) => acc + (Number(item[key]) || 0), 0);
    const avgCtScore = totalStudents > 0 ? sum(data, 'ctScore') / totalStudents : 0;
    const avgModuleScore = totalStudents > 0 ? sum(data, 'moduleScore') / totalStudents : 0;
    
    const overall = {
        totalStudents,
        passRate,
        avgCtScore,
        avgModuleScore,
        passFailData: [
            { name: 'Đậu', value: totalPassed, fill: '#10B981' },
            { name: 'Rớt', value: totalStudents - totalPassed, fill: '#EF4444' },
        ],
    };
    
    const scholarship = {
        total100: data.filter(s => s.scholarshipStatus === '100%').length,
        byOutcome: [
            { name: 'VGU', '100%': data.filter(s => s.outcome === 'VGU' && s.scholarshipStatus === '100%').length, '≤ 50%': data.filter(s => s.outcome === 'VGU' && s.scholarshipStatus === '≤ 50%').length, '≤ 25%': data.filter(s => s.outcome === 'VGU' && s.scholarshipStatus === '≤ 25%').length },
            { name: 'Du học Đức', '100%': data.filter(s => s.outcome === 'Du học Đức' && s.scholarshipStatus === '100%').length, '≤ 50%': data.filter(s => s.outcome === 'Du học Đức' && s.scholarshipStatus === '≤ 50%').length, '≤ 25%': data.filter(s => s.outcome === 'Du học Đức' && s.scholarshipStatus === '≤ 25%').length },
        ]
    };
    
    const score = {
        top5CtScores: [...data].sort((a, b) => b.ctScore - a.ctScore).slice(0, 5),
        avgScores: [
            { name: 'CT Score', 'Điểm TB': avgCtScore },
            { name: 'Module Score', 'Điểm TB': avgModuleScore },
        ]
    };

    const groupData = <T,>(arr: T[], key: keyof T): Record<string, T[]> => {
        return arr.reduce((acc, item) => {
            const groupKey = String(item[key]);
            if (!acc[groupKey]) {
                acc[groupKey] = [];
            }
            acc[groupKey].push(item);
            return acc;
        }, {} as Record<string, T[]>);
    };

    const kem11 = data.filter(s => s.classGroup === 'kèm 1-1');
    const nhom = data.filter(s => s.classGroup === 'Nhóm');
    
    const trainingFormat = {
        comparisonData: [
            { name: 'Tỷ lệ đậu (%)', 'kèm 1-1': kem11.length > 0 ? (sum(kem11, 'passFlag') / kem11.length) * 100 : 0, 'Nhóm': nhom.length > 0 ? (sum(nhom, 'passFlag') / nhom.length) * 100 : 0 },
            { name: 'Điểm CT TB', 'kèm 1-1': kem11.length > 0 ? sum(kem11, 'ctScore') / kem11.length : 0, 'Nhóm': nhom.length > 0 ? sum(nhom, 'ctScore') / nhom.length : 0 },
            { name: 'Điểm Module TB', 'kèm 1-1': kem11.length > 0 ? sum(kem11, 'moduleScore') / kem11.length : 0, 'Nhóm': nhom.length > 0 ? sum(nhom, 'moduleScore') / nhom.length : 0 },
        ]
    };

    const byMonth = groupData(data, 'monthExam');
    const time = {
        passRateByMonth: Object.entries(byMonth)
            .map(([month, students]) => ({
                name: month,
                'Tỷ lệ đậu': students.length > 0 ? (sum(students, 'passFlag') / students.length) * 100 : 0,
            }))
            // FIX: Parse year string to number for correct date comparison.
            .sort((a, b) => new Date(parseInt(a.name.split('/')[1]), parseInt(a.name.split('/')[0]) - 1).getTime() - new Date(parseInt(b.name.split('/')[1]), parseInt(b.name.split('/')[0]) - 1).getTime()),
    };
    
    const byMajor = groupData(data, 'major');
    const major = Object.entries(byMajor).map(([majorName, students]) => ({
        name: majorName,
        students: students.length,
        passRate: students.length > 0 ? (sum(students, 'passFlag') / students.length) * 100 : 0,
        avgCtScore: students.length > 0 ? sum(students, 'ctScore') / students.length : 0,
        avgModuleScore: students.length > 0 ? sum(students, 'moduleScore') / students.length : 0,
    }));
    
    const createBins = (scores: number[], binSize: number): BarChartData[] => {
        if(scores.length === 0) return [];
        const min = Math.min(...scores);
        const max = Math.max(...scores);
        const bins: Record<string, number> = {};
        for (let i = Math.floor(min / binSize) * binSize; i <= max; i += binSize) {
            const binName = `${i} - ${i + binSize - 1}`;
            bins[binName] = 0;
        }
        scores.forEach(score => {
            const binStart = Math.floor(score / binSize) * binSize;
            const binName = `${binStart} - ${binStart + binSize - 1}`;
            if(bins[binName] !== undefined) bins[binName]++;
        });
        return Object.entries(bins).map(([name, value]) => ({ name, 'Số lượng': value }));
    }

    const scoreDistribution = {
        paper: createBins(data.filter(s => s.formatTest === 'Paper').map(s => s.ctScore), 10),
        digital: createBins(data.filter(s => s.formatTest === 'Digital').map(s => s.ctScore), 10),
    };

    const crossData: Record<string, { total: number, passed: number }> = {};
    data.forEach(s => {
        const key = `${s.formatTest} - ${s.classGroup}`;
        if (!crossData[key]) crossData[key] = { total: 0, passed: 0 };
        crossData[key].total++;
        if (s.examResult === 'pass') crossData[key].passed++;
    });

    const cross = {
        passRateByFormatAndGroup: Object.entries(crossData).map(([name, values]) => ({
            name,
            'Tỷ lệ đậu': values.total > 0 ? (values.passed / values.total) * 100 : 0
        })),
    };

    const getPaceGroup = (days: number) => {
        if (days < 60) return '< 60 ngày';
        if (days <= 90) return '60-90 ngày';
        return '> 90 ngày';
    };

    const byPace = groupData(data.map(s => ({ ...s, paceGroup: getPaceGroup(s.prepDays) })), 'paceGroup');
    const learningPace = {
        byPace: Object.entries(byPace).map(([pace, students]) => ({
            name: pace,
            'Tỷ lệ đậu': students.length > 0 ? (sum(students, 'passFlag') / students.length) * 100 : 0,
            'Điểm CT TB': students.length > 0 ? sum(students, 'ctScore') / students.length : 0,
        }))
    };
    
    const achievements = {
        highestCtScore: data.reduce((max, s) => (!max || s.ctScore > max.ctScore ? s : max), null as StudentData | null),
        highestModuleScore: data.reduce((max, s) => (!max || s.moduleScore > max.moduleScore ? s : max), null as StudentData | null),
        total100Scholarships: scholarship.total100,
        digitalHighScorers: data.filter(s => s.formatTest === 'Digital' && s.ctScore > 130).length,
        // FIX: Add total number of digital test takers for marketing insights calculation.
        digitalTotal: data.filter(s => s.formatTest === 'Digital').length,
    };
    
    return { overall, scholarship, score, trainingFormat, time, major, achievements, scoreDistribution, cross, learningPace };
};

export const useStudentData = () => {
    const [allStudents, setAllStudents] = useState<StudentData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const data = processData();
            setAllStudents(data);
        } catch (e) {
            setError('Không thể xử lý dữ liệu.');
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    return { allStudents, loading, error };
};