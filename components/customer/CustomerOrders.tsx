
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order, OrderStatus } from '../../types';
import Button from '../shared/Button';
import RateOrderModal from './RateOrderModal';
import { MOCK_ORDERS } from '../../data/mockData';

const statusStyles: { [key in OrderStatus]: string } = {
    [OrderStatus.Delivered]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    [OrderStatus.OutForDelivery]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    [OrderStatus.Preparing]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    [OrderStatus.Cancelled]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    [OrderStatus.Incoming]: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    [OrderStatus.ReadyForPickup]: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
    [OrderStatus.Rejected]: 'bg-red-200 text-red-900 dark:bg-red-900 dark:text-red-200',
};

const OrderCard: React.FC<{ order: Order; onRateOrder: (order: Order) => void }> = ({ order, onRateOrder }) => {
    const navigate = useNavigate();

    const handleAction = () => {
        if (order.status === OrderStatus.Delivered) {
            onRateOrder(order);
        } else if (order.status === OrderStatus.Cancelled) {
            // Reorder logic would go here
            alert('Reordering ' + order.items.map(i => i.name).join(', '));
        } else {
            navigate(`/customer/track/${order.id}`);
        }
    }

    const getActionText = () => {
        switch (order.status) {
            case OrderStatus.Delivered: return 'Rate Your Experience';
            case OrderStatus.Cancelled: return 'Order Again';
            default: return 'Track Your Order';
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 space-y-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">{order.restaurantName}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Order #{order.id} &bull; {order.date}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[order.status]}`}>
                    {order.status}
                </span>
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-300">
                {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                <p className="font-semibold text-slate-800 dark:text-slate-200">Rs. {order.bill.total?.toFixed(2)}</p>
                <Button variant="secondary" onClick={handleAction}>
                    {getActionText()}
                </Button>
            </div>
        </div>
    );
}

const CustomerOrders: React.FC = () => {
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const handleOpenRatingModal = (order: Order) => {
        setSelectedOrder(order);
        setIsRatingModalOpen(true);
    };

    const handleCloseRatingModal = () => {
        setIsRatingModalOpen(false);
        setSelectedOrder(null);
    };

    return (
        <>
            <div className="p-4 space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200">My Orders</h2>
                {MOCK_ORDERS.map(order => (
                    <OrderCard key={order.id} order={order} onRateOrder={handleOpenRatingModal} />
                ))}
            </div>
            {selectedOrder && (
                <RateOrderModal 
                    isOpen={isRatingModalOpen}
                    onClose={handleCloseRatingModal}
                    order={selectedOrder}
                />
            )}
        </>
    );
};

export default CustomerOrders;