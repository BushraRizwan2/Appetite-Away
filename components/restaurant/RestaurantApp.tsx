import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import RestaurantDashboard from './RestaurantDashboard';
import MenuManagement from './MenuManagement';
import RestaurantProfile from './RestaurantProfile';
import BusinessHub from './BusinessHub';
import { ICONS } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import AppLayout from '../shared/AppLayout';

const RestaurantLayout: React.FC = () => {
    const { user } = useAuth();
    const navItems = [
        { path: '/restaurant/dashboard', label: 'Dashboard', icon: ICONS.home },
        { path: '/restaurant/menu', label: 'Menu', icon: ICONS.orders },
        { path: '/restaurant/business', label: 'Business Hub', icon: ICONS.wallet, end: false },
        { path: '/restaurant/profile', label: 'Profile', icon: ICONS.user },
    ];
    
    return (
        <AppLayout navItems={navItems} userRole="Partner" businessName={user?.businessName}>
            <main className="flex-grow overflow-hidden pb-16">
                <Outlet />
            </main>
        </AppLayout>
    );
};

const RestaurantApp: React.FC = () => {
    return (
        <Routes>
            <Route element={<RestaurantLayout />}>
                <Route path="dashboard" element={<RestaurantDashboard />} />
                <Route path="menu" element={<MenuManagement />} />
                <Route path="business/*" element={<BusinessHub />} />
                <Route path="profile" element={<RestaurantProfile />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Route>
        </Routes>
    );
};

export default RestaurantApp;