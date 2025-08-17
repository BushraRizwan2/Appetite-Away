import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../context/NotificationContext';
import { ICONS } from '../../constants';
import Button from '../shared/Button';
import Spinner from '../shared/Spinner';
import { CartItem } from '../../types';

const OrderItem: React.FC<{ item: CartItem }> = ({ item }) => (
    <div className="flex justify-between items-start py-2">
        <div className="flex gap-3">
            <span className="font-semibold text-sm">{item.quantity}x</span>
            <div>
                <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">{item.name}</p>
                {item.specialInstructions && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                        &quot;{item.specialInstructions}&quot;
                    </p>
                )}
            </div>
        </div>
        <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">Rs. {(item.price * item.quantity).toFixed(2)}</p>
    </div>
);

const CheckoutSuccessScreen: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen flex flex-col items-center justify-center p-4 text-center">
            <div className="text-rose-500 animate-pulse">{ICONS.confetti}</div>
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-4">Order Placed!</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-md">
                Thank you for your order. The restaurant has received it and will start preparing it shortly. You can track the progress in your orders section.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button variant="primary" onClick={() => navigate('/customer/track/ORD124')}>
                    Track Your Order
                </Button>
                <Button variant="secondary" onClick={() => navigate('/customer/dashboard')}>
                    Continue Shopping
                </Button>
            </div>
        </div>
    );
};


const CheckoutConfirmation: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { cartItems, subtotal, deliveryFee, tax, platformFee, total, clearCart } = useCart();
    const { showNotification } = useNotification();
    const [isLoading, setIsLoading] = useState(false);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    // Mock data for display purposes
    const deliveryAddress = "A 137 Street No 6, Karachi";
    const paymentMethod = { type: 'Cash on Delivery', details: 'Pay upon arrival' };
    const restaurantName = "The Golden Spoon"; // Mock name

    if (cartItems.length === 0 && !isOrderPlaced) {
        // Redirect if cart is empty and order hasn't just been placed
        setTimeout(() => navigate('/customer/home'), 100);
        return <div className="h-screen w-screen flex items-center justify-center"><Spinner /></div>;
    }

    const handlePlaceOrder = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsOrderPlaced(true);
            showNotification('Order placed successfully!', 'success');
            clearCart();
            // Show success screen instead of navigating immediately
        }, 2000);
    };

    if (isOrderPlaced) {
        return <CheckoutSuccessScreen />;
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen flex flex-col">
            <header className="sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm z-10 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-4xl mx-auto px-4 flex items-center h-16">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-600 dark:text-slate-300">
                        {ICONS.chevronLeft}
                    </button>
                    <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 ml-4">Confirm Order</h1>
                </div>
            </header>

            <main className="flex-grow overflow-y-auto p-4 md:p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Delivery & Payment Details */}
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Delivery Details</h3>
                                <div className="flex items-start gap-2 mt-2 text-sm text-slate-600 dark:text-slate-400">
                                    <span className="mt-1">{ICONS.address}</span>
                                    <div>
                                        <p className="font-semibold text-slate-700 dark:text-slate-300">{user?.name}</p>
                                        <p>{deliveryAddress}</p>
                                        <p>{user?.phone}</p>
                                    </div>
                                </div>
                            </div>
                            <Button variant="secondary" onClick={() => navigate('/customer/profile/address-book')}>Change</Button>
                        </div>
                        <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex justify-between items-start">
                             <div>
                                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Payment</h3>
                                 <div className="flex items-center gap-2 mt-2 text-sm text-slate-600 dark:text-slate-400">
                                    <span>{ICONS.payment}</span>
                                    <div>
                                        <p className="font-semibold text-slate-700 dark:text-slate-300">{paymentMethod.type}</p>
                                        <p>{paymentMethod.details}</p>
                                    </div>
                                </div>
                            </div>
                            <Button variant="secondary" onClick={() => navigate('/customer/profile/payment-methods')}>Change</Button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Your Order from {restaurantName}</h3>
                        <div className="divide-y divide-slate-200 dark:divide-slate-700">
                            {cartItems.map(item => <OrderItem key={item.cartItemId} item={item} />)}
                        </div>
                        <div className="space-y-1 pt-4 mt-4 border-t border-slate-200 dark:border-slate-700 text-sm">
                             <div className="flex justify-between">
                                <p className="text-slate-600 dark:text-slate-400">Subtotal</p>
                                <p className="font-medium text-slate-800 dark:text-slate-200">Rs. {subtotal.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-slate-600 dark:text-slate-400">Delivery Fee</p>
                                <p className="font-medium text-slate-800 dark:text-slate-200">Rs. {deliveryFee.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-slate-600 dark:text-slate-400">Service fee & Tax</p>
                                <p className="font-medium text-slate-800 dark:text-slate-200">Rs. {(platformFee + tax).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
            {/* Footer */}
            <footer className="sticky bottom-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm z-10 p-4 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-lg font-bold text-slate-800 dark:text-slate-200">Total</p>
                        <p className="text-lg font-bold text-rose-500 dark:text-rose-400">Rs. {total.toFixed(2)}</p>
                    </div>
                    <Button fullWidth onClick={handlePlaceOrder} disabled={isLoading}>
                        {isLoading ? <Spinner size="sm" /> : 'Place Order'}
                    </Button>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
                        By placing this order, you agree to our <Link to="#" className="underline">Terms & Conditions</Link>.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default CheckoutConfirmation;
