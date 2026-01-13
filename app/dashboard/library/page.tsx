import DashboardLayout from '@/app/Layouts/DashBoardLayout';
import React from 'react';

const page = () => {
    return (
        <DashboardLayout>
            <div>
                <h1 className="text-2xl font-semibold text-slate-900">Books Admin Page</h1>
            </div>
        </DashboardLayout>
    );
};

export default page;