



import React from 'react';
import Button from '../shared/Button';
import { ICONS } from '../../constants';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmAddress: () => void;
  address: string;
  onAddressChange: (address: string) => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, onConfirmAddress, address, onAddressChange }) => {
  
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-slate-900 overflow-y-auto" 
      aria-modal="true" 
      role="dialog"
      aria-labelledby="location-modal-title"
      aria-describedby="location-modal-description"
    >
      {/* Header */}
      <header className="p-4 flex-shrink-0 relative">
        <div className="flex items-start gap-3">
            <span className="text-rose-500 mt-1">{ICONS.address}</span>
            <div>
                <h2 id="location-modal-title" className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">What's your exact location?</h2>
                <p id="location-modal-description" className="text-sm md:text-base text-slate-500 dark:text-slate-400">Providing your location enables more accurate search and delivery ETA, seamless order tracking and personalised recommendations.</p>
            </div>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" aria-label="Close">
            {ICONS.close}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex flex-col relative">
        {/* Address Input at the top of the map */}
        <div className="px-4 py-2 absolute top-0 left-0 right-0 z-10">
          <div className="relative">
            <input
              type="text"
              value={address}
              onChange={(e) => onAddressChange(e.target.value)}
              placeholder="Enter your address"
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
             {address && (
              <button onClick={() => onAddressChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label="Clear address">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </button>
            )}
          </div>
        </div>
        
        {/* Map Area */}
        <div className="flex-grow bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
            {/* Using an iframe for an interactive map */}
            <iframe
                title="Location Map"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent from-20% pointer-events-none"></div>

            {/* Center Pin & Tooltip */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                <div className="bg-slate-800 text-white text-sm font-semibold px-4 py-2 rounded-md mb-2 whitespace-nowrap shadow-lg">
                    We'll deliver here
                </div>
                <span className="text-rose-500">{ICONS.locationPin}</span>
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-24 right-4 flex flex-col gap-1 z-10">
                <button className="w-10 h-10 bg-white dark:bg-slate-800 rounded-t-md shadow-md flex items-center justify-center border-b border-slate-200 dark:border-slate-700" aria-label="Zoom in">{ICONS.add}</button>
                <button className="w-10 h-10 bg-white dark:bg-slate-800 rounded-b-md shadow-md flex items-center justify-center" aria-label="Zoom out">{ICONS.minus}</button>
            </div>
        </div>
      </div>
      
      {/* Footer Button */}
      <footer className="p-4 flex-shrink-0 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-center">
        <Button variant="primary" onClick={onConfirmAddress} className="py-3 px-8 text-base shadow-lg hover:shadow-xl transition-shadow bg-[#f43f5e] text-white">
          Confirm & Find Food
        </Button>
      </footer>
    </div>
  );
};

export default LocationModal;