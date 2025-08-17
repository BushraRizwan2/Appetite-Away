import React, { useState, useEffect } from 'react';
import ChartPlaceholder from '../shared/ChartPlaceholder';
import DonutChartPlaceholder from '../shared/DonutChartPlaceholder';
import { ICONS } from '../../constants';
import Spinner from '../shared/Spinner';

const MetricCard: React.FC<{ title: string; value: string; icon: React.ReactNode; colorClass: string }> = ({ title, value, icon, colorClass }) => (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md flex items-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
        <div className={`p-4 rounded-lg ${colorClass}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{title}</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{value}</p>
        </div>
    </div>
);

const TransactionRow: React.FC<{ orderId: string; customer: string; amount: string; status: 'Completed' | 'In Progress' | 'Cancelled'; statusColor: string }> = ({ orderId, customer, amount, status, statusColor }) => (
    <tr className="border-b border-slate-100 dark:border-slate-700/50 last:border-b-0">
        <td className="py-3 px-2 font-semibold text-slate-700 dark:text-slate-300">{orderId}</td>
        <td className="py-3 px-2 text-slate-600 dark:text-slate-400">{customer}</td>
        <td className="py-3 px-2 font-medium text-slate-800 dark:text-slate-200">{amount}</td>
        <td className="py-3 px-2">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
                {status}
            </span>
        </td>
    </tr>
);

const TopRestaurantItem: React.FC<{ name: string; sales: string; logo: string }> = ({ name, sales, logo }) => (
     <div className="flex items-center gap-3 py-2">
        <img src={logo} alt={name} className="w-10 h-10 rounded-full object-contain bg-white p-1 shadow-sm" />
        <div className="flex-grow">
            <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">{name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{sales} in sales</p>
        </div>
        <span className="text-emerald-500 text-sm font-bold">{ICONS.earnings}</span>
    </div>
);


const AdminDashboard: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="space-y-8 h-full overflow-y-auto">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Platform Overview</h1>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard title="Total Revenue" value="Rs. 1,2M" icon={ICONS.currencyRupee} colorClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50" />
                <MetricCard title="Total Orders" value="45,890" icon={ICONS.orders} colorClass="bg-blue-100 text-blue-600 dark:bg-blue-900/50" />
                <MetricCard title="Total Users" value="8,950" icon={ICONS.user} colorClass="bg-violet-100 text-violet-600 dark:bg-violet-900/50" />
                <MetricCard title="Pending Payouts" value="Rs. 85k" icon={ICONS.wallet} colorClass="bg-orange-100 text-orange-600 dark:bg-orange-900/50" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Sales Chart */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                        <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-4">Sales Trend (Last 30 Days)</h3>
                        <ChartPlaceholder />
                    </div>
                    {/* Recent Transactions */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                        <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-4">Recent Transactions</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-slate-700">
                                        <th className="py-2 px-2 font-semibold">Order ID</th>
                                        <th className="py-2 px-2 font-semibold">Customer</th>
                                        <th className="py-2 px-2 font-semibold">Amount</th>
                                        <th className="py-2 px-2 font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <TransactionRow orderId="#ORD124" customer="Aisha Khan" amount="Rs. 1,250" status="Completed" statusColor="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300" />
                                    <TransactionRow orderId="#ORD125" customer="Bilal M." amount="Rs. 850" status="In Progress" statusColor="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300" />
                                    <TransactionRow orderId="#ORD126" customer="Sana J." amount="Rs. 2,100" status="Completed" statusColor="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300" />
                                    <TransactionRow orderId="#ORD127" customer="Ali Raza" amount="Rs. 450" status="Cancelled" statusColor="bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300" />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar Area */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Order Status */}
                     <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                        <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-4">Order Status</h3>
                        <DonutChartPlaceholder />
                         <div className="mt-4 space-y-2 text-sm">
                            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span><span className="text-slate-600 dark:text-slate-400">Completed</span></div>
                            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span><span className="text-slate-600 dark:text-slate-400">In Progress</span></div>
                            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span><span className="text-slate-600 dark:text-slate-400">Cancelled</span></div>
                        </div>
                    </div>

                    {/* Top Restaurants */}
                     <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                        <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-4">Top Performing Restaurants</h3>
                        <div className="space-y-2 divide-y divide-slate-100 dark:divide-slate-700/50">
                            <TopRestaurantItem name="The Golden Spoon" sales="Rs. 120k" logo="https://ui-avatars.com/api/?name=The+Golden+Spoon&background=ffedd5&color=9a3412" />
                            <TopRestaurantItem name="Pizza Palace" sales="Rs. 95k" logo="https://ui-avatars.com/api/?name=Pizza+Palace&background=dbeafe&color=1e40af" />
                            <TopRestaurantItem name="Burger Barn" sales="Rs. 88k" logo="https://ui-avatars.com/api/?name=Burger+Barn&background=fef2f2&color=991b1b" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;