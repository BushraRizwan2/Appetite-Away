
import React, { useState } from 'react';
import { Restaurant, UserRole } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { ICONS } from '../../constants';

interface RestaurantCardProps {
  restaurant: Restaurant;
  openModal?: (type: 'login' | 'signup', role?: UserRole) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, openModal }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { user } = useAuth();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      openModal?.('login', UserRole.Customer);
    } else {
      setIsFavorited(!isFavorited);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <img 
          src={restaurant.imageUrl} 
          alt={restaurant.name} 
          className="w-full h-24 object-cover" 
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
            {restaurant.promoTags?.map((tag, index) => (
                <span 
                    key={index} 
                    className={`px-1.5 py-0.5 text-[10px] font-bold ${tag.textColor} ${tag.bgColor} rounded-md shadow-lg`}
                >
                    {tag.icon && <span className="mr-1">{tag.icon}</span>}
                    {tag.text}
                </span>
            ))}
        </div>
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-white/80 dark:bg-black/60 rounded-full hover:bg-white dark:hover:bg-black transition-colors"
          aria-label="Favorite restaurant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isFavorited ? 'text-rose-500' : 'text-slate-600 dark:text-slate-300'}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </button>
        {restaurant.isAd && (
          <span className="absolute bottom-2 right-2 bg-slate-900/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            Ad
          </span>
        )}
      </div>
      <div className="p-2">
        <div className="flex justify-between items-start gap-2">
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate pr-1">{restaurant.name}</h4>
            <div className="flex items-center gap-1 flex-shrink-0">
                <span className="text-amber-500 h-4 w-4">{ICONS.star}</span>
                <span className="font-bold text-xs">{restaurant.rating}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">({restaurant.reviewCount >= 1000 ? `${(restaurant.reviewCount/1000).toFixed(1)}k+` : restaurant.reviewCount})</span>
            </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          <span>{restaurant.priceTier}</span> • <span>{restaurant.cuisine}</span>
        </p>
        <div className="flex items-center gap-1 mt-1 text-xs text-slate-600 dark:text-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="truncate">{restaurant.deliveryTime}</span>
            {restaurant.saverPrice && (
                 <span className="truncate">• from Rs.{restaurant.saverPrice} with Saver</span>
            )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
