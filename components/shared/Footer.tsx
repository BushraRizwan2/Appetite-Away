import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME, ICONS } from '../../constants';
import { UserRole } from '../../types';

interface FooterProps {
  openModal?: (type: 'login' | 'signup', role?: UserRole) => void;
}

const Footer: React.FC<FooterProps> = ({ openModal }) => (
    <footer className="bg-[#f43f5e] text-rose-100 p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 className="font-bold text-white text-lg mb-4">{APP_NAME}</h3>
                <p className="text-sm">Your favorite food, delivered.</p>
            </div>
            <div>
                <h4 className="font-semibold text-white mb-4">Discover</h4>
                <ul className="space-y-2 text-sm">
                    <li><Link to="/customer/home" className="hover:text-white">Home</Link></li>
                    <li><Link to="/customer/home" className="hover:text-white">Restaurants</Link></li>
                    <li><Link to="/customer/profile/vouchers" className="hover:text-white">Offers</Link></li>
                    <li><Link to="/stories" onClick={() => window.scrollTo(0, 0)} className="text-white font-bold hover:underline">Scrumptious Stories</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold text-white mb-4">About</h4>
                <ul className="space-y-2 text-sm">
                    <li>
                        <button onClick={() => openModal?.('signup', UserRole.Restaurant)} className="hover:text-white text-left w-full">
                            Partner With Us
                        </button>
                    </li>
                     <li>
                        <button onClick={() => openModal?.('signup', UserRole.Rider)} className="hover:text-white text-left w-full">
                            Ride With Us
                        </button>
                    </li>
                     <li><Link to="/customer/profile/help-center" className="hover:text-white">Help Center</Link></li>
                </ul>
            </div>
             <div>
                <h4 className="font-semibold text-white mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                    <a href="https://www.facebook.com/BushraRizwanKhan/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white hover:opacity-80">{ICONS.facebook}</a>
                    <a href="https://x.com/bushra_rizwan" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-white hover:opacity-80">{ICONS.twitter}</a>
                    <a href="https://www.instagram.com/bushrarizwankhan/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white hover:opacity-80">{ICONS.instagram}</a>
                    <a href="https://www.linkedin.com/in/bushrarizwan/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white hover:opacity-80">{ICONS.linkedin}</a>
                </div>
            </div>
        </div>
        <div className="mt-8 pt-8 border-t border-rose-200/30 text-center text-sm text-rose-200">
            <p>© 2025 {APP_NAME}. All Rights Reserved. | Powered by Bushra Rizwan</p>
        </div>
    </footer>
);

export default Footer;