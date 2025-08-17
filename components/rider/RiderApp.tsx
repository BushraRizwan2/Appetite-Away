import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import RiderDashboard from './RiderDashboard';
import RiderDeliveries from './RiderDeliveries';
import RiderEarnings from './RiderEarnings';
import { ICONS } from '../../constants';
import ActiveDeliveryPage from './ActiveDeliveryPage';
import AppLayout from '../shared/AppLayout';

const RiderLayout: React.FC = () => {
    const navItems = [
        { path: '/rider/dashboard', label: 'Home', icon: ICONS.home },
        { path: '/rider/deliveries', label: 'Deliveries', icon: ICONS.motorcycle },
        { path: '/rider/earnings', label: 'Earnings', icon: ICONS.wallet },
    ];
    
    return (
        <AppLayout navItems={navItems} userRole="Rider">
            <main className="flex-grow overflow-hidden pb-16">
                <Outlet />
            </main>
        </AppLayout>
    );
};

const RiderApp: React.FC = () => {
    return (
        <Routes>
            {/* Routes with the main layout */}
            <Route element={<RiderLayout />}>
                <Route path="dashboard" element={<RiderDashboard />} />
                <Route path="deliveries" element={<RiderDeliveries />} />
                <Route path="earnings" element={<RiderEarnings />} />
            </Route>

            {/* Full-screen route for active delivery */}
            <Route path="delivery/:deliveryId" element={<ActiveDeliveryPage />} />
            
            {/* Default redirect */}
            <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
    );
};

export default RiderApp;