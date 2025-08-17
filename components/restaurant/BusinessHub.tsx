

import React from 'react';
import { Routes, Route, NavLink, useLocation, Navigate } from 'react-router-dom';
import RestaurantEarnings from './RestaurantAnalytics';
import RestaurantReviews from './RestaurantReviews';
import RestaurantPromotions from './RestaurantPromotions';
import RestaurantHelp from './RestaurantHelp';
import { ICONS } from '../../constants';

const BusinessHub: React.FC = () => {
    const location = useLocation();

    const tabs = [
        { name: 'Earnings', path: 'earnings', icon: ICONS.earnings },
        { name: 'Reviews', path: 'reviews', icon: ICONS.star },
        { name: 'Promotions', path: 'promotions', icon: ICONS.promotions },
        { name: 'Help & Support', path: 'help', icon: ICONS.help },
    ];
    
    // Redirect from base /business to /business/earnings
    if (location.pathname === '/restaurant/business' || location.pathname === '/restaurant/business/') {
        return <Navigate to="/restaurant/business/earnings" replace />;
    }

    return (
        <div className="flex flex-col h-full">
            <div className="px-4 border-b border-slate-200 dark:border-slate-800">
                <nav className="flex space-x-4 overflow-x-auto no-scrollbar">
                    {tabs.map(tab => (
                        <NavLink
                            key={tab.name}
                            to={tab.path}
                            className={({ isActive }) =>
                                `flex items-center gap-2 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                                    isActive 
                                    ? 'border-rose-500 text-rose-500' 
                                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-rose-500'
                                }`
                            }
                        >
                           <div className="h-5 w-5">{tab.icon}</div>
                           <span>{tab.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
            
            <div className="flex-grow overflow-y-auto bg-slate-100 dark:bg-slate-900">
                <Routes>
                    <Route path="earnings" element={<RestaurantEarnings />} />
                    <Route path="reviews" element={<RestaurantReviews />} />
                    <Route path="promotions" element={<RestaurantPromotions />} />
                    <Route path="help" element={<RestaurantHelp />} />
                    <Route path="*" element={<Navigate to="earnings" replace />} />
                </Routes>
            </div>
        </div>
    );
};

export default BusinessHub;
