import React, { useState } from 'react';
import { MenuItem } from '../../types';
import Button from '../shared/Button';
import { useCart } from '../../hooks/useCart';
import { ICONS } from '../../constants';
import CustomSelect from '../shared/CustomSelect';

interface MenuItemDetailModalProps {
  item: MenuItem;
  onClose: () => void;
}

const MenuItemDetailModal: React.FC<MenuItemDetailModalProps> = ({ item, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [ifUnavailable, setIfUnavailable] = useState<'remove' | 'contact' | 'replace'>('remove');

  const handleAddToCart = () => {
    addToCart(item, quantity, specialInstructions, ifUnavailable);
    onClose();
  };

  const price = item.price.toFixed(2);
  const originalPrice = item.originalPrice?.toFixed(2);
  const discount = item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0;

  const unavailableOptions = [
      { value: 'remove', label: 'Remove it from my order' },
      { value: 'contact', label: 'Contact me' },
      { value: 'replace', label: 'Replace with similar item' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-30 flex items-end md:items-center md:justify-center" aria-modal="true" role="dialog">
      <div className="w-full max-w-sm md:max-w-2xl lg:max-w-4xl h-[95vh] md:h-auto md:max-h-[90vh] bg-slate-100 dark:bg-slate-900 rounded-t-2xl md:rounded-2xl shadow-lg flex flex-col md:flex-row relative transform transition-transform duration-300 animate-slide-up md:animate-fade-in">
        
        {/* Image Section */}
        <div className="h-48 md:h-auto w-full md:w-1/2 lg:w-5/12 relative flex-shrink-0">
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
             <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white z-10"
              aria-label="Close item details"
            >
              {ICONS.close}
            </button>
        </div>

        {/* Content Section */}
        <div className="flex-grow flex flex-col md:w-1/2 lg:w-7/12">
            {/* Scrollable Details */}
            <div className="flex-grow overflow-y-auto no-scrollbar p-6 space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-100">{item.name}</h2>
                
                <div className="flex items-baseline gap-2 flex-wrap">
                    <p className="text-2xl font-bold text-rose-500">Rs. {price}</p>
                    {originalPrice && <p className="text-lg line-through text-slate-400 dark:text-slate-500">Rs. {originalPrice}</p>}
                    {discount > 0 && <p className="px-2 py-0.5 bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-300 text-sm font-semibold rounded-full">{discount}% off</p>}
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                
                <div className="space-y-2">
                    <label htmlFor="special-instructions" className="text-base font-semibold text-slate-800 dark:text-slate-200">Special instructions</label>
                    <p className="text-xs text-slate-500">Any special requests, allergies, or dietary needs?</p>
                    <textarea
                        id="special-instructions"
                        rows={3}
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        placeholder="e.g. No mayo"
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200"
                    />
                </div>

                 <div className="space-y-2">
                    <CustomSelect
                        id="if-unavailable"
                        label="If this item is not available"
                        options={unavailableOptions}
                        value={ifUnavailable}
                        onChange={(value) => setIfUnavailable(value as any)}
                    />
                </div>
            </div>

            {/* Footer with actions */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 md:dark:bg-slate-900 flex-shrink-0 md:rounded-br-2xl">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-2xl h-12 w-12 flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-full font-bold transition hover:bg-slate-300 dark:hover:bg-slate-600">-</button>
                        <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)} className="text-2xl h-12 w-12 flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-full font-bold transition hover:bg-slate-300 dark:hover:bg-slate-600">+</button>
                    </div>
                    <Button onClick={handleAddToCart} fullWidth className="py-3.5">
                        Add to Order
                    </Button>
                </div>
            </div>
        </div>

        <style>{`
          @keyframes slide-up {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
           @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95) translateY(0); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
          
          @media (min-width: 768px) {
            .md\\:animate-fade-in {
                animation: fade-in 0.2s ease-out forwards;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default MenuItemDetailModal;