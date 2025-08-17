import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './Icon';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  end?: boolean;
}

interface BottomNavProps {
  items: NavItem[];
}

const BottomNav: React.FC<BottomNavProps> = ({ items }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-black border-t border-slate-200 dark:border-slate-800 flex justify-around items-center px-2 py-1 gap-2">
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.end ?? true}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center xs:space-y-1 w-full h-full rounded-lg transition-colors p-1 ${
              isActive
                ? 'bg-rose-50 dark:bg-rose-900/50 text-rose-500 dark:text-rose-400'
                : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <Icon className="h-6 w-6">{item.icon}</Icon>
          <span className="text-xs font-medium hidden xs:block">{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default BottomNav;