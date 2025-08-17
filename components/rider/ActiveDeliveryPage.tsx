
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMockDeliveryById } from './RiderDeliveries';
import Button from '../shared/Button';
import { ICONS } from '../../constants';
import ChatModal from '../shared/ChatModal';
import Spinner from '../shared/Spinner';

const ActiveDeliveryPage: React.FC = () => {
    const { deliveryId } = useParams<{ deliveryId: string }>();
    const navigate = useNavigate();
    const delivery = getMockDeliveryById(deliveryId || '');
    
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [deliveryStatus, setDeliveryStatus] = useState<'approaching_pickup' | 'approaching_dropoff' | 'delivered'>('approaching_pickup');
    
    if (!delivery) {
        return (
            <div className="p-6 text-center h-screen flex flex-col justify-center items-center">
                <h1 className="text-xl font-bold">Delivery not found</h1>
                <Button onClick={() => navigate('/rider/dashboard')} className="mt-4">Back to Dashboard</Button>
            </div>
        );
    }
    
    const handleStatusUpdate = () => {
        setIsLoading(true);
        setTimeout(() => {
            if (deliveryStatus === 'approaching_pickup') {
                setDeliveryStatus('approaching_dropoff');
            } else if (deliveryStatus === 'approaching_dropoff') {
                setDeliveryStatus('delivered');
                // In a real app, you would also update the order status
            } else {
                 navigate('/rider/dashboard');
            }
            setIsLoading(false);
        }, 1500);
    };

    const actionButtonText = {
        approaching_pickup: 'Confirm Pickup',
        approaching_dropoff: 'Confirm Delivery',
        delivered: 'Back to Dashboard'
    };

    const mapTargetAddress = deliveryStatus === 'approaching_pickup' ? delivery.restaurantAddress : delivery.customerAddress;
    const isOrderActive = deliveryStatus !== 'delivered';

    return (
        <div className="h-full w-full bg-slate-100 dark:bg-gray-900 flex flex-col overflow-hidden">
             <ChatModal
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                recipientName={delivery.customerName}
                orderId={delivery.orderId}
                isChatActive={isOrderActive}
            />
            {/* Map Area */}
            <div className="relative w-full h-2/5 flex-shrink-0 bg-gray-300">
                <iframe
                    title="Navigation Map"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(mapTargetAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full border-0"
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

             {/* Info Panel */}
            <div className="w-full flex-grow bg-white dark:bg-slate-800 rounded-t-2xl -mt-4 shadow-2xl p-4 flex flex-col overflow-y-auto">
                {/* Pickup Address */}
                <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg mb-4">
                    <div className="flex items-start gap-3">
                        <div className="text-xs text-rose-500 font-bold mt-1">PICKUP</div>
                        <div>
                            <p className="font-semibold text-slate-800 dark:text-slate-200">{delivery.restaurantName}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{delivery.restaurantAddress}</p>
                        </div>
                    </div>
                     <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1">
                        <p className="text-sm font-semibold">Items to collect:</p>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300">
                           {delivery.items.map(item => <li key={item.name}>{item.quantity}x {item.name}</li>)}
                        </ul>
                    </div>
                </div>

                {/* Dropoff Address */}
                 <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg mb-4">
                    <div className="flex items-start gap-3">
                        <div className="text-xs text-blue-500 font-bold mt-1">DROPOFF</div>
                        <div>
                            <p className="font-semibold text-slate-800 dark:text-slate-200">{delivery.customerName}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{delivery.customerAddress}</p>
                        </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                        <Button variant="secondary" className="flex-1" onClick={() => setIsChatOpen(true)} disabled={!isOrderActive}>
                            <span className="mr-2">{ICONS.chat}</span> Chat
                        </Button>
                         <a href="tel:+1234567890" className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg font-semibold shadow-md bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 ${!isOrderActive && 'opacity-50 pointer-events-none'}`}>
                             <span className="mr-2">{ICONS.call}</span> Call
                        </a>
                    </div>
                </div>
                
                {/* Action button at the bottom */}
                <div className="mt-auto pt-4">
                    <Button
                        variant={deliveryStatus === 'delivered' ? 'secondary' : 'success'}
                        fullWidth
                        onClick={handleStatusUpdate}
                        disabled={isLoading}
                        className="py-3.5 text-base"
                    >
                       {isLoading ? <Spinner /> : actionButtonText[deliveryStatus]}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ActiveDeliveryPage;
