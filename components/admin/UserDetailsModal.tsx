import React, { useState, useMemo } from 'react';
import { User, Order, OrderStatus } from '../../types';
import { mockOrders } from './mockOrders';
import { ICONS } from '../../constants';

interface UserDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
}

const DetailSection: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="py-2">
        <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">{title}</h4>
        <div className="text-sm text-slate-700 dark:text-slate-300 space-y-2">{children}</div>
    </div>
);

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ isOpen, onClose, user }) => {
    const userOrders = useMemo(() => mockOrders.filter(o => o.customerId === user.id), [user.id]);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(userOrders.length > 0 ? userOrders[0].id : null);
    const selectedOrder = useMemo(() => userOrders.find(o => o.id === selectedOrderId), [userOrders, selectedOrderId]);

    if (!isOpen) return null;

    const statusColors: Record<OrderStatus, string> = {
        [OrderStatus.Delivered]: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
        [OrderStatus.OutForDelivery]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
        [OrderStatus.Preparing]: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
        [OrderStatus.Cancelled]: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
        [OrderStatus.Rejected]: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
        [OrderStatus.Incoming]: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
        [OrderStatus.ReadyForPickup]: 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300',
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4" 
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-slate-800 shadow-xl w-full max-w-6xl rounded-2xl h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">User Details</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-rose-500 p-1 -m-1">{ICONS.close}</button>
                </header>

                <div className="flex flex-grow min-h-0">
                    {/* Left Pane: User Info & Order List */}
                    <aside className="w-1/3 border-r border-slate-200 dark:border-slate-700 flex flex-col">
                        <div className="p-4 space-y-3 border-b border-slate-200 dark:border-slate-700">
                             <div className="flex items-center gap-4">
                                <img src={user.avatarUrl} alt={user.name} className="w-16 h-16 rounded-full" />
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">{user.name}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{user.phone}</p>
                                </div>
                            </div>
                            <div className="text-xs flex gap-4">
                                <div><span className="font-semibold">Status:</span> <span className={`px-2 py-0.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}`}>{user.status}</span></div>
                                <div><span className="font-semibold">Joined:</span> {user.joinedDate}</div>
                            </div>
                        </div>
                        <div className="flex-grow overflow-y-auto">
                            <h4 className="font-semibold p-4 pb-2 text-slate-700 dark:text-slate-300">Order History ({userOrders.length})</h4>
                            <nav className="p-2 space-y-1">
                                {userOrders.map(order => (
                                    <button 
                                        key={order.id} 
                                        onClick={() => setSelectedOrderId(order.id)}
                                        className={`w-full text-left p-3 rounded-lg flex justify-between items-center transition-colors ${selectedOrderId === order.id ? 'bg-rose-50 dark:bg-rose-900/40' : 'hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}
                                    >
                                        <div>
                                            <p className={`font-semibold text-sm ${selectedOrderId === order.id ? 'text-rose-600 dark:text-rose-300' : 'text-slate-800 dark:text-slate-200'}`}>Order #{order.id}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{order.date} &bull; {order.restaurantName}</p>
                                        </div>
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[order.status]}`}>{order.status}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Right Pane: Selected Order Details */}
                    <main className="w-2/3 flex-grow overflow-y-auto p-6 space-y-4">
                        {selectedOrder ? (
                            <>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Order #{selectedOrder.id}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{selectedOrder.date} &bull; Total: Rs. {selectedOrder.bill.total.toFixed(2)}</p>
                                    </div>
                                    <span className={`text-sm font-semibold px-3 py-1.5 rounded-full ${statusColors[selectedOrder.status]}`}>{selectedOrder.status}</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                                    <DetailSection title="Items Ordered">
                                        <ul className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                            {selectedOrder.items.map(item => (
                                                <li key={item.cartItemId} className="flex justify-between py-1">
                                                    <span>{item.quantity}x {item.name}</span>
                                                    <span className="font-semibold">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </DetailSection>

                                    <DetailSection title="Payment & Bill">
                                        <div className="space-y-1">
                                            <div className="flex justify-between"><span className="text-slate-500">Subtotal:</span><span>Rs. {selectedOrder.bill.subtotal.toFixed(2)}</span></div>
                                            <div className="flex justify-between"><span className="text-slate-500">Delivery Fee:</span><span>Rs. {selectedOrder.bill.deliveryFee.toFixed(2)}</span></div>
                                            {selectedOrder.bill.discount !== 0 && <div className="flex justify-between"><span className="text-slate-500">Discount:</span><span className="text-emerald-500">- Rs. {Math.abs(selectedOrder.bill.discount).toFixed(2)}</span></div>}
                                            <div className="flex justify-between font-bold pt-1 border-t border-slate-200 dark:border-slate-700"><span >Total:</span><span>Rs. {selectedOrder.bill.total.toFixed(2)}</span></div>
                                            <div className="flex justify-between pt-2"><span className="text-slate-500">Method:</span><span className="font-semibold">{selectedOrder.paymentMethod}</span></div>
                                        </div>
                                    </DetailSection>

                                    <DetailSection title="Restaurant & Rider">
                                        <p><strong>From:</strong> {selectedOrder.restaurantName}</p>
                                        <p><strong>Phone:</strong> <a href={`tel:${selectedOrder.restaurantPhone}`} className="text-rose-500 hover:underline">{selectedOrder.restaurantPhone}</a></p>
                                        {selectedOrder.riderInfo && (
                                            <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-700">
                                                <p><strong>Rider:</strong> {selectedOrder.riderInfo.name}</p>
                                                <p><strong>Phone:</strong> <a href={`tel:${selectedOrder.riderInfo.phone}`} className="text-rose-500 hover:underline">{selectedOrder.riderInfo.phone}</a></p>
                                            </div>
                                        )}
                                    </DetailSection>

                                    <DetailSection title="Notes & Instructions">
                                        {selectedOrder.notesForRestaurant && <p><strong>For Restaurant:</strong> "{selectedOrder.notesForRestaurant}"</p>}
                                        {selectedOrder.notesForRider && <p><strong>For Rider:</strong> "{selectedOrder.notesForRider}"</p>}
                                        {!selectedOrder.notesForRestaurant && !selectedOrder.notesForRider && <p className="text-slate-500 italic">No special instructions provided.</p>}
                                    </DetailSection>
                                </div>
                                
                                <DetailSection title="Chat History with Rider">
                                    <div className="space-y-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg max-h-64 overflow-y-auto">
                                        {selectedOrder.chatHistory && selectedOrder.chatHistory.length > 0 ? selectedOrder.chatHistory.map((chat, index) => (
                                            <div key={index} className={`flex items-end gap-2 ${chat.sender === 'Customer' ? 'flex-row-reverse' : ''}`}>
                                                <div className={`p-2 rounded-lg max-w-xs ${chat.sender === 'Customer' ? 'bg-rose-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                                    <p>{chat.text}</p>
                                                    <p className="text-xs text-right opacity-70 mt-1">{chat.timestamp}</p>
                                                </div>
                                            </div>
                                        )) : <p className="text-slate-500 italic text-center py-4">No chat history for this order.</p>}
                                    </div>
                                </DetailSection>

                            </>
                        ) : (
                             <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 dark:text-slate-400">
                                <span className="text-5xl mb-4">{ICONS.orders}</span>
                                <h3 className="font-bold text-lg text-slate-700 dark:text-slate-200">No Order Selected</h3>
                                <p>Select an order from the list on the left to see its details.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsModal;