
import React, { useState } from 'react';
import Button from '../shared/Button';
import { ICONS } from '../../constants';

const MetricCard: React.FC<{ title: string; value: string; color?: string, icon?: React.ReactNode }> = ({ title, value, color = 'text-slate-800 dark:text-slate-200', icon }) => (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm flex items-start gap-4">
        {icon && <div className="text-rose-500 bg-rose-100 dark:bg-rose-900/50 p-3 rounded-lg">{icon}</div>}
        <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 break-words">{title}</p>
            <p className={`text-2xl font-bold break-words ${color}`}>{value}</p>
        </div>
    </div>
);

const PayoutRow: React.FC<{ date: string; amount: number; status: 'Paid' | 'Pending' }> = ({ date, amount, status }) => (
    <tr className="border-b border-slate-200 dark:border-slate-700">
        <td className="p-3 text-sm text-slate-700 dark:text-slate-300">{date}</td>
        <td className="p-3 text-sm font-semibold text-slate-800 dark:text-slate-200">Rs. {amount.toFixed(2)}</td>
        <td className="p-3 text-sm">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status === 'Paid' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'}`}>{status}</span>
        </td>
    </tr>
);

const RestaurantEarnings: React.FC = () => {
    const today = new Date();
    const thirtyDaysAgo = new Date(new Date().setDate(today.getDate() - 30));

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    const [startDate, setStartDate] = useState(formatDate(thirtyDaysAgo));
    const [endDate, setEndDate] = useState(formatDate(today));


    const handleExport = () => {
        alert("Exporting revenue data...");
    };

    const handleFilter = () => {
        alert(`Filtering data from ${startDate} to ${endDate}. This is a demo; in a real app, data would be refetched.`);
    };

    return (
        <div className="p-4 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Earnings & Payouts</h2>
                <Button variant="secondary" onClick={handleExport}>Export Report</Button>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Filter by Date</h3>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-full sm:w-auto">
                        <label htmlFor="start-date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
                        <input id="start-date" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800" />
                    </div>
                    <div className="w-full sm:w-auto">
                        <label htmlFor="end-date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">End Date</label>
                        <input id="end-date" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800" />
                    </div>
                    <div className="w-full sm:w-auto pt-2 sm:pt-0 sm:self-end">
                        <Button onClick={handleFilter} className="w-full">Apply</Button>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard title="Total Revenue" value="Rs. 15,670" color="text-emerald-500" icon={ICONS.currencyRupee} />
                <MetricCard title="App Charges" value="- Rs. 2,350" color="text-red-500" icon={ICONS.receipt} />
                <MetricCard title="Net Payout" value="Rs. 13,320" color="text-blue-500" icon={ICONS.wallet} />
                <MetricCard title="Taxes Paid" value="- Rs. 890" color="text-orange-500" icon={ICONS.receipt} />
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Automated Payouts</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Payouts are automatically transferred to your integrated bank account weekly.</p>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-700/50">
                                <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Date</th>
                                <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Amount</th>
                                <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <PayoutRow date="May 20, 2024" amount={6100} status="Paid" />
                            <PayoutRow date="May 13, 2024" amount={5850} status="Paid" />
                            <PayoutRow date="May 06, 2024" amount={6500} status="Paid" />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RestaurantEarnings;