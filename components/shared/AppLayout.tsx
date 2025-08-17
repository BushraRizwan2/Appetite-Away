import React from 'react';
import DesktopSidebar from './DesktopSidebar';
import BottomNav from './BottomNav';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  end?: boolean;
}

interface AppLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  userRole?: string;
  businessName?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, navItems, userRole, businessName }) => {
  return (
    <div className="md:flex md:h-screen bg-slate-50 dark:bg-slate-900/80 md:overflow-hidden">
        <DesktopSidebar navItems={navItems} userRole={userRole} businessName={businessName} />
        <div className="flex-1 flex flex-col md:overflow-hidden">
            {children}
        </div>
        <div className="md:hidden flex-shrink-0">
            <BottomNav items={navItems} />
        </div>
    </div>
  );
};

export default AppLayout;