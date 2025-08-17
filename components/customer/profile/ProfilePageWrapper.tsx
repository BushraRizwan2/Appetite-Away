
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ICONS } from '../../../constants';

interface ProfilePageWrapperProps {
  title: string;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
}

const ProfilePageWrapper: React.FC<ProfilePageWrapperProps> = ({ title, children, actionButton }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full min-h-screen">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 h-16">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="text-slate-600 dark:text-slate-300 hover:text-rose-500">
                {ICONS.chevronLeft}
                </button>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">{title}</h2>
            </div>
            {actionButton}
        </div>
      </header>
      <main className="flex-grow overflow-y-auto bg-slate-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
            {children}
        </div>
      </main>
    </div>
  );
};

export default ProfilePageWrapper;
