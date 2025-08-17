
import React, { useState } from 'react';
import { Order, OrderStatus } from '../../types';
import ShopOrderCard from './ShopOrderCard';
import TabFilter from '../shared/TabFilter';
import { MOCK_SHOP_ORDERS } from '../../data/mockData';

const EmptyOrdersState: React.FC = () => (
    <div className="text-center text-slate-500 dark:text-slate-400 py-16 flex flex-col items-center">
        <svg className="w-24 h-24 text-rose-100 dark:text-rose-900/50 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">All caught up!</h3>
        <p className="text-sm">There are no orders in this category right now.</p>
    </div>
);

const ShopkeeperOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>(MOCK_SHOP_ORDERS);
    const [filter, setFilter] = useState('Incoming');

    const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
        // In a real app, this would be an API call
        console.log(`Updated order ${orderId} to ${newStatus}`);
    };

    const filteredOrders = orders.filter(order => {
        if (filter === 'Incoming') return order.status === OrderStatus.Incoming;
        if (filter === 'Active') return [OrderStatus.Preparing, OrderStatus.ReadyForPickup, OrderStatus.OutForDelivery].includes(order.status);
        if (filter === 'Completed') return [OrderStatus.Delivered, OrderStatus.Cancelled, OrderStatus.Rejected].includes(order.status);
        return true;
    });

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200">Manage Orders</h1>

            <TabFilter
                options={['Incoming', 'Active', 'Completed']}
                activeOption={filter}
                onOptionClick={setFilter}
            />

            <div className="space-y-4">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => (
                        <ShopOrderCard key={order.id} order={order} onUpdateStatus={handleUpdateStatus} />
                    ))
                ) : (
                    <EmptyOrdersState />
                )}
            </div>
        </div>
    );
};

export default ShopkeeperOrders;