import React, { useState, useRef, useEffect } from 'react';
import { ICONS } from '../../constants';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label?: string;
  id: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  wrapperClassName?: string;
  buttonClassName?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, id, options, value, onChange, wrapperClassName, buttonClassName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If the click is outside the select component, close the dropdown.
      // We use the 'click' event here. Clicks on a scrollbar typically
      // do not fire a 'click' event, only 'mousedown'. This prevents the
      // dropdown from closing when the user interacts with the scrollbar.
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Only add the event listener when the dropdown is open.
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    
    // Cleanup the event listener when the component unmounts or dropdown closes.
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]); // Re-run effect when `isOpen` changes.

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`w-full relative ${wrapperClassName || ''}`} ref={selectRef}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {label}
        </label>
      )}
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between pl-3 pr-2 py-2 text-left border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 ${buttonClassName || ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">{selectedOption?.label || 'Select...'}</span>
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          {ICONS.chevronDown}
        </span>
      </button>
      {isOpen && (
        <ul
          className="absolute z-20 mt-1 w-full bg-white dark:bg-slate-800 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          role="listbox"
        >
          {options.map(option => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`relative cursor-pointer select-none py-2 pl-3 pr-9 ${
                option.value === value
                  ? 'bg-rose-500 text-white'
                  : 'text-slate-900 dark:text-slate-200 hover:bg-rose-100 dark:hover:bg-rose-900/50 hover:text-rose-900 dark:hover:text-rose-200'
              }`}
              role="option"
              aria-selected={option.value === value}
            >
              <span className={`block truncate ${option.value === value ? 'font-semibold' : 'font-normal'}`}>
                {option.label}
              </span>
              {option.value === value && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;