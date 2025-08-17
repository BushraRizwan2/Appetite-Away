import React, { useState } from 'react';
import { Routes, Route, Navigate, Link, useLocation, Outlet } from 'react-router-dom';
import CustomerDashboard, { INITIAL_FILTERS } from './CustomerDashboard';
import RestaurantPage from './RestaurantPage';
import CustomerOrders from './CustomerOrders';
import CustomerProfile from './CustomerProfile';
import TrackOrderPage from './TrackOrderPage';
import { ICONS } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import MyDetails from './profile/MyDetails';
import AddressBook from './profile/AddressBook';
import PaymentMethods from './profile/PaymentMethods';
import Vouchers from './profile/Vouchers';
import HelpCenter from './profile/HelpCenter';
import Footer from '../shared/Footer';
import AddressSearch from './AddressSearch';
import LocationModal from './LocationModal';
import CheckoutConfirmation from './CheckoutConfirmation';
import { Filters } from './FilterSidebar';
import Button from '../shared/Button';
import AppLayout from '../shared/AppLayout';

const LayoutWithHeader: React.FC = () => {
    const { logout } = useAuth();
    const location = useLocation();
    
    // States are managed in CustomerApp, passed down to Dashboard
    const isDashboardPage = location.pathname === '/customer' || location.pathname.startsWith('/customer/dashboard');

    const [deliveryAddress, setDeliveryAddress] = useState("PECHS, Block 6, Shahrah-e-Faisal, Karachi");
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    const navItems = [
        { path: '/customer/dashboard', label: 'Home', icon: ICONS.home },
        { path: '/customer/orders', label: 'Orders', icon: ICONS.orders },
        { path: '/customer/profile', label: 'Profile', icon: ICONS.user, end: false },
    ];

    return (
        <AppLayout navItems={navItems} userRole="Customer">
             <header className="border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm z-10 flex-shrink-0">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    {isDashboardPage ? (
                         <div className="py-3 flex flex-col md:flex-row items-center gap-4">
                            <div className="w-full md:flex-grow-[2]">
                                <AddressSearch
                                    address={deliveryAddress}
                                    onAddressChange={setDeliveryAddress}
                                    onFindFood={() => setIsLocationModalOpen(true)}
                                    isAddressSet={!!deliveryAddress}
                                />
                            </div>
                            <div className="w-full md:flex-grow-[3] flex items-center gap-2">
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
                        </div>
                    ) : (
                        <div className="flex justify-between items-center h-16">
                            <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">
                                {location.pathname.includes('/orders') ? 'My Orders' : 'My Profile'}
                            </h2>
                        </div>
                    )}
                </div>
            </header>
            <main className="flex-grow md:overflow-y-auto pb-20 md:pb-0">
                 <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    {/* Pass down props to CustomerDashboard */}
                    {isDashboardPage ? (
                        <CustomerDashboard 
                            filters={filters}
                            setFilters={setFilters}
                            isFilterModalOpen={isFilterModalOpen}
                            setIsFilterModalOpen={setIsFilterModalOpen}
                            searchQuery={searchQuery}
                         />
                    ) : (
                        <Outlet />
                    )}
                </div>
                <Footer />
            </main>
            <LocationModal
                isOpen={isLocationModalOpen}
                onClose={() => setIsLocationModalOpen(false)}
                address={deliveryAddress}
                onAddressChange={setDeliveryAddress}
                onConfirmAddress={() => setIsLocationModalOpen(false)}
            />
        </AppLayout>
    );
};

const CustomerApp: React.FC = () => {
    return (
        <Routes>
            {/* Routes with shared layout */}
            <Route element={<LayoutWithHeader />}>
                <Route path="dashboard" element={<div />} /> {/* Dummy, logic is in layout */}
                <Route path="orders" element={<CustomerOrders />} />
                <Route path="profile" element={<CustomerProfile />} />
            </Route>
            
            {/* Full-screen routes without the main layout */}
            <Route path="restaurants/:id" element={<RestaurantPage />} />
            <Route path="track/:orderId" element={<TrackOrderPage />} />
            <Route path="checkout" element={<CheckoutConfirmation />} />
            
            {/* Profile sub-routes (also full-screen with their own wrapper) */}
            <Route path="profile/details" element={<MyDetails />} />
            <Route path="profile/address-book" element={<AddressBook />} />
            <Route path="profile/payment-methods" element={<PaymentMethods />} />
            <Route path="profile/vouchers" element={<Vouchers />} />
            <Route path="profile/help-center" element={<HelpCenter />} />

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
    );
};

export default CustomerApp;