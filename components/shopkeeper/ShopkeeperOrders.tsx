
import React, { useState } from 'react';
import { Order, OrderStatus } from '../../types';
import ShopOrderCard from './ShopOrderCard';
import TabFilter from '../shared/TabFilter';

const MOCK_SHOP_ORDERS: Order[] = [
    {
        id: 'S-101',
        customerId: 'cust-ayesha-k',
        customerName: 'Ayesha K.',
        restaurantName: 'The Corner Store',
        items: [
            { cartItemId: 'si-1', id: 'milk', name: 'Milk 1L', description: '', price: 220, quantity: 2, imageUrl: 'https://placehold.co/100x100/fef2f2/ef4444?text=Milk', inStock: true, category: 'Dairy' },
            { cartItemId: 'si-2', id: 'bread', name: 'Brown Bread', description: '', price: 150, quantity: 1, imageUrl: 'https://placehold.co/100x100/fef2f2/ef4444?text=Bread', inStock: true, category: 'Bakery' },
        ],
        status: OrderStatus.Incoming,
        date: '2024-05-22',
        deliveryAddress: '123 Oak Ave',
        restaurantAddress: 'Shop 4, Market St',
        estimatedArrival: '15-20 min',
        bill: { subtotal: 590, deliveryFee: 50, serviceFee: 10, discount: 0, total: 650 },
    },
    {
        id: 'S-102',
        customerId: 'cust-bilal-m',
        customerName: 'Bilal M.',
        restaurantName: 'The Corner Store',
        items: [
            { cartItemId: 'si-3', id: 'chips', name: 'Potato Chips', description: '', price: 100, quantity: 3, imageUrl: 'https://placehold.co/100x100/fef2f2/ef4444?text=Chips', inStock: true, category: 'Snacks' },
            { cartItemId: 'si-4', id: 'cola', name: 'Cola 1.5L', description: '', price: 180, quantity: 1, imageUrl: 'https://placehold.co/100x100/fef2f2/ef4444?text=Cola', inStock: true, category: 'Beverages' },
        ],
        status: OrderStatus.Preparing,
        date: '2024-05-22',
        deliveryAddress: '456 Pine Ln',
        restaurantAddress: 'Shop 4, Market St',
        estimatedArrival: '10-15 min',
        bill: { subtotal: 480, deliveryFee: 50, serviceFee: 10, discount: 0, total: 540 },
    },
    {
        id: 'S-103',
        customerId: 'cust-sana-j',
        customerName: 'Sana J.',
        restaurantName: 'The Corner Store',
        items: [
            { cartItemId: 'si-5', id: 'apples', name: 'Apples (1kg)', description: '', price: 300, quantity: 1, imageUrl: 'https://placehold.co/100x100/fef2f2/ef4444?text=Apples', inStock: true, category: 'Produce' },
        ],
        status: OrderStatus.ReadyForPickup,
        date: '2024-05-22',
        deliveryAddress: '789 Maple Rd',
        restaurantAddress: 'Shop 4, Market St',
        estimatedArrival: 'Awaiting rider',
        bill: { subtotal: 300, deliveryFee: 50, serviceFee: 10, discount: 0, total: 360 },
        riderInfo: { name: 'Ali Khan', vehicle: 'Motorbike', vehiclePlate: 'KHI-5678', rating: 4.8, avatarUrl: 'https://i.pravatar.cc/150?u=ali' }
    }
];

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
