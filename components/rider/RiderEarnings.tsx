import React from 'react';
import Button from '../shared/Button';

const IncentiveCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
        <h4 className="font-bold text-rose-600 dark:text-rose-400">{title}</h4>
        <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
);

const RiderEarnings: React.FC = () => {
    return (
        <div className="p-4 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">My Earnings</h2>
                <p className="text-slate-500 dark:text-slate-400">Track your payments and bonuses.</p>
            </div>
            
            <div className="bg-rose-50 dark:bg-rose-900/50 p-4 rounded-lg shadow-sm text-center space-y-2">
                <p className="text-sm text-rose-800 dark:text-rose-200 font-semibold">Current Balance</p>
                <p className="text-4xl font-bold text-rose-600 dark:text-rose-300">Rs. 85.50</p>
                <Button className="w-full">Cash Out Now</Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <p className="text-sm text-slate-500 dark:text-slate-400">This Week's Earnings</p>
                    <p className="text-xl font-bold text-slate-800 dark:text-slate-200">Rs. 215.75</p>
                </div>
                 <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Total Deliveries</p>
                    <p className="text-xl font-bold text-slate-800 dark:text-slate-200">28</p>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Active Incentives</h3>
                <div className="space-y-3">
                    <IncentiveCard title="Weekly Quest" description="Complete 10 more trips for a Rs. 20 bonus!" />
                    <IncentiveCard title="Referral Bonus" description="Refer a friend and earn Rs. 50 when they complete 20 trips." />
                </div>
            </div>

            <Button variant="secondary" fullWidth>View Payout History</Button>

        </div>
    );
};

export default RiderEarnings;
