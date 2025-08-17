
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getMockRestaurantById } from '../../data/mockData';
import { MenuItem } from '../../types';
import Button from '../shared/Button';
import { useCart } from '../../hooks/useCart';
import { ICONS } from '../../constants';
import MenuItemDetailModal from './MenuItemDetailModal';
import MenuItemCard from './MenuItemCard';
import ReviewsModal from './ReviewsModal';
import { useAuth } from '../../hooks/useAuth';
import CartModal from './CartModal';
import Footer from '../shared/Footer';

const RestaurantPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { cartCount, total } = useCart();
    const { logout } = useAuth();
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const restaurant = getMockRestaurantById(id || '');
    const [activeCategory, setActiveCategory] = useState<string>(restaurant?.menu[0]?.category || '');
    
    const tabsContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftScroll, setShowLeftScroll] = useState(false);
    const [showRightScroll, setShowRightScroll] = useState(false);

    const deliveryAddress = "New address A 137, Street No 6, Karachi";

    const filteredMenu = useMemo(() => {
        if (!restaurant) return [];
        if (!searchQuery) return restaurant.menu;

        return restaurant.menu.map(group => {
            const filteredItems = group.items.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return { ...group, items: filteredItems };
        }).filter(group => group.items.length > 0);
    }, [restaurant, searchQuery]);

    const checkScroll = () => {
        const el = tabsContainerRef.current;
        if (el) {
            const atStart = el.scrollLeft < 10;
            const atEnd = el.scrollWidth - el.scrollLeft - el.clientWidth < 10;
            setShowLeftScroll(!atStart);
            setShowRightScroll(!atEnd);
        }
    };

    useEffect(() => {
        const el = tabsContainerRef.current;
        if (el) {
            el.addEventListener('scroll', checkScroll, { passive: true });
            checkScroll();
            window.addEventListener('resize', checkScroll);
        }
        return () => {
            if (el) {
                el.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            }
        };
    }, [restaurant]);

    const scrollTabs = (direction: 'left' | 'right') => {
        const el = tabsContainerRef.current;
        if (el) {
            const scrollAmount = direction === 'left' ? -el.clientWidth / 1.5 : el.clientWidth / 1.5;
            el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };


    if (!restaurant) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-xl font-bold">Restaurant not found</h1>
                <Button onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
            </div>
        );
    }

    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`;

    const handleTabClick = (category: string) => {
        setActiveCategory(category);
        const element = document.getElementById(`category-header-${category}`);
        // Find the main scrolling container
        const mainScroller = element?.closest('.main-scroller');
        if (element && mainScroller) {
            // Calculate offset considering the sticky header (h-16 = 4rem) and the category tabs height
            const topPos = element.getBoundingClientRect().top + mainScroller.scrollTop - 130; // Adjust this offset
            mainScroller.scrollTo({ top: topPos, behavior: 'smooth' });
        }
    };

    const categories = restaurant.menu.map(group => group.category);

    const MobileCartFooter = () => (
        <div className="fixed bottom-0 left-0 right-0 md:hidden z-20 p-2">
            <button
                onClick={() => setIsCartModalOpen(true)}
                className="w-full flex justify-between items-center font-bold bg-[#f43f5e] text-white p-3 rounded-lg shadow-lg-top"
            >
                <div className="flex items-center gap-2">
                     <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 rounded-full bg-white text-rose-500 text-xs font-extrabold">
                            {cartCount}
                        </span>
                    </div>
                </div>
                <span className="text-base font-semibold">View Cart</span>
                <span className="text-base font-semibold">Rs. {total.toFixed(2)}</span>
            </button>
        </div>
    );

    return (
        <>
            <div className="bg-slate-50 dark:bg-slate-900 min-h-screen flex flex-col">
                {/* Custom Sticky Header */}
                <header className="sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm z-20 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
                    <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
                        <Link to="/customer/home" className="text-xl font-bold text-rose-500 hidden sm:block">Appetite Away</Link>
                        <button onClick={() => navigate(-1)} className="sm:hidden text-slate-600 dark:text-slate-300">
                            {ICONS.chevronLeft}
                        </button>
                        
                        <div className="text-center">
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Deliver to</span>
                            <div className="flex items-center gap-1 font-semibold text-sm text-slate-800 dark:text-slate-200">
                                <span className="truncate max-w-xs">{deliveryAddress}</span>
                                {ICONS.chevronDown}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link to="/customer/profile" className="text-slate-600 dark:text-slate-300 hidden sm:block">{ICONS.user}</Link>
                            <button onClick={logout} className="text-slate-600 dark:text-slate-300 hidden sm:block">{ICONS.logout}</button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                 <div className="main-scroller flex-grow overflow-y-auto no-scrollbar">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Restaurant Info */}
                        <div className="py-6">
                            <div className="relative h-40 md:h-56 rounded-xl overflow-hidden shadow-lg">
                                <img src={restaurant.imageUrl} alt={`${restaurant.name} banner`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 flex items-end gap-4">
                                    <img src={restaurant.logoUrl} alt={`${restaurant.name} logo`} className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-white dark:border-slate-300 shadow-xl object-cover" />
                                </div>
                            </div>
                            <h1 className="text-xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-4">{restaurant.name}</h1>
                            <div className="mt-2 text-xs flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-600 dark:text-slate-400">
                                <div className="flex items-center gap-1 font-semibold">
                                    <span className="text-amber-500">{ICONS.filledStar}</span>
                                    <span>{restaurant.rating} ({restaurant.reviewCount > 3000 ? '3k+' : restaurant.reviewCount} ratings)</span>
                                </div>
                                <span className="text-slate-300 dark:text-slate-600">•</span>
                                <span>{restaurant.deliveryTime}</span>
                                <span className="text-slate-300 dark:text-slate-600">•</span>
                                <span>Rs. {restaurant.deliveryFee} Fee</span>
                                <span className="text-slate-300 dark:text-slate-600">•</span>
                                <button onClick={() => setIsReviewsModalOpen(true)} className="text-rose-500 hover:text-rose-600 font-semibold">See reviews</button>
                                <span className="text-slate-300 dark:text-slate-600">•</span>
                                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-rose-500 hover:text-rose-600 font-semibold">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13v-6m0 6l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m0 13v-6m0 6l-6-3" /></svg>
                                    <span>Map</span>
                                </a>
                            </div>
                        </div>

                        {/* Menu and Cart Grid */}
                        <div className="lg:grid lg:grid-cols-3 lg:gap-6 lg:items-start">
                             <div className="lg:col-span-2">
                                 {/* Category Tabs (sticky inside the main scroller) */}
                                <div className="sticky top-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm z-10 py-3 border-b border-t border-slate-200 dark:border-slate-800">
                                    <div className="relative">
                                        {showLeftScroll && (
                                            <button onClick={() => scrollTabs('left')} className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-md p-1 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 transition-colors">
                                                <div className="h-6 w-6">{ICONS.chevronLeft}</div>
                                            </button>
                                        )}
                                        <div ref={tabsContainerRef} className="flex space-x-2 overflow-x-auto no-scrollbar">
                                            {categories.map(category => (
                                                <button key={category} onClick={() => handleTabClick(category)} className={`px-3 py-1.5 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${activeCategory === category ? 'bg-rose-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                        {showRightScroll && (
                                            <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-slate-50 dark:from-slate-900 pointer-events-none"></div>
                                        )}
                                        {showRightScroll && (
                                            <button onClick={() => scrollTabs('right')} className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-md p-1 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 transition-colors">
                                                <div className="h-5 w-5">{ICONS.chevronRight}</div>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                
                                 {/* Menu Content */}
                                <div className="space-y-6 pt-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search in menu"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 bg-white dark:bg-slate-800 text-sm"
                                        />
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5">
                                            {ICONS.search}
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        {filteredMenu.map(group => (
                                            <div key={group.category}>
                                                <h3 id={`category-header-${group.category}`} className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">{group.category}</h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {group.items.map(item => (
                                                        <MenuItemCard key={item.id} item={item} onSelectItem={() => setSelectedItem(item)} />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                             </div>

                             <aside className="hidden lg:block lg:col-span-1">
                                 <div className="sticky top-20">
                                     {/* This space is intentionally left for potential future use like a sidebar cart */}
                                </div>
                            </aside>
                        </div>
                    </div>
                    <div className="pb-24 lg:pb-0">
                         <Footer />
                    </div>
                </div>
            </div>

            {selectedItem && <MenuItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
            <ReviewsModal isOpen={isReviewsModalOpen} onClose={() => setIsReviewsModalOpen(false)} restaurant={restaurant} />
            <CartModal isOpen={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} />
            
            {cartCount > 0 && <MobileCartFooter />}
        </>
    );
};

export default RestaurantPage;