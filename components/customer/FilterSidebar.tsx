
import React, { useState, useEffect, useMemo } from 'react';
import { ICONS } from '../../constants';

export interface Filters {
    sortBy: string;
    quickFilters: string[];
    offers: string[];
    cuisines: string[];
    cuisineSearch: string;
}

interface FilterSidebarProps {
    onFilterChange: (filters: Filters) => void;
    allCuisines: string[];
    initialFilters: Filters;
}

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="py-4 border-b border-slate-200 dark:border-slate-700">
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-3 px-2">{title}</h3>
        <div className="space-y-2">{children}</div>
    </div>
);

const RadioItem: React.FC<{ label: string; value: string; checked: boolean; onChange: (value: string) => void }> = ({ label, value, checked, onChange }) => (
    <label className="flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
        <input type="radio" name="sortby" value={value} checked={checked} onChange={() => onChange(value)} className="h-5 w-5 text-rose-500 focus:ring-rose-500 border-slate-400" />
        <span className="text-slate-700 dark:text-slate-300">{label}</span>
    </label>
);

const CheckboxItem: React.FC<{ label: string; checked: boolean; onChange: (checked: boolean) => void }> = ({ label, checked, onChange }) => (
     <label className="flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5 rounded text-rose-500 focus:ring-rose-500 border-slate-400" />
        <span className="text-slate-700 dark:text-slate-300">{label}</span>
    </label>
);

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange, allCuisines, initialFilters }) => {
    const [filters, setFilters] = useState<Filters>(initialFilters);

    useEffect(() => {
        onFilterChange(filters);
    }, [filters, onFilterChange]);
    
    const handleQuickFilterToggle = (filter: string) => {
        setFilters(prev => {
            const newFilters = prev.quickFilters.includes(filter)
                ? prev.quickFilters.filter(f => f !== filter)
                : [...prev.quickFilters, filter];
            return { ...prev, quickFilters: newFilters };
        });
    };
    
    const handleOfferToggle = (offer: string) => {
        setFilters(prev => {
            const newOffers = prev.offers.includes(offer)
                ? prev.offers.filter(o => o !== offer)
                : [...prev.offers, offer];
            return { ...prev, offers: newOffers };
        });
    };

    const handleCuisineToggle = (cuisine: string) => {
         setFilters(prev => {
            const newCuisines = prev.cuisines.includes(cuisine)
                ? prev.cuisines.filter(c => c !== cuisine)
                : [...prev.cuisines, cuisine];
            return { ...prev, cuisines: newCuisines };
        });
    };

    const filteredCuisines = useMemo(() => {
        return allCuisines.filter(c => c.toLowerCase().includes(filters.cuisineSearch.toLowerCase()));
    }, [allCuisines, filters.cuisineSearch]);

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center p-2 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                 <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Filters</h2>
                 <button onClick={() => setFilters(initialFilters)} className="text-sm font-semibold text-rose-500 hover:underline">Clear all</button>
            </div>
            <div className="flex-grow overflow-y-auto no-scrollbar p-2">
                <FilterSection title="Sort by">
                    <RadioItem label="Relevance" value="Relevance" checked={filters.sortBy === 'Relevance'} onChange={val => setFilters(f => ({...f, sortBy: val}))} />
                    <RadioItem label="Fastest delivery" value="Fastest delivery" checked={filters.sortBy === 'Fastest delivery'} onChange={val => setFilters(f => ({...f, sortBy: val}))} />
                    <RadioItem label="Distance" value="Distance" checked={filters.sortBy === 'Distance'} onChange={val => setFilters(f => ({...f, sortBy: val}))} />
                    <RadioItem label="Top rated" value="Top rated" checked={filters.sortBy === 'Top rated'} onChange={val => setFilters(f => ({...f, sortBy: val}))} />
                </FilterSection>

                <FilterSection title="Quick filters">
                    <div className="flex flex-wrap gap-2 px-2">
                        <button onClick={() => handleQuickFilterToggle('Ratings 4+')} className={`px-3 py-1.5 text-sm font-semibold rounded-lg border-2 ${filters.quickFilters.includes('Ratings 4+') ? 'bg-rose-500 text-white border-rose-500' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600'}`}>Ratings 4+</button>
                        <button onClick={() => handleQuickFilterToggle('Top restaurant')} className={`flex items-center gap-1 px-3 py-1.5 text-sm font-semibold rounded-lg border-2 ${filters.quickFilters.includes('Top restaurant') ? 'bg-rose-500 text-white border-rose-500' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600'}`}>
                           {ICONS.topRestaurant} Top restaurant
                        </button>
                    </div>
                </FilterSection>

                <FilterSection title="Offers">
                    <CheckboxItem label="Free delivery" checked={filters.offers.includes('Free delivery')} onChange={() => handleOfferToggle('Free delivery')} />
                    <CheckboxItem label="Accepts vouchers" checked={filters.offers.includes('Accepts vouchers')} onChange={() => handleOfferToggle('Accepts vouchers')} />
                    <CheckboxItem label="Deals" checked={filters.offers.includes('Deals')} onChange={() => handleOfferToggle('Deals')} />
                </FilterSection>

                <FilterSection title="Cuisines">
                    <div className="relative px-2 mb-2">
                        <input
                            type="text"
                            placeholder="Search for cuisines"
                            value={filters.cuisineSearch}
                            onChange={(e) => setFilters(f => ({...f, cuisineSearch: e.target.value}))}
                            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-full bg-slate-100 dark:bg-slate-700"
                        />
                         <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4">
                           {ICONS.search}
                        </div>
                    </div>
                    <div className="max-h-48 overflow-y-auto no-scrollbar">
                        {filteredCuisines.map(cuisine => (
                            <CheckboxItem key={cuisine} label={cuisine} checked={filters.cuisines.includes(cuisine)} onChange={() => handleCuisineToggle(cuisine)} />
                        ))}
                    </div>
                </FilterSection>
            </div>
        </div>
    );
};

export default FilterSidebar;