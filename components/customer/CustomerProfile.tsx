import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ICONS } from '../../constants';

const ProfileMenuItem: React.FC<{ children: React.ReactNode; to: string }> = ({ children, to }) => (
    <Link
        to={to}
        className="w-full text-left p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm flex justify-between items-center transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
    >
        <span className="font-semibold text-slate-700 dark:text-slate-200">{children}</span>
        <span className="text-slate-400">{ICONS.chevronRight}</span>
    </Link>
);

const CustomerProfile: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className="p-6 pb-24 bg-slate-50 dark:bg-slate-900">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">My Profile</h2>
                <button onClick={logout} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 p-2 -mr-2">
                    {ICONS.logout}
                </button>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm mb-6">
                <p className="text-xl font-bold text-slate-900 dark:text-white">{user?.name || 'Test User'}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{user?.email || 'customer@appetite.com'}</p>
                {user?.phone && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{user.phone}</p>
                )}
            </div>

            <div className="space-y-3">
                <ProfileMenuItem to="/customer/profile/details">My Details</ProfileMenuItem>
                <ProfileMenuItem to="/customer/profile/address-book">Address Book</ProfileMenuItem>
                <ProfileMenuItem to="/customer/profile/payment-methods">Payment Methods</ProfileMenuItem>
                <ProfileMenuItem to="/customer/profile/vouchers">Vouchers & Offers</ProfileMenuItem>
                <ProfileMenuItem to="/customer/profile/help-center">Help Center</ProfileMenuItem>
            </div>
        </div>
    );
};

export default CustomerProfile;