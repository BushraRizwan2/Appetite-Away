
import React, { useState, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RestaurantCard from './RestaurantCard';
import { ICONS } from '../../constants';
import FilterSidebar, { Filters } from './FilterSidebar';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import { useAuth } from '../../hooks/useAuth';
import GeminiMealHelper from './GeminiMealHelper';
import { getMockRestaurants, getMockCuisines } from '../../data/mockData';
import { Restaurant } from '../../types';


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
const INITIAL_FILTERS: Filters = {
    sortBy: 'Relevance',
    quickFilters: [],
    offers: [],
    cuisines: [],
    cuisineSearch: ''
};

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  const filteredRestaurants = useMemo(() => {
    let restaurants = getMockRestaurants();
    
    // Search query filter
    if (searchQuery) {
        restaurants = restaurants.filter((r: Restaurant) => 
            r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.tags.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }
    
    // Filter sidebar filters
    if (filters.quickFilters.includes('Ratings 4+')) {
        restaurants = restaurants.filter((r: Restaurant) => r.rating >= 4);
    }
    if (filters.offers.includes('Free delivery')) {
        restaurants = restaurants.filter((r: Restaurant) => r.hasFreeDelivery);
    }
    if (filters.offers.includes('Accepts vouchers')) {
        restaurants = restaurants.filter((r: Restaurant) => r.acceptsVouchers);
    }
    if (filters.offers.includes('Deals')) {
        restaurants = restaurants.filter((r: Restaurant) => r.hasDeals);
    }
    if (filters.cuisines.length > 0) {
        restaurants = restaurants.filter((r: Restaurant) => r.tags.some((tag: string) => filters.cuisines.includes(tag)));
    }
    
    // Sorting
    switch (filters.sortBy) {
        case 'Fastest delivery':
            restaurants.sort((a: Restaurant, b: Restaurant) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
            break;
        case 'Top rated':
            restaurants.sort((a: Restaurant, b: Restaurant) => b.rating - a.rating);
            break;
        case 'Relevance':
        default:
            break;
    }

    return restaurants;
  }, [filters, searchQuery]);
  
  const orderAgainRestaurants = getMockRestaurants().slice(4, 8);

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start pt-4 mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Filter Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-20">
            <FilterSidebar onFilterChange={setFilters} allCuisines={ALL_CUISINES} initialFilters={INITIAL_FILTERS} />
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-4">
             <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100">What are you craving, {user?.name?.split(' ')[0]}?</h1>
            
            <div className="w-full flex items-center gap-2">
                <div className="relative flex-grow">
                    <input
                        type="search"
                        placeholder="Search food, restaurants..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white dark:bg-slate-800 text-sm sm:text-base"
                    />
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 pointer-events-none">
                        {ICONS.search}
                    </div>
                </div>
                <div className="lg:hidden">
                    <Button 
                        variant="secondary" 
                        onClick={() => setIsFilterModalOpen(true)}
                        className="!p-2 sm:!p-2.5 rounded-full aspect-square"
                        aria-label="Open filters"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8v-2m0 2a2 2 0 100 4m0-4a2 2 0 110 4m0-4v-2m0 4h.01M18 8h4m-4 0a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                    </Button>
                </div>
            </div>

            <ActiveOrderCard />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                <QuickActionCard label="Order Again" icon={ICONS.receipt} to="/customer/orders" />
                <QuickActionCard label="Deals" icon={ICONS.promotions} to="#" />
                <QuickActionCard label="Groceries" icon={ICONS.store} to="#" />
                <QuickActionCard label="Favorites" icon={ICONS.star} to="#" />
            </div>
            
            <GeminiMealHelper />

            <ScrollableSection title="Pick up where you left off" subtitle="Based on your recent activity">
                {orderAgainRestaurants.map((r: Restaurant) => (
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
                    {filteredRestaurants.map((restaurant: Restaurant) => (
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
