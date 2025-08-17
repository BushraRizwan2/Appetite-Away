
import React, { useRef, useEffect, useState } from 'react';
import { MenuItem } from '../../types';
import { useCart } from '../../hooks/useCart';

interface MenuItemCardProps {
    item: MenuItem;
    onSelectItem: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onSelectItem }) => {
    const { cartItems, addToCart } = useCart();
    const itemsInCart = cartItems.filter(cartItem => cartItem.id === item.id);
    const quantityInCart = itemsInCart.reduce((total, current) => total + current.quantity, 0);

    const [isClamped, setIsClamped] = useState(false);
    const descriptionRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const checkClamp = () => {
            if (descriptionRef.current) {
                setIsClamped(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
            }
        };

        // Initial check and check on resize
        checkClamp();
        window.addEventListener('resize', checkClamp);
        return () => window.removeEventListener('resize', checkClamp);
    }, [item.description]);

    const handleAdd = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(item, 1, '', 'remove');
    };

    return (
        <div
            onClick={onSelectItem}
            className={`bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700/50 flex items-start gap-2 p-2 cursor-pointer group hover:shadow-lg hover:-translate-y-1 hover:border-rose-300 dark:hover:border-rose-700 transition-all duration-200 ${!item.inStock ? 'opacity-60 pointer-events-none' : ''}`}
        >
            {/* Text content */}
            <div className="flex-grow min-w-0">
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 truncate group-hover:text-rose-600 dark:group-hover:text-rose-400">{item.name}</h4>
                <p ref={descriptionRef} className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{item.description}</p>
                {isClamped && (
                    <button 
                        onClick={(e) => { e.stopPropagation(); onSelectItem(); }} 
                        className="text-xs text-rose-500 hover:underline font-semibold"
                    >
                        see more
                    </button>
                )}
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
                    Rs. {item.price.toFixed(2)}
                </p>
            </div>

            {/* Image and button container */}
            <div className="relative flex-shrink-0">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center">
                        <span className="text-xs font-bold text-white transform -rotate-12">OUT OF STOCK</span>
                    </div>
                )}
                {item.inStock && (
                    quantityInCart > 0 ? (
                        <div className="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center bg-rose-500 text-white text-xs font-bold rounded-full shadow-lg border-2 border-white dark:border-slate-800">
                            {quantityInCart}
                        </div>
                    ) : (
                        <button
                            onClick={handleAdd}
                            className="absolute -bottom-1 -right-1 w-7 h-7 flex items-center justify-center bg-white dark:bg-slate-700 text-rose-500 shadow-md rounded-full text-xl font-light transition-transform hover:scale-110"
                            aria-label={`Add ${item.name} to cart`}
                        >
                            +
                        </button>
                    )
                )}
            </div>
        </div>
    );
};

export default MenuItemCard;
