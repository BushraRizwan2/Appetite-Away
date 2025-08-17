
import React from 'react';
import { useCart } from '../../hooks/useCart';
import { ICONS } from '../../constants';
import Icon from '../shared/Icon';

interface CartIconProps {
  onClick: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ onClick }) => {
  const { cartCount } = useCart();

  return (
    <button onClick={onClick} className="relative text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400">
      <Icon>{ICONS.cart}</Icon>
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 rounded-full bg-rose-500 text-white text-xs font-bold">
          {cartCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;