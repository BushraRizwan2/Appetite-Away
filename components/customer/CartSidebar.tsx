
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { CartItem } from '../../types';
import Button from '../shared/Button';
import { useAuth } from '../../hooks/useAuth';

const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
    const { updateQuantity } = useCart();
    return (
        <div className="flex gap-3 py-4">
            <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-md flex-shrink-0" />
            <div className="flex-grow">
                <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">{item.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Rs. {item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-md h-9 self-center">
                <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="px-2 py-1 text-lg font-bold text-rose-500 flex items-center justify-center h-full">-</button>
                <span className="px-2 text-sm font-semibold">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="px-2 py-1 text-lg font-bold text-rose-500 flex items-center justify-center h-full">+</button>
            </div>
        </div>
    );
};

export const CartSidebar: React.FC = () => {
    const { cartItems, subtotal, deliveryFee, tax, platformFee, total, orderType, setOrderType } = useCart();
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const handleCheckout = () => {
        if (!user) {
            alert('Please log in to proceed to checkout.');
            // This could be enhanced to open the login modal
            return;
        }
        if (cartItems.length > 0) {
            navigate('/customer/checkout');
        }
    };

    return (
        <div className="h-full flex flex-col bg-white dark:bg-slate-800">
            <header className="p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0 bg-white dark:bg-slate-800">
                <div className="p-1 bg-slate-200 dark:bg-slate-700 rounded-lg flex max-w-xs">
                    <button onClick={() => setOrderType('delivery')} className={`w-1/2 py-1.5 rounded-md text-sm font-semibold transition-all ${orderType === 'delivery' ? 'bg-white dark:bg-slate-800 shadow' : 'text-slate-600 dark:text-slate-300'}`}>Delivery</button>
                    <button onClick={() => setOrderType('pickup')} className={`w-1/2 py-1.5 rounded-md text-sm font-semibold transition-all ${orderType === 'pickup' ? 'bg-white dark:bg-slate-800 shadow' : 'text-slate-600 dark:text-slate-300'}`}>Pick-up</button>
                </div>
            </header>

            <div className="flex-grow overflow-y-auto p-4 no-scrollbar">
                {cartItems.length > 0 ? (
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Your Items</h2>
                        <div className="divide-y divide-slate-200 dark:divide-slate-700">
                            {cartItems.map(item => <CartItemRow key={item.cartItemId} item={item} />)}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center h-full">
                         <svg className="w-24 h-24 text-rose-200 dark:text-rose-800/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mt-4">Hungry?</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">You haven't added anything to your cart!</p>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0 space-y-2">
                {cartItems.length > 0 ? (
                    <>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <p className="text-slate-600 dark:text-slate-400">Subtotal</p>
                                <p className="font-medium text-slate-800 dark:text-slate-200">Rs. {subtotal.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-slate-600 dark:text-slate-400">Standard delivery</p>
                                <p className="font-medium text-slate-800 dark:text-slate-200">Rs. {deliveryFee.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-slate-600 dark:text-slate-400">Service fee</p>
                                <p className="font-medium text-slate-800 dark:text-slate-200">Rs. {platformFee.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-slate-600 dark:text-slate-400">GST/Sales Tax</p>
                                <p className="font-medium text-slate-800 dark:text-slate-200">Rs. {tax.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700 mt-2">
                            <p className="text-lg font-bold text-slate-800 dark:text-slate-200">Total</p>
                            <p className="text-lg font-bold text-rose-500 dark:text-rose-400">Rs. {total.toFixed(2)}</p>
                        </div>
                        
                        <Button fullWidth className="mt-4 py-3 text-base bg-[#f43f5e] hover:bg-[#d8314f] text-white" onClick={handleCheckout}>
                            Proceed to Checkout
                        </Button>
                    </>
                ) : (
                    <div className="flex justify-between items-center">
                         <div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Total <span className="text-xs font-normal text-slate-500">(incl. fees and tax)</span></p>
                            <button className="text-xs text-rose-500 font-semibold hover:underline">See summary</button>
                        </div>
                        <p className="text-lg font-bold text-slate-800 dark:text-slate-200">Rs. 0</p>
                    </div>
                )}
            </div>
        </div>
    );
};
