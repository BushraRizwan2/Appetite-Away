

import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMockOrderById } from '../../data/mockData.ts';
import { OrderStatus } from '../../types.ts';
import Button from '../shared/Button.tsx';
import { ICONS } from '../../constants.tsx';
import ChatModal from '../shared/ChatModal.tsx';

const statusTimeline = [
    { status: OrderStatus.Preparing, label: "Order is being prepared", icon: "🍳" },
    { status: OrderStatus.ReadyForPickup, label: "Ready for pickup", icon: "🛍️" },
    { status: OrderStatus.OutForDelivery, label: "On the way", icon: "🛵" },
    { status: OrderStatus.Delivered, label: "Delivered", icon: "🎉" },
];

const BillDetails: React.FC<{ bill: any, items: any[] }> = ({ bill, items }) => {
    return (
        <div className="py-2 px-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <h4 className="font-bold text-lg mb-2">Order Summary</h4>
            <div className="space-y-2 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                {items.map(item => (
                    <div key={item.cartItemId} className="flex justify-between text-sm">
                        <span className="text-slate-700 dark:text-slate-300">{item.quantity} x {item.name}</span>
                        <span className="text-slate-800 dark:text-slate-200">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="space-y-1">
                <div className="flex justify-between text-sm"><span className="text-slate-500 dark:text-slate-400">Subtotal</span><span>Rs. {bill.subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-500 dark:text-slate-400">Delivery Fee</span><span>Rs. {bill.deliveryFee.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-500 dark:text-slate-400">Service Fee</span><span>Rs. {bill.serviceFee.toFixed(2)}</span></div>
                {bill.discount < 0 && <div className="flex justify-between text-sm text-green-600 dark:text-green-400"><span >Discount</span><span>- Rs. {Math.abs(bill.discount).toFixed(2)}</span></div>}
                <div className="flex justify-between font-bold pt-2 border-t border-slate-200 dark:border-slate-700"><span >Total</span><span>Rs. {bill.total.toFixed(2)}</span></div>
            </div>
        </div>
    );
};

const TrackOrderPage: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();
    const order = getMockOrderById(orderId || '');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const currentStatusIndex = useMemo(() => {
        if (!order) return -1;
        return statusTimeline.findIndex(s => s.status === order.status);
    }, [order]);

    if (!order) {
        return (
            <div className="p-6 text-center h-screen flex flex-col justify-center items-center">
                <h1 className="text-xl font-bold">Order not found</h1>
                <Button onClick={() => navigate('/customer/orders')} className="mt-4">Back to Orders</Button>
            </div>
        );
    }
    
    const isOrderActive = order.status === OrderStatus.OutForDelivery;

    return (
        <div className="h-full w-full bg-slate-100 dark:bg-slate-900 flex flex-col overflow-hidden">
             <style>{`
                @keyframes rider-move {
                    from { motion-offset: 0%; }
                    to { motion-offset: 100%; }
                }
                .rider-animation {
                    offset-path: path('M30,80 C100,20 150,150 270,70');
                    animation: rider-move 30s linear infinite;
                }
            `}</style>
            
            <ChatModal
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                recipientName={order.riderInfo?.name || 'Rider'}
                orderId={order.id}
                isChatActive={isOrderActive}
            />

            {/* Map Area */}
            <div className="relative w-full h-1/2 flex-shrink-0">
                 <img src="https://images.pexels.com/photos/224960/pexels-photo-224960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="City map" className="w-full h-full object-cover" />
                 {isOrderActive && order.riderInfo && (
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 150">
                        {/* The route */}
                        <path d="M30,80 C100,20 150,150 270,70" stroke="#E21B7C" strokeWidth="3" fill="none" strokeDasharray="5 5" />
                        
                        {/* Restaurant Icon */}
                        <g transform="translate(20, 70)">
                           <circle cx="10" cy="10" r="12" fill="white" stroke="#E21B7C" strokeWidth="2" />
                           <text x="10" y="14" textAnchor="middle" fontSize="12">🛍️</text>
                        </g>

                        {/* Customer Icon */}
                        <g transform="translate(265, 60)">
                            <circle cx="5" cy="10" r="12" fill="white" stroke="#E21B7C" strokeWidth="2" />
                            <text x="5" y="14" textAnchor="middle" fontSize="12">🏠</text>
                        </g>
                        
                        {/* Rider Icon with animation */}
                        <g className="rider-animation">
                             <circle cx="0" cy="0" r="12" fill="#E21B7C" stroke="white" strokeWidth="2"/>
                             <text x="0" y="4" textAnchor="middle" fontSize="12">🛵</text>
                        </g>
                    </svg>
                 )}
            </div>

            {/* Info Panel */}
            <div className="w-full flex-grow bg-white dark:bg-slate-800 rounded-t-2xl -mt-4 shadow-2xl p-4 flex flex-col overflow-y-auto">
                {/* Arrival time */}
                <div className="text-center mb-4">
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Arriving in</p>
                    <p className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">{order.estimatedArrival}</p>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-4">
                    <div 
                        className="h-2 bg-rose-500 rounded-full transition-all duration-500"
                        style={{ width: `${((currentStatusIndex + 1) / statusTimeline.length) * 100}%` }}
                    ></div>
                </div>
                 <p className="text-center text-sm font-semibold mb-6">{statusTimeline[currentStatusIndex]?.label || "Order Placed"}</p>


                {/* Rider Info */}
                {order.riderInfo && (
                     <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg mb-4">
                        <div className="flex items-center gap-4">
                            <img src={order.riderInfo.avatarUrl} alt={order.riderInfo.name} className="w-14 h-14 rounded-full" />
                            <div className="flex-grow">
                                <p className="font-bold text-slate-800 dark:text-slate-100">{order.riderInfo.name}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    <span className="font-semibold text-amber-500">{ICONS.star} {order.riderInfo.rating}</span> &bull; {order.riderInfo.vehicle} ({order.riderInfo.vehiclePlate})
                                </p>
                            </div>
                             <button onClick={() => setIsChatOpen(true)} className="w-12 h-12 flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-full text-rose-500">
                                {ICONS.chat}
                            </button>
                        </div>
                    </div>
                )}
                
                {/* Order Details Accordion */}
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                    <button onClick={() => setIsDetailsOpen(!isDetailsOpen)} className="w-full flex justify-between items-center p-3 font-semibold">
                       <span>View Order Details</span>
                       <span className={`transform transition-transform ${isDetailsOpen ? 'rotate-180' : ''}`}>{ICONS.chevronDown}</span>
                    </button>
                    {isDetailsOpen && (
                        <div className="p-2">
                             <BillDetails bill={order.bill} items={order.items} />
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky footer for actions */}
            <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
                <Button variant="secondary" fullWidth onClick={() => navigate('/customer/orders')}>
                    View All Orders
                </Button>
            </div>
        </div>
    );
};

export default TrackOrderPage;