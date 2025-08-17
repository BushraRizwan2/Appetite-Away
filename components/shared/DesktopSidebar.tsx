import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { APP_NAME, ICONS } from '../../constants';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  end?: boolean;
}

interface DesktopSidebarProps {
  navItems: NavItem[];
  userRole?: string;
  businessName?: string;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ navItems, userRole, businessName }) => {
    const { logout } = useAuth();

    return (
        <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700/50 flex-col flex-shrink-0 hidden md:flex">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700/50">
                <Link to="/" className="text-2xl font-bold text-rose-500 text-center block">{APP_NAME}</Link>
                {userRole && (
                    <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-1">{businessName || userRole}</p>
                )}
            </div>
            <nav className="flex-grow p-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.end ?? true}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                isActive 
                                ? 'bg-rose-500 text-white shadow-md' 
                                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`
                        }
                    >
                        <span className="w-5 h-5">{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
            <div className="p-4 border-t border-slate-200 dark:border-slate-700/50">
                 <button 
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                    <span className="w-5 h-5">{ICONS.logout}</span>
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default DesktopSidebar;
