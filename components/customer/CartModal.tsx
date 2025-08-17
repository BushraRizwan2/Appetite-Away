import React from 'react';
import Modal from '../shared/Modal';
import { useCart } from '../../hooks/useCart';
import Button from '../shared/Button';
import { CartItem } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { ICONS } from '../../constants';
import { useNavigate } from 'react-router-dom';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();
    return (
        <div className="py-3">
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{item.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Rs. {item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-md">
                        <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="px-2 py-1 text-lg font-bold">-</button>
                        <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="px-2 py-1 text-lg font-bold">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.cartItemId)} className="text-red-500 hover:text-red-700 text-xs">Remove</button>
                </div>
            </div>
            {item.specialInstructions && (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-1 pl-1">
                    &quot;{item.specialInstructions}&quot;
                </p>
            )}
        </div>
    );
};

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
    const { cartItems, subtotal, deliveryFee, tax, platformFee, total, orderType } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!user) {
            alert('Please log in to place an order.');
            return;
        }

        if(cartItems.length > 0) {
            onClose(); // Close the modal before navigating
            navigate('/customer/checkout');
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
           <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">My Cart</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-rose-500 p-1 -m-1">{ICONS.close}</button>
                </div>
                
                <div className="flex-grow p-4 overflow-y-auto">
                    {cartItems.length > 0 ? (
                        <>
                            <div className="divide-y divide-slate-200 dark:divide-slate-700 no-scrollbar">
                                {cartItems.map(item => <CartItemRow key={item.cartItemId} item={item} />)}
                            </div>

                            <div className="mt-6 space-y-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                                <div className="flex justify-between text-sm">
                                    <p className="text-slate-600 dark:text-slate-400">Subtotal</p>
                                    <p className="font-semibold text-slate-800 dark:text-slate-200">Rs. {subtotal.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <p className="text-slate-600 dark:text-slate-400">Delivery Fee</p>
                                    <p className="font-semibold text-slate-800 dark:text-slate-200">Rs. {deliveryFee.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <p className="text-slate-600 dark:text-slate-400">Service Fee & Tax</p>
                                    <p className="font-semibold text-slate-800 dark:text-slate-200">Rs. {(platformFee + tax).toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between text-lg font-bold pt-2 border-t border-slate-200 dark:border-slate-700 mt-2">
                                    <p className="text-slate-800 dark:text-slate-200">Total ({orderType})</p>
                                    <p className="text-rose-500">Rs. {total.toFixed(2)}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-slate-500 dark:text-slate-400 py-10 flex flex-col items-center">
                            <svg className="w-24 h-24 text-rose-100 dark:text-rose-900/50 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Your cart is empty</h3>
                            <p className="text-sm">Add some delicious food to get started!</p>
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
                        <Button fullWidth onClick={handleCheckout} className="py-3">
                            {user ? 'Proceed to Checkout' : 'Login to Order'}
                        </Button>
                    </div>
                )}
           </div>
        </Modal>
    );
};

export default CartModal;
