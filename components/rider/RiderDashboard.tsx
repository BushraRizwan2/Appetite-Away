import React, { useState } from 'react';
import Button from '../shared/Button';
import DeliveryRequestCard from './DeliveryRequestCard';
import { MOCK_DELIVERY_REQUESTS } from '../../data/mockData';

const SummaryCard: React.FC<{ title: string; value: string; }> = ({ title, value }) => (
    <div className="text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{value}</p>
    </div>
);


const RiderDashboard: React.FC = () => {
    const [isOnline, setIsOnline] = useState(false);

    return (
        <div className="p-4 space-y-6 h-full overflow-y-auto">
            <div className={`p-4 rounded-lg shadow-sm text-center ${isOnline ? 'bg-emerald-100 dark:bg-emerald-900' : 'bg-slate-100 dark:bg-slate-800'}`}>
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
                    {isOnline ? "You are Online" : "You are Offline"}
                </h2>
                <Button 
                    onClick={() => setIsOnline(!isOnline)} 
                    variant={isOnline ? 'danger' : 'success'}
                >
                    {isOnline ? "Go Offline" : "Go Online"}
                </Button>
            </div>

            {isOnline && (
                 <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-center mb-3">Today's Summary</h3>
                    <div className="flex justify-around items-center">
                        <SummaryCard title="Earnings" value="Rs. 1,250" />
                        <div className="h-12 w-px bg-slate-200 dark:bg-slate-700"></div>
                        <SummaryCard title="Trips" value="12" />
                        <div className="h-12 w-px bg-slate-200 dark:bg-slate-700"></div>
                        <SummaryCard title="Online" value="4.5h" />
                    </div>
                 </div>
            )}
            
            <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Demand Heatmap</h3>
                <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-500 overflow-hidden shadow-inner">
                    <img src="https://images.pexels.com/photos/224960/pexels-photo-224960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="City map with hotspots" className="w-full h-full object-cover opacity-80" />
                </div>
            </div>

            <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                    Available Requests
                </h3>
                <div className="space-y-4">
                    {isOnline ? (
                        MOCK_DELIVERY_REQUESTS.map(req => <DeliveryRequestCard key={req.id} request={req} />)
                    ) : (
                        <p className="text-center text-slate-500 dark:text-slate-400 py-8">Go online to see requests.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RiderDashboard;