import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import { useAuth } from '../../hooks/useAuth';
import AppLayout from '../shared/AppLayout';
import { ICONS } from '../../constants';
import UserManagement from './UserManagement';

const AdminLayout: React.FC = () => {
    const { user } = useAuth();
    const navItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: ICONS.analytics },
        { path: '/admin/users', label: 'Users', icon: ICONS.user },
        { path: '/admin/restaurants', label: 'Restaurants', icon: ICONS.store },
        { path: '/admin/riders', label: 'Riders', icon: ICONS.motorcycle },
        { path: '/admin/orders', label: 'Orders', icon: ICONS.orders },
        { path: '/admin/payouts', label: 'Payouts', icon: ICONS.wallet },
    ];
    
    return (
        <AppLayout navItems={navItems} userRole="Administrator" businessName={user?.name}>
             <main className="flex-1 overflow-hidden p-6">
                <Outlet />
            </main>
        </AppLayout>
    );
};

const AdminApp: React.FC = () => {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="restaurants" element={<div className="text-xl font-bold">Restaurant Management Page</div>} />
                <Route path="riders" element={<div className="text-xl font-bold">Rider Management Page</div>} />
                <Route path="orders" element={<div className="text-xl font-bold">Order Management Page</div>} />
                <Route path="payouts" element={<div className="text-xl font-bold">Payouts Page</div>} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Route>
        </Routes>
    );
};

export default AdminApp;