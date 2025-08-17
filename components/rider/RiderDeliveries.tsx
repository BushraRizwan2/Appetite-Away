
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeliveryRequest } from '../../types';
import TabFilter from '../shared/TabFilter';
import { MOCK_DELIVERIES } from '../../data/mockData';

const DeliveryCard: React.FC<{ delivery: DeliveryRequest }> = ({ delivery }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        if (delivery.status === 'Active') {
            navigate(`/rider/delivery/${delivery.id}`);
        }
    };
    
    return (
        <div 
            className={`bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 space-y-2 transition-all duration-200 hover:shadow-md ${delivery.status === 'Active' ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 hover:-translate-y-1' : ''}`}
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
        >
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{delivery.restaurantName}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Order #{delivery.orderId}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${delivery.status === 'Active' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'}`}>
                    {delivery.status}
                </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Payout: <span className="font-semibold">Rs. {delivery.payout.toFixed(2)}</span></p>
            <p className="text-xs text-slate-500 dark:text-slate-400">To: {delivery.customerAddress}</p>
        </div>
    );
};

const RiderDeliveries: React.FC = () => {
    const [view, setView] = useState<'Active' | 'History'>('Active');

    const activeDeliveries = MOCK_DELIVERIES.filter(d => d.status === 'Active');
    const pastDeliveries = MOCK_DELIVERIES.filter(d => d.status === 'Completed');

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">My Deliveries</h2>
            
            <TabFilter 
                options={[`Active (${activeDeliveries.length})`, `History (${pastDeliveries.length})`]}
                activeOption={view === 'Active' ? `Active (${activeDeliveries.length})` : `History (${pastDeliveries.length})`}
                onOptionClick={(option) => setView(option.startsWith('Active') ? 'Active' : 'History')}
            />

            <div className="space-y-3">
                {view === 'Active' && (
                    activeDeliveries.length > 0 ? (
                        activeDeliveries.map(d => <DeliveryCard key={d.id} delivery={d} />)
                    ) : (
                        <p className="text-center text-slate-500 dark:text-slate-400 py-8">No active deliveries.</p>
                    )
                )}
                {view === 'History' && (
                    pastDeliveries.length > 0 ? (
                        pastDeliveries.map(d => <DeliveryCard key={d.id} delivery={d} />)
                    ) : (
                        <p className="text-center text-slate-500 dark:text-slate-400 py-8">No completed deliveries yet.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default RiderDeliveries;