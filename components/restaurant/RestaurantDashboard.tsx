
import React, { useState, useEffect } from 'react';
import { Order, OrderStatus, Review } from '../../types';
import OrderCard from './OrderCard';
import Button from '../shared/Button';
import { ICONS } from '../../constants';
import { Link } from 'react-router-dom';
import ChartPlaceholder from '../shared/ChartPlaceholder';
import { MOCK_RESTAURANT_ORDERS, MOCK_REVIEWS_SUMMARY } from '../../data/mockData';

const MetricCard: React.FC<{ title: string; value: string; icon: React.ReactNode; }> = ({ title, value, icon }) => (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm flex items-center gap-4 transition-transform duration-300 hover:scale-105 cursor-pointer">
        <div className="p-3 bg-rose-100 dark:bg-rose-900/50 text-rose-500 rounded-lg">
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 break-words">{title}</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 break-words">{value}</p>
        </div>
    </div>
);

const RestaurantDashboard: React.FC = () => {
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [orders, setOrders] = useState<Order[]>(MOCK_RESTAURANT_ORDERS);

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus, details?: {reason?: string, prepTime?: number}) => {
    // In a real app, this would be an API call
    console.log(`Updating order ${orderId} to ${newStatus} with details:`, details);
    alert(`Order #${orderId} status updated to: ${newStatus}`);
    
    // For demo purposes, we'll remove incoming orders once actioned
    if (newStatus === OrderStatus.Preparing || newStatus === OrderStatus.Rejected) {
        setOrders(prev => prev.filter(o => o.id !== orderId));
    }
  };

  const incomingOrders = orders.filter(o => o.status === OrderStatus.Incoming);

  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Orders & Actions */}
        <div className="lg:col-span-1 space-y-6">
            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Store Status</h2>
                    <p className={`text-sm font-semibold ${isStoreOpen ? 'text-emerald-500' : 'text-red-500'}`}>
                    {isStoreOpen ? 'Open & Accepting Orders' : 'Closed / Paused'}
                    </p>
                </div>
                <Button onClick={() => setIsStoreOpen(!isStoreOpen)} variant={isStoreOpen ? 'warning' : 'success'}>
                    {isStoreOpen ? 'Pause' : 'Go Online'}
                </Button>
                </div>
            </div>
            
            <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Incoming Orders ({incomingOrders.length})
                </h3>
                {isStoreOpen && incomingOrders.length > 0 ? (
                    <div className="space-y-4">
                        {incomingOrders.map(order => <OrderCard key={order.id} order={order} onUpdateStatus={handleUpdateOrderStatus} />)}
                    </div>
                ) : (
                    <div className="text-center text-slate-500 dark:text-slate-400 py-8 px-4 bg-white dark:bg-slate-800 rounded-lg">
                        <div className="text-4xl mb-2">🎉</div>
                        <p>{isStoreOpen ? 'All caught up! No new orders.' : 'Store is closed.'}</p>
                    </div>
                )}
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Quick Actions</h3>
                <div className="space-y-2">
                    <Link to="/restaurant/menu"><Button fullWidth variant="secondary">Manage Menu</Button></Link>
                    <Link to="/restaurant/business/promotions"><Button fullWidth variant="secondary">Create Promotion</Button></Link>
                </div>
            </div>
        </div>

        {/* Right Column: Analytics & Reviews */}
        <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MetricCard title="Today's Sales" value="Rs. 12,250" icon={ICONS.currencyRupee} />
                <MetricCard title="Order Volume" value="42" icon={ICONS.orders} />
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
                 <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-4">Performance Snapshot</h3>
                 <ChartPlaceholder />
            </div>

             <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Recent Reviews</h3>
                    <Link to="/restaurant/business/reviews" className="text-sm font-semibold text-rose-500 hover:underline">View all</Link>
                </div>
                <div className="space-y-3">
                    {MOCK_REVIEWS_SUMMARY.map(review => (
                        <div key={review.id} className="border-t border-slate-100 dark:border-slate-700 pt-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold">{review.author}</span>
                                <span className="flex items-center gap-1">{ICONS.star} {review.rating}</span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 italic">"{review.comment}"</p>
                        </div>
                    ))}
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;