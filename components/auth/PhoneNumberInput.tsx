import React from 'react';
import CustomSelect from '../shared/CustomSelect';

const COUNTRIES = [
    { code: 'PK', dialCode: '+92', flag: '🇵🇰' },
    { code: 'US', dialCode: '+1', flag: '🇺🇸' },
    { code: 'GB', dialCode: '+44', flag: '🇬🇧' },
    { code: 'IN', dialCode: '+91', flag: '🇮🇳' },
];

interface PhoneNumberInputProps {
    countryCode: string;
    onCountryCodeChange: (value: string) => void;
    phoneNumber: string;
    onPhoneNumberChange: (value: string) => void;
    label: string;
    id: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
    countryCode,
    onCountryCodeChange,
    phoneNumber,
    onPhoneNumberChange,
    label,
    id,
}) => {
    const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const digitsOnly = e.target.value.replace(/\D/g, '');
        onPhoneNumberChange(digitsOnly);
    };

    const countryOptions = COUNTRIES.map(c => ({ value: c.dialCode, label: `${c.flag} ${c.dialCode}` }));

    return (
        <div className="w-full">
            <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {label}
            </label>
            <div className="flex">
                <CustomSelect
                    id="country-code"
                    options={countryOptions}
                    value={countryCode}
                    onChange={onCountryCodeChange}
                    wrapperClassName="flex-shrink-0"
                    buttonClassName="!rounded-r-none !border-r-0 !py-2.5 !shadow-sm !bg-slate-100 dark:!bg-slate-700 hover:!bg-slate-200 dark:hover:!bg-slate-600"
                />
                <input
                    id={id}
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneInputChange}
                    placeholder="3001234567"
                    required
                    className="relative w-full px-3 py-2 border border-l-0 border-slate-300 dark:border-slate-600 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200"
                />
            </div>
        </div>
    );
};

export default PhoneNumberInput;