
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order, OrderStatus, CartItem } from '../../types';
import Button from '../shared/Button';
import RateOrderModal from './RateOrderModal';

const MOCK_ITEMS_PIZZA: CartItem[] = [
    { cartItemId: 'ci-p1', id: 'm3', name: 'Pepperoni Pizza', description: '', price: 14.99, imageUrl: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Pizza', quantity: 1, originalPrice: 18.00 }
];
const MOCK_ITEMS_BURGER: CartItem[] = [
    { cartItemId: 'ci-b1', id: 'm-b1', name: 'Classic Burger', description: '', price: 18.50, imageUrl: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Burgers', quantity: 1 },
    { cartItemId: 'ci-b2', id: 'm-f1', name: 'Fries', description: '', price: 4.00, imageUrl: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Sides', quantity: 1 }
];
const MOCK_ITEMS_TACO: CartItem[] = [
    { cartItemId: 'ci-t1', id: 'm-t1', name: 'Tacos', description: '', price: 6.50, imageUrl: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Tacos', quantity: 2 },
    { cartItemId: 'ci-t2', id: 'm-n1', name: 'Nachos', description: '', price: 2.75, imageUrl: 'https://images.pexels.com/photos/2092916/pexels-photo-2092916.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Sides', quantity: 1 }
];
const MOCK_ITEMS_THAI: CartItem[] = [
     { cartItemId: 'ci-th1', id: 'm-th1', name: 'Pad Thai', description: '', price: 16.00, imageUrl: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Noodles', quantity: 1 }
];

const MOCK_ORDERS: Order[] = [
    { 
        id: 'ORD124', 
        customerId: 'cust-bob',
        customerName: 'Bob',
        restaurantName: 'Burger Barn', 
        items: MOCK_ITEMS_BURGER, 
        status: OrderStatus.OutForDelivery,
        date: '2024-05-21',
        deliveryAddress: '101 Maple Rd, Flavor Town',
        restaurantAddress: '789 Pine Ln, Grillville',
        estimatedArrival: '5-10 min',
        bill: { subtotal: 22.50, deliveryFee: 2.50, serviceFee: 1.00, discount: 0, total: 26.00 },
        riderInfo: { name: 'Muhammad', vehicle: 'Motorbike', vehiclePlate: 'KHI-1234', rating: 4.9, avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300' }
    },
    { 
        id: 'ORD123', 
        customerId: 'cust-alice',
        customerName: 'Alice',
        restaurantName: 'Pizza Palace', 
        items: MOCK_ITEMS_PIZZA, 
        status: OrderStatus.Delivered, 
        date: '2024-05-20',
        deliveryAddress: '456 Oak Ave, Salsa City',
        restaurantAddress: '123 Main St, Anytown',
        estimatedArrival: 'Delivered',
        bill: { subtotal: 14.99, deliveryFee: 3.00, serviceFee: 1.00, discount: -3.01, total: 15.98 },
    },
    { 
        id: 'ORD125', 
        customerId: 'cust-charlie',
        customerName: 'Charlie',
        restaurantName: 'Taco Town', 
        items: MOCK_ITEMS_TACO, 
        status: OrderStatus.Preparing, 
        date: '2024-05-21',
        deliveryAddress: '654 Birch Blvd, Flavor Town',
        restaurantAddress: '789 Fiesta Street, Salsa City',
        estimatedArrival: '20-25 min',
        bill: { subtotal: 15.75, deliveryFee: 2.00, serviceFee: 0.50, discount: 0, total: 18.25 },
    },
    { 
        id: 'ORD126', 
        customerId: 'cust-dana',
        customerName: 'Dana',
        restaurantName: 'The Golden Spoon', 
        items: MOCK_ITEMS_THAI, 
        status: OrderStatus.Cancelled, 
        date: '2024-05-19',
        deliveryAddress: '888 Wok St, Noodle City',
        restaurantAddress: '456 Noodle Way, Flavor Town',
        estimatedArrival: 'Cancelled',
        bill: { subtotal: 16.00, deliveryFee: 2.00, serviceFee: 0.50, discount: 0, total: 18.50 },
    },
];

export const getMockOrderById = (id: string) => MOCK_ORDERS.find(o => o.id === id);


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
