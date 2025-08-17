import React, { useState, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Restaurant, MenuItem, Review, UserRole, PromoTag } from '../../types';
import RestaurantCard from './RestaurantCard';
import { ICONS } from '../../constants';
import FilterSidebar, { Filters } from './FilterSidebar';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import { useAuth } from '../../hooks/useAuth';
import GeminiMealHelper from './GeminiMealHelper';

// --- MENUS ---
const PAKISTANI_MENU: { category: string, items: MenuItem[] }[] = [
    { category: "Popular", items: [
        { id: 'pk-biryani-s', name: 'Chicken Biryani (Single)', description: 'Aromatic basmati rice cooked with chicken and a blend of exotic spices.', price: 380, imageUrl: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Popular', isPopular: true },
        { id: 'pk-karahi-h', name: 'Chicken Karahi (Half)', description: 'A rich and spicy chicken curry cooked in a traditional karahi wok.', price: 850, imageUrl: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Popular', isPopular: true },
        { id: 'pk-naan', name: 'Roghni Naan', description: 'Soft, fluffy, and enriched with milk and yogurt, topped with sesame seeds.', price: 60, imageUrl: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Popular' },
    ]},
    { category: "Biryani", items: [
        { id: 'pk-biryani-s-2', name: 'Chicken Biryani (Single)', description: 'Aromatic basmati rice cooked with chicken and a blend of exotic spices.', price: 380, imageUrl: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Biryani' },
        { id: 'pk-biryani-d', name: 'Chicken Biryani (Double)', description: 'A larger portion of our signature biryani.', price: 650, imageUrl: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Biryani' },
        { id: 'pk-biryani-mutton', name: 'Mutton Biryani', description: 'Tender mutton pieces layered with fragrant basmati rice.', price: 550, imageUrl: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Biryani' },
    ]},
].flatMap(category => category.items.length >= 3 ? [category, { category: `${category.category} (Cont.)`, items: new Array(10).fill(null).map((_, i) => ({ ...category.items[i % category.items.length], id: `${category.items[i % category.items.length].id}-${i}` })) }] : [category]).reduce((acc, curr) => { const existing = acc.find(c => c.category === curr.category); if (existing) { existing.items.push(...curr.items); } else { acc.push(curr); } return acc; }, [] as { category: string; items: MenuItem[] }[]);

const FASTFOOD_MENU: { category: string, items: MenuItem[] }[] = new Array(6).fill(null).map((_, i) => ({
    category: `Category ${i+1}`,
    items: new Array(4).fill(null).map((_, j) => ({
        id: `ff-c${i}-i${j}`,
        name: `Fast Food Item ${j+1}`,
        description: 'A delicious fast food item.',
        price: 250 + (i * 50) + j,
        imageUrl: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400',
        inStock: true,
        category: `Category ${i+1}`
    }))
}));

const CHINESE_MENU: { category: string, items: MenuItem[] }[] = new Array(5).fill(null).map((_, i) => ({
    category: `Chinese Category ${i+1}`,
    items: new Array(3).fill(null).map((_, j) => ({
        id: `ch-c${i}-i${j}`,
        name: `Chinese Item ${j+1}`,
        description: 'Authentic Chinese flavor.',
        price: 400 + (i * 50) + j,
        imageUrl: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400',
        inStock: true,
        category: `Chinese Category ${i+1}`
    }))
}));

const PIZZA_MENU: { category: string, items: MenuItem[] }[] = new Array(4).fill(null).map((_, i) => ({
    category: `Pizza Category ${i+1}`,
    items: new Array(5).fill(null).map((_, j) => ({
        id: `pz-c${i}-i${j}`,
        name: `Pizza Item ${j+1}`,
        description: 'Cheesy and delicious pizza.',
        price: 1200 + (i * 100) + j,
        imageUrl: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=400',
        inStock: true,
        category: `Pizza Category ${i+1}`
    }))
}));

const MOCK_REVIEWS: Review[] = [
    { id: 'rev1', author: 'Ayesha K.', rating: 5, comment: 'Absolutely delicious!', timestamp: '2 days ago' },
    { id: 'rev2', author: 'Bilal M.', rating: 4, comment: 'Good food, but a bit slow.', timestamp: '1 week ago', likedDishes: PAKISTANI_MENU[0].items.slice(0,1) },
    { id: 'rev3', author: 'Fatima Z.', rating: 5, comment: 'Best in town!', timestamp: '3 days ago' },
];

const PROMO_TAG_1: PromoTag = { text: 'Up to 20% off', bgColor: 'bg-pink-600', textColor: 'text-white' };
const PROMO_TAG_2: PromoTag = { text: '10% cashback', bgColor: 'bg-pink-600', textColor: 'text-white' };
const PROMO_TAG_3: PromoTag = { text: 'Up to 15% off', bgColor: 'bg-pink-600', textColor: 'text-white' };
const PROMO_TAG_4: PromoTag = { text: '50% off Rs.199', bgColor: 'bg-yellow-400', textColor: 'text-black' };


const RESTAURANTS: Restaurant[] = [
    { id: '1', name: 'Tawakkal Biryani', cuisine: 'Pakistani', tags: ['Pakistani', 'Biryani'], rating: 4.7, reviewCount: 1200, distance: '1.2 km', imageUrl: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=800', logoUrl: 'https://ui-avatars.com/api/?name=Tawakkal+Biryani&background=dbeafe&color=1e40af', menu: PAKISTANI_MENU, reviews: MOCK_REVIEWS, address: '123 Food St, Karachi', minOrder: 0, deliveryFee: 99, deliveryTime: '20-45 min', promoTags: [PROMO_TAG_1, PROMO_TAG_2], isAd: true, priceTier: '$$', saverPrice: 179, hasDeals: true, acceptsVouchers: true },
    { id: '2', name: 'Nawab Pakwan & Biryani-B...', cuisine: 'Pakistani', tags: ['Pakistani', 'Biryani'], rating: 4.7, reviewCount: 2500, distance: '2.5 km', imageUrl: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800', logoUrl: 'https://ui-avatars.com/api/?name=Nawab+Pakwan&background=dbeafe&color=1e40af', menu: PAKISTANI_MENU, reviews: MOCK_REVIEWS, address: '456 Spice Rd, Karachi', minOrder: 200, deliveryFee: 120, deliveryTime: '15-40 min', promoTags: [PROMO_TAG_3, PROMO_TAG_2], priceTier: '$$', saverPrice: 119, hasFreeDelivery: true },
    { id: '3', name: 'Shahi Darbar', cuisine: 'Fast Food', tags: ['Fast Food', 'Burgers'], rating: 4.7, reviewCount: 5500, distance: '3.1 km', imageUrl: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800', logoUrl: 'https://ui-avatars.com/api/?name=Shahi+Darbar&background=dbeafe&color=1e40af', menu: FASTFOOD_MENU, reviews: MOCK_REVIEWS, address: '789 Grill Ave, Karachi', minOrder: 150, deliveryFee: 0, deliveryTime: '10-35 min', promoTags: [{ text: 'Up to 10% off', bgColor: 'bg-pink-600', textColor: 'text-white' }], isAd: true, priceTier: '$$', saverPrice: 89, hasFreeDelivery: true, hasDeals: true },
    { id: '4', name: 'Agha Mustafa Juice', cuisine: 'Healthy Food', tags: ['Healthy Food', 'Juice'], rating: 4.8, reviewCount: 4100, distance: '0.8 km', imageUrl: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=800', logoUrl: 'https://ui-avatars.com/api/?name=Agha+Mustafa+Juice&background=dbeafe&color=1e40af', menu: [], reviews: MOCK_REVIEWS, address: '321 Fresh Blvd, Karachi', minOrder: 100, deliveryFee: 50, deliveryTime: '10-35 min', promoTags: [{ text: 'Up to 10% off', bgColor: 'bg-pink-600', textColor: 'text-white' }, PROMO_TAG_2], priceTier: '$$', saverPrice: 79, acceptsVouchers: true },
    { id: '5', name: 'Red Apple - Safoora', cuisine: 'Pakistani', tags: ['Pakistani', 'BBQ', 'Fast Food'], rating: 4.8, reviewCount: 13, distance: '4.0 km', imageUrl: 'https://images.pexels.com/photos/1600727/pexels-photo-1600727.jpeg?auto=compress&cs=tinysrgb&w=800', logoUrl: 'https://ui-avatars.com/api/?name=Red+Apple&background=dbeafe&color=1e40af', menu: PAKISTANI_MENU, reviews: MOCK_REVIEWS, address: '654 Kebab Ln, Karachi', minOrder: 0, deliveryFee: 150, deliveryTime: '10-35 min', isAd: true, priceTier: '$$$', saverPrice: 79 },
    { id: '6', name: 'Taste Studio', cuisine: 'Fast Food', tags: ['Fast Food', 'BBQ'], rating: 4.7, reviewCount: 150, distance: '5.5 km', imageUrl: 'https://images.pexels.com/photos/2271107/pexels-photo-2271107.jpeg?auto=compress&cs=tinysrgb&w=800', logoUrl: 'https://ui-avatars.com/api/?name=Taste+Studio&background=dbeafe&color=1e40af', menu: FASTFOOD_MENU, reviews: MOCK_REVIEWS, address: '987 Charcoal Rd, Karachi', minOrder: 250, deliveryFee: 80, deliveryTime: '10-35 min', promoTags: [{ text: '10% cashback', bgColor: 'bg-pink-600', textColor: 'text-white' }], isAd: true, priceTier: '$$', saverPrice: 79, hasDeals: true, hasFreeDelivery: true },
    { id: '7', name: 'Pizza Max', cuisine: 'Pizza', tags: ['Pizza', 'Italian'], rating: 4.5, reviewCount: 800, distance: '2.1 km', imageUrl: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=800', logoUrl: 'https://ui-avatars.com/api/?name=Pizza+Max&background=dbeafe&color=1e40af', menu: PIZZA_MENU, reviews: MOCK_REVIEWS, address: '111 Cheesy Way, Karachi', minOrder: 500, deliveryFee: 100, deliveryTime: '25-50 min', promoTags: [PROMO_TAG_4, PROMO_TAG_2], priceTier: '$$$', saverPrice: 199, acceptsVouchers: true },
    { id: '8', name: 'The Wok House', cuisine: 'Chinese', tags: ['Chinese', 'Asian'], rating: 4.9, reviewCount: 1500, distance: '3.8 km', imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800', logoUrl: 'https://ui-avatars.com/api/?name=The+Wok+House&background=dbeafe&color=1e40af', menu: CHINESE_MENU, reviews: MOCK_REVIEWS, address: '222 Noodle Ave, Karachi', minOrder: 300, deliveryFee: 75, deliveryTime: '20-45 min', priceTier: '$$$', hasDeals: true }
];

export const getMockRestaurantById = (id: string): Restaurant | undefined => RESTAURANTS.find(r => r.id === id);
export const getMockRestaurants = (): Restaurant[] => RESTAURANTS;
export const getMockCuisines = (): string[] => [...new Set(RESTAURANTS.flatMap(r => r.tags))].sort();

// --- COMPONENTS ---

const ScrollableSection: React.FC<{ title: string; subtitle?: string; children: React.ReactNode; }> = ({ title, subtitle, children }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.8;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };
    
    return (
        <div className="py-6">
            <div className="flex justify-between items-center mb-4 px-1">
                <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">{title}</h2>
                    {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
                </div>
                <div className="flex gap-2">
                    <button onClick={() => scroll('left')} className="w-8 h-8 rounded-full bg-slate-200/60 dark:bg-slate-700/60 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">{ICONS.chevronLeft}</button>
                    <button onClick={() => scroll('right')} className="w-8 h-8 rounded-full bg-slate-200/60 dark:bg-slate-700/60 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">{ICONS.chevronRight}</button>
                </div>
            </div>
            <div ref={scrollRef} className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mb-2">
                {children}
            </div>
        </div>
    );
};

const ActiveOrderCard: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-gradient-to-r from-rose-500 to-amber-500 p-4 rounded-xl shadow-lg text-white flex items-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative animate-pulse">
                <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center">
                    <span className="text-3xl">🛵</span>
                </div>
            </div>
            <div className="flex-grow">
                <p className="text-xs font-bold text-rose-100 uppercase">Your order from Burger Barn</p>
                <h4 className="font-bold text-white text-lg">On its way!</h4>
                <p className="text-xs text-rose-100">Arriving in approx. 10 mins</p>
            </div>
            <Button 
                onClick={() => navigate('/customer/track/ORD124')}
                className="bg-white/90 text-rose-600 font-bold hover:bg-white flex-shrink-0"
            >
                Track
            </Button>
        </div>
    );
};


const QuickActionCard: React.FC<{ label: string; icon: React.ReactNode; to: string; }> = ({ label, icon, to }) => (
    <Link to={to} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm flex flex-col items-center justify-center gap-2 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out">
        <div className="p-3 bg-rose-100 dark:bg-rose-900/50 text-rose-500 rounded-full">{icon}</div>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</p>
    </Link>
);


const ALL_CUISINES = getMockCuisines();
export const INITIAL_FILTERS: Filters = {
    sortBy: 'Relevance',
    quickFilters: [],
    offers: [],
    cuisines: [],
    cuisineSearch: ''
};

interface CustomerDashboardProps {
  searchQuery: string;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  isFilterModalOpen: boolean;
  setIsFilterModalOpen: (isOpen: boolean) => void;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ 
    searchQuery,
    filters,
    setFilters,
    isFilterModalOpen,
    setIsFilterModalOpen
 }) => {
  const { user } = useAuth();
  
  const filteredRestaurants = useMemo(() => {
    let restaurants = getMockRestaurants();
    
    // Search query filter
    if (searchQuery) {
        restaurants = restaurants.filter(r => 
            r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }
    
    // Filter sidebar filters
    if (filters.quickFilters.includes('Ratings 4+')) {
        restaurants = restaurants.filter(r => r.rating >= 4);
    }
    if (filters.offers.includes('Free delivery')) {
        restaurants = restaurants.filter(r => r.hasFreeDelivery);
    }
    if (filters.offers.includes('Accepts vouchers')) {
        restaurants = restaurants.filter(r => r.acceptsVouchers);
    }
    if (filters.offers.includes('Deals')) {
        restaurants = restaurants.filter(r => r.hasDeals);
    }
    if (filters.cuisines.length > 0) {
        restaurants = restaurants.filter(r => r.tags.some(tag => filters.cuisines.includes(tag)));
    }
    
    // Sorting
    switch (filters.sortBy) {
        case 'Fastest delivery':
            restaurants.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
            break;
        case 'Top rated':
            restaurants.sort((a, b) => b.rating - a.rating);
            break;
        case 'Relevance':
        default:
            break;
    }

    return restaurants;
  }, [filters, searchQuery]);
  
  const orderAgainRestaurants = RESTAURANTS.slice(4, 8);

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start pt-4">
        {/* Filter Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-0">
            <FilterSidebar onFilterChange={setFilters} allCuisines={ALL_CUISINES} initialFilters={INITIAL_FILTERS} />
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100">Welcome back, {user?.name?.split(' ')[0]}!</h1>
            
            <ActiveOrderCard />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                <QuickActionCard label="Order Again" icon={ICONS.receipt} to="/customer/orders" />
                <QuickActionCard label="Deals" icon={ICONS.promotions} to="#" />
                <QuickActionCard label="Groceries" icon={ICONS.store} to="#" />
                <QuickActionCard label="Favorites" icon={ICONS.star} to="#" />
            </div>
            
            <GeminiMealHelper />

            <ScrollableSection title="Pick up where you left off" subtitle="Based on your recent activity">
                {orderAgainRestaurants.map(r => (
                    <div key={r.id} className="w-64 flex-shrink-0">
                        <Link to={`/customer/restaurants/${r.id}`}>
                            <RestaurantCard restaurant={r} />
                        </Link>
                    </div>
                ))}
            </ScrollableSection>
            
            <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200 py-6">All Restaurants</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredRestaurants.map(restaurant => (
                        <Link to={`/customer/restaurants/${restaurant.id}`} key={restaurant.id}>
                            <RestaurantCard restaurant={restaurant} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>

        {/* Filter Modal (Mobile) */}
        <Modal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)}>
           <div className="h-full flex flex-col">
                 <FilterSidebar onFilterChange={setFilters} allCuisines={ALL_CUISINES} initialFilters={filters} />
                 <div className="p-2 border-t border-slate-200 dark:border-slate-700">
                    <Button fullWidth onClick={() => setIsFilterModalOpen(false)}>Show restaurants</Button>
                 </div>
           </div>
        </Modal>
    </div>
  );
};

export default CustomerDashboard;