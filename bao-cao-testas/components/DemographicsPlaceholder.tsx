import React from 'react';
import Card from './Card';
import UsersIcon from './icons/UsersIcon';

const DemographicsPlaceholder: React.FC = () => {
    return (
        <Card title="Giới tính & Nhân khẩu học" icon={<UsersIcon />}>
            <div className="bg-amber-100/60 text-amber-800 p-4 rounded-lg flex items-center border border-amber-200/80">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 flex-shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-medium">Không đủ dữ liệu để phân tích theo giới tính.</p>
            </div>
        </Card>
    );
};

export default DemographicsPlaceholder;