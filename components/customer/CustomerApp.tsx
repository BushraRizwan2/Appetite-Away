import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, Link, Outlet } from 'react-router-dom';
import CustomerDashboard from './CustomerDashboard.tsx';
import RestaurantPage from './RestaurantPage.tsx';
import CustomerOrders from './CustomerOrders.tsx';
import CustomerProfile from './CustomerProfile.tsx';
import TrackOrderPage from './TrackOrderPage.tsx';
import { APP_NAME, ICONS } from '../../constants.tsx';
import { useAuth } from '../../hooks/useAuth.ts';
import MyDetails from './profile/MyDetails.tsx';
import AddressBook from './profile/AddressBook.tsx';
import PaymentMethods from './profile/PaymentMethods.tsx';
import Vouchers from './profile/Vouchers.tsx';
import HelpCenter from './profile/HelpCenter.tsx';
import Footer from '../shared/Footer.tsx';
import AddressSearch from './AddressSearch.tsx';
import LocationModal from './LocationModal.tsx';
import CheckoutConfirmation from './CheckoutConfirmation.tsx';
import BottomNav from '../shared/BottomNav.tsx';
import CartIcon from './CartIcon.tsx';
import CartModal from './CartModal.tsx';

const CustomerLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [deliveryAddress, setDeliveryAddress] = useState("PECHS, Block 6, Shahrah-e-Faisal, Karachi");
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const navItems = [
        { path: '/customer/orders', label: 'Orders', icon: ICONS.orders },
        { path: '/customer/profile', label: 'Profile', icon: ICONS.user, end: false },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
            <header className="border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm z-20 flex-shrink-0">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left: Logo */}
                        <Link to="/customer/dashboard" className="text-xl font-bold text-rose-500">{APP_NAME}</Link>

                        {/* Center: AddressSearch (Desktop) */}
                        <div className="hidden md:block flex-grow max-w-xl mx-4">
                             <AddressSearch
                                address={deliveryAddress}
                                onAddressChange={setDeliveryAddress}
                                onFindFood={() => setIsLocationModalOpen(true)}
                                isAddressSet={!!deliveryAddress}
                            />
                        </div>

                        {/* Right: User Dropdown & Cart */}
                        <div className="flex items-center gap-4">
                            <div className="relative" ref={dropdownRef}>
                                <button onClick={() => setIsDropdownOpen(prev => !prev)} className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200 hover:text-rose-500">
                                    <span>{user?.name}</span>
                                    <span className={`transform transition-transform h-5 w-5 ${isDropdownOpen ? 'rotate-180' : ''}`}>{ICONS.chevronDown}</span>
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-30 ring-1 ring-black ring-opacity-5">
                                        <Link to="/customer/orders" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
                                            <span className="h-5 w-5">{ICONS.orders}</span> My Orders
                                        </Link>
                                        <Link to="/customer/profile" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
                                            <span className="h-5 w-5">{ICONS.user}</span> My Profile
                                        </Link>
                                        <button onClick={() => { logout(); setIsDropdownOpen(false); }} className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
                                            <span className="h-5 w-5">{ICONS.logout}</span> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                            <CartIcon onClick={() => setIsCartModalOpen(true)} />
                        </div>
                    </div>
                </div>
                 {/* Mobile Address Bar */}
                 <div className="md:hidden px-4 pb-3 border-b border-slate-200 dark:border-slate-700">
                     <AddressSearch
                        address={deliveryAddress}
                        onAddressChange={setDeliveryAddress}
                        onFindFood={() => setIsLocationModalOpen(true)}
                        isAddressSet={!!deliveryAddress}
                    />
                </div>
            </header>

            <main className="flex-grow md:overflow-y-auto pb-20 md:pb-0">
                <div className="mx-auto w-full">
                    <Outlet />
                </div>
                <Footer />
            </main>
            
            <div className="md:hidden">
                <BottomNav items={navItems} />
            </div>

            <CartModal isOpen={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} />
            <LocationModal
                isOpen={isLocationModalOpen}
                onClose={() => setIsLocationModalOpen(false)}
                address={deliveryAddress}
                onAddressChange={setDeliveryAddress}
                onConfirmAddress={() => setIsLocationModalOpen(false)}
            />
        </div>
    );
};

const CustomerApp: React.FC = () => {
    return (
        <Routes>
            {/* Routes with shared layout */}
            <Route element={<CustomerLayout />}>
                <Route path="dashboard" element={<CustomerDashboard />} />
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