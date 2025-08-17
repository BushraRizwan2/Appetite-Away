
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  onIconClick?: () => void;
}

const Input: React.FC<InputProps> = ({ label, id, icon, onIconClick, ...props }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
          {...props}
        />
        {icon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button type="button" onClick={onIconClick} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none">
              {icon}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;