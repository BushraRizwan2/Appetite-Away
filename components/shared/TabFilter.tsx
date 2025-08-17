import React from 'react';

interface TabFilterProps {
  options: string[];
  activeOption: string;
  onOptionClick: (option: string) => void;
  className?: string;
}

const TabFilter: React.FC<TabFilterProps> = ({ options, activeOption, onOptionClick, className }) => {
  return (
    <div className={`p-1 bg-slate-200 dark:bg-slate-800 rounded-lg flex ${className}`}>
      {options.map(option => (
        <button
          key={option}
          onClick={() => onOptionClick(option)}
          className={`w-full py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
            activeOption === option 
              ? 'bg-rose-500 text-white shadow' 
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-700/50'
          }`}
          style={{ flexBasis: `${100 / options.length}%` }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default TabFilter;
