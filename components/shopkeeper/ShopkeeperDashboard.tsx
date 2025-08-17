import React from 'react';
import { Link } from 'react-router-dom';
import { ICONS } from '../../constants';
import ChartPlaceholder from '../shared/ChartPlaceholder';
import Button from '../shared/Button';

const MetricCard: React.FC<{ title: string; value: string; icon: React.ReactNode; to: string; }> = ({ title, value, icon, to }) => (
    <Link to={to} className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm flex items-center gap-4 transition-transform hover:scale-105">
        <div className="p-3 bg-rose-100 dark:bg-rose-900/50 text-rose-500 rounded-lg">
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{value}</p>
        </div>
    </Link>
);

const AiInsightCard: React.FC<{ title: string; text: string; }> = ({ title, text }) => (
    <div className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
        <p className="font-bold text-sm text-slate-700 dark:text-slate-200">{title}</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">{text}</p>
    </div>
);


const ShopkeeperDashboard: React.FC = () => {
    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200">Shop Dashboard</h1>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard title="Today's Sales" value="Rs. 8,750" icon={ICONS.currencyRupee} to="/shopkeeper/earnings" />
                <MetricCard title="New Orders" value="15" icon={ICONS.orders} to="/shopkeeper/orders" />
                <MetricCard title="Low Stock Items" value="5" icon={ICONS.flag} to="/shopkeeper/inventory" />
                <MetricCard title="Total Customers" value="212" icon={ICONS.user} to="#" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
                     <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-4">Weekly Sales</h3>
                     <ChartPlaceholder />
                </div>
                
                {/* AI Insights */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-rose-500">{ICONS.sparkles}</span>
                        <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200">AI-Powered Insights</h3>
                    </div>
                    <div className="space-y-3">
                        <AiInsightCard title="📈 Demand Forecast" text="Expect higher demand for cold beverages and snacks this weekend due to the cricket match." />
                        <AiInsightCard title="💡 Upsell Opportunity" text="Customers buying 'Instant Noodles' often also buy 'Organic Eggs'. Suggest a combo." />
                        <AiInsightCard title="🕒 Peak Hours" text="Your busiest hours are 6 PM - 9 PM. Ensure you have enough stock and staff ready." />
                    </div>
                </div>
            </div>

             {/* Inventory Alert */}
            <div className="bg-orange-50 dark:bg-orange-900/40 p-4 rounded-lg shadow-sm border-l-4 border-orange-500">
                 <h3 className="font-bold text-orange-800 dark:text-orange-200">Inventory Alert!</h3>
                 <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                    You have <strong>5 items</strong> running low on stock.
                 </p>
                 <Link to="/shopkeeper/inventory">
                    <Button variant="warning" className="mt-3 text-sm">Manage Inventory</Button>
                 </Link>
            </div>
        </div>
    );
};

export default ShopkeeperDashboard;