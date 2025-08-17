
import React, { useState } from 'react';
import Spinner from '../shared/Spinner';

interface AddressSearchProps {
    address: string;
    onAddressChange: (address: string) => void;
    onFindFood: () => void;
    error?: string;
    isAddressSet?: boolean;
}

const LocateMeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
       <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
       <path d="M4 12a8 8 0 1 0 16 0a8 8 0 0 0 -16 0"></path>
       <path d="M12 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path>
       <path d="M12 2v2"></path>
       <path d="M12 20v2"></path>
       <path d="M20 12h2"></path>
       <path d="M2 12h2"></path>
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
)

const AddressSearch: React.FC<AddressSearchProps> = ({ address, onAddressChange, onFindFood, error, isAddressSet = false }) => {
    const [isLocating, setIsLocating] = useState(false);

    const handleLocateMe = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by this browser.");
            return;
        }
        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    // Using OpenStreetMap's free Nominatim reverse geocoding API
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
                    if (!response.ok) {
                        throw new Error('Reverse geocoding request failed');
                    }
                    const data = await response.json();
                    onAddressChange(data.display_name || 'Could not find address for location.');
                } catch (error) {
                    console.error("Error fetching address:", error);
                    alert("Could not determine your address. Please enter it manually.");
                    onAddressChange('');
                } finally {
                    setIsLocating(false);
                }
            },
            (error) => {
                let message = "Could not get your location. Please check browser permissions.";
                if (error.code === error.PERMISSION_DENIED) {
                    message = "Location access was denied. Please enable it in your browser settings to use this feature.";
                }
                alert(message);
                console.error("Error getting location", error);
                setIsLocating(false);
            },
            { enableHighAccuracy: true }
        );
    };

    return (
        <div>
            <div className="bg-white dark:bg-slate-800 p-1.5 rounded-full shadow-lg flex items-center gap-2 w-full mx-auto border border-slate-200 dark:border-slate-700">
                {isAddressSet ? (
                    <button type="button" onClick={onFindFood} className="flex-grow min-w-0 h-10 text-left group">
                        <div className="pl-4 text-slate-800 dark:text-slate-200 font-semibold truncate group-hover:text-rose-500 dark:group-hover:text-rose-400 text-sm">
                            {address}
                        </div>
                    </button>
                ) : (
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => onAddressChange(e.target.value)}
                        placeholder="Enter your delivery address"
                        className="w-full flex-grow h-10 pl-4 bg-transparent focus:outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-500 text-sm"
                    />
                )}
                <button 
                    type="button"
                    onClick={handleLocateMe} 
                    disabled={isLocating}
                    className="flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-full text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors disabled:opacity-50"
                    aria-label="Locate me"
                >
                    {isLocating ? <Spinner size="sm" /> : <LocateMeIcon />}
                </button>
                <button 
                    type="button"
                    onClick={onFindFood}
                    className="h-10 w-12 flex-shrink-0 bg-rose-500 text-white rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors"
                    aria-label="Find food"
                >
                    <SearchIcon />
                </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2 text-center font-semibold">{error}</p>}
        </div>
    );
};

export default AddressSearch;
