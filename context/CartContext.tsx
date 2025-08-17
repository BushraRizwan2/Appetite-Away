
import React, { createContext, useState, useMemo } from 'react';
import { CartItem, MenuItem } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem, quantity: number, specialInstructions: string, ifUnavailable: 'remove' | 'contact' | 'replace') => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  platformFee: number;
  total: number;
  orderType: 'delivery' | 'pickup';
  setOrderType: (type: 'delivery' | 'pickup') => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');

  const addToCart = (item: MenuItem, quantity: number, specialInstructions: string, ifUnavailable: 'remove' | 'contact' | 'replace') => {
    const newCartItem: CartItem = {
      ...item,
      quantity,
      specialInstructions,
      ifUnavailable,
      cartItemId: `${item.id}-${new Date().getTime()}` // Simple unique ID for each addition
    };
    setCartItems(prevItems => [...prevItems, newCartItem]);
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems(prevItems => prevItems.filter(i => i.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(i => (i.cartItemId === cartItemId ? { ...i, quantity } : i))
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const deliveryFee = useMemo(() => {
    if (orderType === 'pickup' || cartItems.length === 0) {
        return 0;
    }
    // Fixed delivery fee for simulation
    return 99.00;
  }, [cartItems, orderType]);

  const platformFee = useMemo(() => {
      if (cartItems.length === 0) return 0;
      return 12.99;
  }, [cartItems]);

  const tax = useMemo(() => {
      if (cartItems.length === 0) return 0;
      return subtotal * 0.05; // 5% tax
  }, [subtotal, cartItems]);

  const total = useMemo(() => {
    return subtotal + deliveryFee + tax + platformFee;
  }, [subtotal, deliveryFee, tax, platformFee]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        deliveryFee,
        tax,
        platformFee,
        total,
        orderType,
        setOrderType,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};