import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange, label }) => (
    <div className="flex items-center gap-2">
        <button
            type="button"
            className={`${checked ? 'bg-rose-500' : 'bg-gray-300 dark:bg-slate-600'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2`}
            onClick={onChange}
            role="switch"
            aria-checked={checked}
        >
            <span
                aria-hidden="true"
                className={`${checked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
        </button>
        {label && <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>}
    </div>
);

export default Switch;
