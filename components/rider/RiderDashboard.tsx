import React, { useState } from 'react';
import { DeliveryRequest } from '../../types';
import Button from '../shared/Button';
import DeliveryRequestCard from './DeliveryRequestCard';

const MOCK_REQUESTS: DeliveryRequest[] = [
    { 
        id: 'D1', 
        orderId: 'ORD-P1', 
        restaurantName: 'Pizza Palace', 
        restaurantAddress: '123 Main St', 
        customerName: 'Alice', 
        customerAddress: '456 Oak Ave', 
        payout: 7.50, 
        distance: 2.5,
        items: [{ name: 'Pepperoni Pizza', quantity: 1 }],
        status: 'Pending'
    },
    { 
        id: 'D2', 
        orderId: 'ORD-B1',
        restaurantName: 'Burger Barn', 
        restaurantAddress: '789 Pine Ln', 
        customerName: 'Bob',
        customerAddress: '101 Maple Rd', 
        payout: 6.00, 
        distance: 1.8,
        items: [{ name: 'Classic Burger', quantity: 1 }, { name: 'Fries', quantity: 1 }],
        status: 'Pending'
    },
    { 
        id: 'D3', 
        orderId: 'ORD-T1',
        restaurantName: 'Taco Town', 
        restaurantAddress: '321 Elm Ct', 
        customerName: 'Charlie',
        customerAddress: '654 Birch Blvd', 
        payout: 9.25, 
        distance: 4.1,
        items: [{ name: 'Beef Tacos', quantity: 2 }],
        status: 'Pending'
    },
];

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
                        MOCK_REQUESTS.map(req => <DeliveryRequestCard key={req.id} request={req} />)
                    ) : (
                        <p className="text-center text-slate-500 dark:text-slate-400 py-8">Go online to see requests.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RiderDashboard;