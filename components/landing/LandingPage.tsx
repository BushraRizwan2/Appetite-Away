
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StickyHeader from './StickyHeader';
import AddressSearch from '../customer/AddressSearch';
import LocationModal from '../customer/LocationModal';
import DownloadAppSection from './DownloadAppSection';
import Footer from '../shared/Footer';
import { UserRole } from '../../types';
import Button from '../shared/Button';
import { getMockRestaurants } from '../customer/CustomerDashboard';
import RestaurantCard from '../customer/RestaurantCard';
import FaqSection from './FaqSection';

interface LandingPageProps {
  openModal: (type: 'login' | 'signup', role?: UserRole) => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; text: string; }> = ({ icon, title, text }) => (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-rose-50 dark:hover:bg-slate-800/50 h-full flex flex-col group">
        <div className="flex justify-center items-center h-24 w-24 mx-auto bg-rose-100 dark:bg-rose-900/50 rounded-full mb-4 text-rose-500 transition-colors duration-300 group-hover:bg-rose-500 group-hover:text-white">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 flex-grow">{text}</p>
    </div>
);

const CityCard: React.FC<{ name: string; imageUrl: string; }> = ({ name, imageUrl }) => (
    <a href="#" className="relative rounded-lg overflow-hidden group shadow-lg block">
        <img src={imageUrl} alt={name} className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-white text-2xl font-bold" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.7)'}}>{name}</h3>
        </div>
    </a>
);

const TestimonialCard: React.FC<{ quote: string; name: string; image: string; }> = ({ quote, name, image }) => (
    <div className="bg-rose-50 dark:bg-slate-800/60 p-6 rounded-lg text-center relative transition-all duration-300 hover:scale-105 hover:bg-rose-100 dark:hover:bg-slate-800 shadow-md hover:shadow-xl cursor-pointer">
         <div className="absolute top-4 left-4 text-rose-200 dark:text-rose-800 text-6xl opacity-50">
            “
        </div>
        <img src={image} alt={name} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white dark:border-slate-700 shadow-md relative z-10" />
        <p className="text-slate-600 dark:text-slate-300 italic mb-4 relative z-10">"{quote}"</p>
        <p className="font-bold text-slate-800 dark:text-slate-100 relative z-10">{name}</p>
    </div>
);

const CelebrityCard: React.FC<{ name: string; image: string; }> = ({ name, image }) => (
    <div className="text-center group">
        <div className="relative w-32 h-32 mx-auto mb-4">
            <img src={image} alt={name} className="w-full h-full rounded-full object-cover border-4 border-rose-200 dark:border-rose-800 shadow-lg transform group-hover:scale-110 transition-transform duration-300"/>
        </div>
        <h4 className="font-bold text-lg text-slate-700 dark:text-slate-200">{name}</h4>
    </div>
);

const PartnerTestimonialCard: React.FC<{ quote: string; name: string; restaurant: string; logo: string; }> = ({ quote, name, restaurant, logo }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md transition-transform hover:scale-105 duration-300">
        <div className="flex items-center gap-4 mb-4">
            <img src={logo} alt={`${restaurant} logo`} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-contain bg-white p-1 shadow-sm" />
            <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100">{name}</h4>
                <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">{restaurant}</p>
            </div>
        </div>
        <p className="text-slate-600 dark:text-slate-300 italic">"{quote}"</p>
    </div>
);

const RiderTestimonialCard: React.FC<{ quote: string; name: string; image: string; detail: string; }> = ({ quote, name, image, detail }) => (
    <div className="bg-emerald-50 dark:bg-slate-800/60 p-6 rounded-lg text-center relative transition-all duration-300 hover:scale-105 hover:bg-emerald-100 dark:hover:bg-slate-800 shadow-md hover:shadow-xl cursor-pointer">
        <img src={image} alt={name} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white dark:border-slate-700 shadow-md" />
        <p className="text-slate-600 dark:text-slate-300 italic mb-4">"{quote}"</p>
        <p className="font-bold text-slate-800 dark:text-slate-100">{name}</p>
        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{detail}</p>
    </div>
);


const FloatingIcon: React.FC<{ icon: string; top?: string; bottom?: string; left?: string; right?: string; animationDelay: string; size?: string; opacity?: string; }> = ({ icon, top, bottom, left, right, animationDelay, size = 'w-12', opacity = 'opacity-20' }) => (
    <div 
        className={`absolute animate-float ${size} ${opacity} text-rose-300 dark:text-rose-900/50 hidden md:block`}
        style={{ top, bottom, left, right, animationDelay }}
    >
        {icon}
    </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ openModal }) => {
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [currentAddress, setCurrentAddress] = useState('');
    const [addressError, setAddressError] = useState('');
    const [isAddressSet, setIsAddressSet] = useState(false);

    const handleOpenLocationModal = () => {
        setAddressError('');
        setIsLocationModalOpen(true);
    };
    
    const handleConfirmAddress = () => {
        setIsLocationModalOpen(false);
        if (currentAddress.trim()) {
            setIsAddressSet(true);
            setAddressError('');
        }
    };
    
    const handleAddressChange = (newAddress: string) => {
        setCurrentAddress(newAddress);
        if (isAddressSet) {
           setIsAddressSet(false);
        }
        if (newAddress.trim()) setAddressError('');
    };

    const cities = [
        { name: 'Karachi', imageUrl: 'https://images.pexels.com/photos/1105325/pexels-photo-1105325.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'Lahore', imageUrl: 'https://images.pexels.com/photos/14849310/pexels-photo-14849310.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'Islamabad', imageUrl: 'https://images.pexels.com/photos/5472253/pexels-photo-5472253.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'Rawalpindi', imageUrl: 'https://images.pexels.com/photos/13554625/pexels-photo-13554625.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'Faisalabad', imageUrl: 'https://images.pexels.com/photos/13109968/pexels-photo-13109968.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'Multan', imageUrl: 'https://images.pexels.com/photos/16839353/pexels-photo-16839353/free-photo-of-tomb-of-shah-rukn-e-alam.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'Peshawar', imageUrl: 'https://images.pexels.com/photos/14605151/pexels-photo-14605151.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'Quetta', imageUrl: 'https://images.pexels.com/photos/12837785/pexels-photo-12837785.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ];

    const popularRestaurants = getMockRestaurants().slice(0, 8);

    const testimonials = [
        { name: 'Aisha Khan', quote: 'Appetite Away is my go-to for late-night cravings. The service is always fast and the food is hot!', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200' },
        { name: 'Bilal Ahmed', quote: 'I love the variety of restaurants available. I can get anything from traditional Pakistani food to gourmet burgers.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200' },
        { name: 'Fatima Ali', quote: 'The app is so easy to use! Ordering is a breeze and I can track my food in real-time. Highly recommend!', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200' }
    ];

     const celebrities = [
        { name: 'Maya Ali', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400' },
        { name: 'Fawad Khan', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400' },
        { name: 'Mahira Khan', image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Mahira_Khan_at_a_promotional_event_for_Raees_in_Dubai.jpg' },
        { name: 'Sheheryar Munawar', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400' }
    ];

    const partnerTestimonials = [
        { name: 'Ali Hassan', restaurant: 'The Golden Spoon', logo: 'https://ui-avatars.com/api/?name=The+Golden+Spoon&background=ffedd5&color=9a3412', quote: 'Partnering with Appetite Away was the best decision for my business. Our online orders have increased by 60%!' },
        { name: 'Fatima Sheikh', restaurant: 'Pizza Palace', logo: 'https://ui-avatars.com/api/?name=Pizza+Palace&background=dbeafe&color=1e40af', quote: 'The restaurant portal is so easy to use. Managing our menu and tracking sales has never been simpler. The support team is fantastic.'},
        { name: 'Usman Khalid', restaurant: 'Burger Barn', logo: 'https://ui-avatars.com/api/?name=Burger+Barn&background=fef2f2&color=991b1b', quote: 'We were hesitant to go online, but Appetite Away made the process seamless. We\'re reaching a whole new customer base.' },
    ];
    
    const riderTestimonials = [
        { name: 'Ahmed Khan', image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=200', quote: 'The flexibility is amazing! I can earn on my own schedule, and the weekly payouts are a game-changer.', detail: 'Rider since 2023' },
        { name: 'Sana Ali', image: 'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?q=80&w=200', quote: 'I feel supported by the team, and the app makes finding deliveries and navigating so easy. It\'s a great way to earn extra income.', detail: 'Top Rider - Karachi' },
        { name: 'Zainab Hasan', image: 'https://images.unsplash.com/photo-1605406575497-015ab0d21b9b?q=80&w=200', quote: 'Being a rider for Appetite Away is more than a job; it\'s like being part of a community. I really enjoy the freedom it gives me.', detail: 'Full-time Rider' }
    ];


    const foodIcons = {
        burger: '🍔', pizza: '🍕', taco: '🌮', fries: '🍟', donut: '🍩', ramen: '🍜', salad: '🥗',
        sushi: '🍣', cupcake: '🧁', steak: '🥩', soup: '🍲', coffee: '☕️', kebab: '🍢'
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900">
             <style>{`
                @keyframes float-up-down {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float-up-down 5s ease-in-out infinite;
                }
                @keyframes fade-in-slow {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-slow {
                    animation: fade-in-slow 0.5s ease-out forwards;
                }
            `}</style>

            <StickyHeader openModal={openModal} />
            
            <main>
                {/* Hero Section */}
                <section className="relative h-screen min-h-[600px] md:min-h-[700px] flex items-center justify-center text-white text-center px-4" style={{backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1740')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="relative z-10 w-full flex flex-col items-center">
                        <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl mt-12">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.5)'}}>Craving something delicious?</h1>
                            <p className="text-base sm:text-lg mb-8" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.7)'}}>Get your favorite food delivered, fast.</p>
                            
                            <AddressSearch
                                address={currentAddress}
                                onAddressChange={handleAddressChange}
                                onFindFood={handleOpenLocationModal}
                                error={addressError}
                                isAddressSet={isAddressSet}
                            />
                        </div>

                        {isAddressSet && (
                             <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-4 animate-fade-in-slow">
                                <Button variant="primary" className="font-bold shadow-lg text-xs px-3 py-2 sm:text-sm sm:px-4 sm:py-2 md:text-base md:px-6 md:py-3 transition-all hover:scale-105">Restaurant?</Button>
                                <Button variant="primary" className="font-bold shadow-lg text-xs px-3 py-2 sm:text-sm sm:px-4 sm:py-2 md:text-base md:px-6 md:py-3 transition-all hover:scale-105">Mart?</Button>
                                <Button variant="primary" className="font-bold shadow-lg text-xs px-3 py-2 sm:text-sm sm:px-4 sm:py-2 md:text-base md:px-6 md:py-3 transition-all hover:scale-105">Home chefs</Button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 px-4">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-12">We make it <span className="text-rose-500">simple and easy</span></h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <FeatureCard 
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
                                title="The Customer Orders" 
                                text="The customer places an order through the Appetite Away app." 
                            />
                            <FeatureCard 
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                                title="You Prepare" 
                                text="You will receive a notification to start preparing the order." 
                            />
                             <FeatureCard 
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" /><path strokeLinecap="round" strokeLinejoin="round" d="M18 17h-5v-4h5l1 4z" /></svg>}
                                title="We Deliver" 
                                text="A rider will be along shortly to pick up the order and deliver it to the customer." 
                            />
                             <FeatureCard 
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z" /></svg>}
                                title="Watch Your Business Grow" 
                                text="We provide you with insights so you can see your business growing." 
                            />
                        </div>
                    </div>
                </section>
                
                 {/* Cities Section */}
                <section className="bg-white dark:bg-slate-800 py-20 px-4 relative overflow-hidden">
                    <FloatingIcon icon={foodIcons.pizza} top="10%" left="5%" animationDelay="0s" size="w-16" />
                    <FloatingIcon icon={foodIcons.burger} top="70%" left="15%" animationDelay="1s" />
                    <FloatingIcon icon={foodIcons.donut} top="20%" right="8%" animationDelay="2s" size="w-14" />
                    <FloatingIcon icon={foodIcons.ramen} bottom="5%" right="25%" animationDelay="3s" size="w-16" />
                    <FloatingIcon icon={foodIcons.sushi} top="80%" right="10%" animationDelay="4s" size="w-12" opacity="opacity-10 dark:opacity-20" />
                    <FloatingIcon icon={foodIcons.cupcake} top="5%" right="40%" animationDelay="5s" size="w-10" />
                    <FloatingIcon icon={foodIcons.taco} top="50%" left="2%" animationDelay="0.5s" size="w-14" />
                    <FloatingIcon icon={foodIcons.fries} top="15%" right="5%" animationDelay="1.5s" />
                    <FloatingIcon icon={foodIcons.kebab} bottom="15%" left="8%" animationDelay="4.5s" size="w-12" />

                    <div className="max-w-6xl mx-auto text-center relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Find us in these cities</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">From the bustling streets of Karachi to the heart of Lahore, we're expanding to bring your favorite meals right to your doorstep.</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {cities.map(city => <CityCard key={city.name} name={city.name} imageUrl={city.imageUrl} />)}
                        </div>
                    </div>
                </section>

                {/* Popular Restaurants Section */}
                <section className="py-20 px-4 relative overflow-hidden">
                    <FloatingIcon icon={foodIcons.taco} top="50%" left="2%" animationDelay="0.5s" size="w-14" />
                    <FloatingIcon icon={foodIcons.fries} top="15%" right="5%" animationDelay="1.5s" />
                    <FloatingIcon icon={foodIcons.salad} bottom="10%" right="10%" animationDelay="2.5s" size="w-16" />
                    <FloatingIcon icon={foodIcons.steak} top="60%" right="15%" animationDelay="3.5s" size="w-14" opacity="opacity-10 dark:opacity-20" />
                    <FloatingIcon icon={foodIcons.kebab} bottom="15%" left="8%" animationDelay="4.5s" size="w-12" />
                    <FloatingIcon icon={foodIcons.pizza} top="10%" left="5%" animationDelay="0s" size="w-16" />
                    <FloatingIcon icon={foodIcons.burger} top="70%" left="15%" animationDelay="1s" />
                    <FloatingIcon icon={foodIcons.donut} top="20%" right="8%" animationDelay="2s" size="w-14" />

                    <div className="max-w-6xl mx-auto relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-12 text-center">Popular Restaurants <span className="text-rose-500">Near You</span></h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {popularRestaurants.map(restaurant => (
                                <Link to={`/customer/restaurants/${restaurant.id}`} key={restaurant.id} className="block">
                                    <RestaurantCard restaurant={restaurant} openModal={openModal} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Customer Feedback Section */}
                <section className="bg-white dark:bg-slate-800 py-20 px-4">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-12">Straight from our <span className="text-rose-500">Customers</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.map(t => <TestimonialCard key={t.name} {...t} />)}
                        </div>
                    </div>
                </section>

                {/* Partner Sections */}
                <section className="bg-slate-100 dark:bg-slate-900">
                    <div 
                        className="relative bg-cover bg-center py-24 px-4 text-center text-white" 
                        style={{backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1548')"}}
                    >
                        <div className="absolute inset-0 bg-rose-900/70 backdrop-blur-sm"></div>
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <div className="mb-6">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-rose-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.5)'}}>
                                Grow Your Restaurant with Appetite Away
                            </h2>
                            <p className="text-lg text-slate-200 mb-10 max-w-xl mx-auto">
                                Join hundreds of restaurants who have increased their sales and reached new customers on our platform.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10 text-slate-100">
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span>More Customers</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
                                    <span>Easy Management</span>
                                </div>
                                <div className="flex items-center gap-2">
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span>Fast Payouts</span>
                                </div>
                            </div>
                            <Button 
                                onClick={() => openModal('signup', UserRole.Restaurant)}
                                className="bg-white text-rose-600 font-bold hover:bg-slate-100 text-lg py-3 px-8 shadow-2xl transform hover:scale-105 transition-all duration-300"
                            >
                                Become a Partner Today
                            </Button>
                        </div>
                    </div>
                     <div className="py-20 px-4">
                        <div className="max-w-6xl mx-auto text-center">
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-12">What Our <span className="text-rose-500">Partners Say</span></h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {partnerTestimonials.map(pt => <PartnerTestimonialCard key={pt.name} {...pt} />)}
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Rider Section */}
                <section 
                    className="relative bg-cover bg-center py-24 px-4 text-center text-white" 
                    style={{backgroundImage: "url('https://images.pexels.com/photos/7869305/pexels-photo-7869305.jpeg?auto=compress&cs=tinysrgb&w=1740')"}}
                >
                    <div className="absolute inset-0 bg-gray-800/70 backdrop-blur-sm"></div>
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="mb-6">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.5)'}}>
                            Ride with Appetite Away
                        </h2>
                        <p className="text-lg text-slate-200 mb-10 max-w-xl mx-auto">
                            Enjoy flexibility, freedom, and competitive earnings. Join the Appetite Away rider community and start earning on your own schedule.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10 text-slate-100">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span>Weekly Payouts</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>Flexible Hours</span>
                            </div>
                            <div className="flex items-center gap-2">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>Full Support</span>
                            </div>
                        </div>
                        <Button 
                            onClick={() => openModal('signup', UserRole.Rider)}
                            className="bg-white text-emerald-600 font-bold hover:bg-slate-100 text-lg py-3 px-8 shadow-2xl transform hover:scale-105 transition-all duration-300"
                        >
                            Start Earning Now
                        </Button>
                    </div>
                </section>

                {/* Rider Feedback Section */}
                <section className="bg-white dark:bg-slate-800 py-20 px-4">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-12">Hear from Our <span className="text-emerald-500">Riders</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {riderTestimonials.map(t => <RiderTestimonialCard key={t.name} {...t} />)}
                        </div>
                    </div>
                </section>

            </main>
            
            <DownloadAppSection />
            
            {/* Celebrities Section */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-12">Join Our <span className="text-rose-500">Celebrity Fans</span></h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {celebrities.map(celeb => <CelebrityCard key={celeb.name} {...celeb} />)}
                    </div>
                </div>
            </section>

            <FaqSection />

            <Footer openModal={openModal} />

            <LocationModal
                isOpen={isLocationModalOpen}
                onClose={() => setIsLocationModalOpen(false)}
                address={currentAddress}
                onAddressChange={handleAddressChange}
                onConfirmAddress={handleConfirmAddress}
            />
        </div>
    );
};

export default LandingPage;
