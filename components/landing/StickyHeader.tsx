

import React, { useState, useEffect } from 'react';
import { UserRole } from '../../types';
import Button from '../shared/Button';
import { APP_NAME } from '../../constants';
import { Link } from 'react-router-dom';

interface StickyHeaderProps {
  openModal: (type: 'login' | 'signup', role?: UserRole) => void;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({ openModal }) => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const headerClasses = `fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${isSticky ? 'bg-white dark:bg-slate-900 shadow-md py-2' : 'bg-transparent py-4'}`;
    const textColorClass = isSticky ? 'text-rose-500' : 'text-white';
    const loginButtonBg = isSticky ? 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600' : 'bg-white/90 hover:bg-white';
    const loginButtonText = isSticky ? 'text-slate-800 dark:text-slate-100' : 'text-rose-500';
    
    // Responsive classes for header elements
    const logoSizeClass = "text-xl sm:text-2xl";
    const buttonSizeClasses = "text-sm px-3 py-1.5 sm:px-4 sm:py-2";

    return (
        <header className={headerClasses}>
            <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                <Link to="/" className={`font-bold ${logoSizeClass} transition-colors ${textColorClass}`} style={{textShadow: isSticky ? 'none' : '1px 1px 2px rgba(0,0,0,0.5)'}}>
                    {APP_NAME}
                </Link>

                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => openModal('login')}
                        className={`rounded-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${buttonSizeClasses} ${loginButtonBg} ${loginButtonText} focus:ring-rose-500`}
                    >
                        Log In
                    </button>
                    <Button 
                        variant="primary" 
                        onClick={() => openModal('signup')} 
                        className={buttonSizeClasses}
                    >
                        Sign Up
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default StickyHeader;
