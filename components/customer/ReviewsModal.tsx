
import React, { useState, useMemo } from 'react';
import { Restaurant, Review, MenuItem } from '../../types';
import { ICONS } from '../../constants';
import Button from '../shared/Button';
import { useCart } from '../../hooks/useCart';

interface ReviewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    restaurant: Restaurant;
}

const StarRating: React.FC<{ rating: number; className?: string }> = ({ rating, className = 'h-5 w-5' }) => (
    <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < rating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}>
                <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            </span>
        ))}
    </div>
);

const RatingBar: React.FC<{ star: number; percentage: number }> = ({ star, percentage }) => (
    <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{star}</span>
        <span className="text-amber-400"><StarRating rating={1} className="h-4 w-4" /></span>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div className="bg-amber-400 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
    </div>
);

const LikedDishCard: React.FC<{ item: MenuItem }> = ({ item }) => {
    const { addToCart } = useCart();
    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(item, 1, '', 'remove');
        alert(`${item.name} added to cart!`);
    };

    return (
        <div className="bg-white dark:bg-slate-700/50 rounded-lg p-2 flex items-center gap-3 mt-2">
            <img src={item.imageUrl} alt={item.name} className="w-14 h-14 rounded-md object-cover" />
            <div className="flex-grow">
                <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">{item.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Rs. {item.price.toFixed(2)}</p>
            </div>
            <button
                onClick={handleAddToCart}
                className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-slate-200 dark:bg-slate-600 shadow-sm rounded-full border border-slate-300 dark:border-slate-500 text-rose-500 text-2xl font-light hover:bg-rose-100 dark:hover:bg-rose-900/50 transition"
                aria-label={`Add ${item.name} to cart`}
            >
                +
            </button>
        </div>
    );
};

const ReviewItemCard: React.FC<{ review: Review }> = ({ review }) => (
    <div className="bg-slate-100/50 dark:bg-slate-800/50 p-4 rounded-xl shadow-sm">
        <div className="flex items-start justify-between">
            <p className="font-bold text-slate-800 dark:text-slate-100">{review.author}</p>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <StarRating rating={review.rating} className="h-4 w-4" />
                <span>{review.timestamp}</span>
            </div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">{review.comment}</p>
        
        {review.likedDishes && review.likedDishes.length > 0 && (
            <div className="mt-3">
                <p className="text-xs font-bold text-slate-600 dark:text-slate-400">Liked {review.likedDishes.length} {review.likedDishes.length > 1 ? 'dishes' : 'dish'}</p>
                {review.likedDishes.map(dish => <LikedDishCard key={dish.id} item={dish} />)}
            </div>
        )}

        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/50">
            <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-rose-500">
                {ICONS.thumbsUp}
                <span>Helpful</span>
            </button>
        </div>
    </div>
);

const ReviewsModal: React.FC<ReviewsModalProps> = ({ isOpen, onClose, restaurant }) => {
    const { name, rating, reviewCount, reviews } = restaurant;
    const [activeFilter, setActiveFilter] = useState('Top reviews');
    
    const ratingDistribution = useMemo(() => {
        const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviews.forEach(r => {
            if (r.rating >= 1 && r.rating <= 5) {
                counts[Math.floor(r.rating) as keyof typeof counts]++;
            }
        });
        const total = reviews.length;
        if (total === 0) return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        
        // Mocking percentages to look good like the image
        return { 5: 65, 4: 20, 3: 8, 2: 2, 1: 5 };
    }, [reviews]);

    const sortedReviews = useMemo(() => {
        let sorted = [...reviews];
        switch (activeFilter) {
            case 'Highest rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'Lowest rating':
                return sorted.sort((a, b) => a.rating - b.rating);
            case 'Newest':
                 // This is a mock sort as we only have text timestamps
                return sorted.reverse();
            case 'Top reviews':
            default:
                // Simple "Top" logic: higher rating and having a comment
                return sorted.sort((a, b) => {
                    if (b.rating !== a.rating) return b.rating - a.rating;
                    return (b.comment?.length || 0) - (a.comment?.length || 0);
                });
        }
    }, [reviews, activeFilter]);

    const filterOptions = ['Top reviews', 'Newest', 'Highest rating', 'Lowest rating'];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-end md:items-center md:justify-center" onClick={onClose}>
            <div
                className="w-full md:max-w-2xl lg:max-w-3xl max-h-[95vh] md:max-h-[90vh] bg-white dark:bg-slate-900 rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col animate-slide-up md:animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <header className="p-4 flex-shrink-0 border-b border-slate-200 dark:border-slate-800 relative text-center">
                    <h2 className="text-lg font-bold">Reviews</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{name}</p>
                    <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" aria-label="Close">
                        {ICONS.close}
                    </button>
                </header>

                {/* Body */}
                <div className="flex-grow overflow-y-auto no-scrollbar p-4 space-y-6">
                    {/* Rating Summary */}
                    <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl flex items-center gap-6">
                        <div className="text-center flex-shrink-0">
                            <p className="text-5xl font-bold text-slate-800 dark:text-slate-100">{rating.toFixed(1)}</p>
                            <StarRating rating={rating} />
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">All Ratings ({reviewCount > 3000 ? '3000+' : reviewCount})</p>
                        </div>
                        <div className="flex-grow space-y-1">
                            <RatingBar star={5} percentage={ratingDistribution[5]} />
                            <RatingBar star={4} percentage={ratingDistribution[4]} />
                            <RatingBar star={3} percentage={ratingDistribution[3]} />
                            <RatingBar star={2} percentage={ratingDistribution[2]} />
                            <RatingBar star={1} percentage={ratingDistribution[1]} />
                        </div>
                    </div>

                    {/* Filter Buttons */}
                    <div className="overflow-x-auto no-scrollbar">
                        <div className="flex space-x-2">
                            {filterOptions.map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${activeFilter === filter ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900' : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'}`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Review List */}
                    <div className="space-y-4">
                        {sortedReviews.map(review => <ReviewItemCard key={review.id} review={review} />)}
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
                        .md\\:animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default ReviewsModal;
