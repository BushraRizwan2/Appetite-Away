import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ShopkeeperDashboard from './ShopkeeperDashboard';
import { useAuth } from '../../hooks/useAuth';
import { ICONS } from '../../constants';
import ShopkeeperOrders from './ShopkeeperOrders';
import ShopkeeperInventory from './ShopkeeperInventory';
import ShopkeeperProfile from './ShopkeeperProfile';
import AppLayout from '../shared/AppLayout';
import ShopkeeperEarnings from './ShopkeeperEarnings';

const ShopkeeperLayout: React.FC = () => {
    const { user } = useAuth();
    const navItems = [
        { path: '/shopkeeper/dashboard', label: 'Dashboard', icon: ICONS.home },
        { path: '/shopkeeper/orders', label: 'Orders', icon: ICONS.orders },
        { path: '/shopkeeper/inventory', label: 'Inventory', icon: ICONS.store },
        { path: '/shopkeeper/earnings', label: 'Earnings', icon: ICONS.earnings },
        { path: '/shopkeeper/profile', label: 'My Shop', icon: ICONS.user },
    ];

    return (
        <AppLayout navItems={navItems} userRole="Shopkeeper" businessName={user?.businessName}>
            <main className="flex-grow overflow-y-auto pb-16">
                <Outlet />
            </main>
        </AppLayout>
    );
};

const ShopkeeperApp: React.FC = () => {
    return (
        <Routes>
            <Route element={<ShopkeeperLayout />}>
                <Route path="dashboard" element={<ShopkeeperDashboard />} />
                <Route path="orders" element={<ShopkeeperOrders />} />
                <Route path="inventory" element={<ShopkeeperInventory />} />
                <Route path="earnings" element={<ShopkeeperEarnings />} />
                <Route path="profile" element={<ShopkeeperProfile />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Route>
        </Routes>
    );
};

export default ShopkeeperApp;