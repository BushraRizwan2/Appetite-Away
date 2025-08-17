
import React from 'react';

const APP_STORE_URL = '#';
const GOOGLE_PLAY_URL = '#';
const APP_GALLERY_URL = '#';

const DownloadAppSection: React.FC = () => {
    return (
        <section className="bg-white dark:bg-slate-900 py-12 md:py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-8 text-center md:text-left">
                    Put us in your pocket
                </h2>
                <div className="bg-[#f43f5e] rounded-2xl flex flex-col md:flex-row items-center overflow-hidden shadow-2xl">
                    {/* Left Side: Text, QR, Buttons */}
                    <div className="p-8 lg:p-12 md:w-1/2 flex flex-col justify-center text-white z-10 order-2 md:order-1">
                        <h3 className="text-2xl lg:text-3xl font-bold mb-4">Download the food and groceries you love</h3>
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="bg-white p-2 rounded-lg flex-shrink-0 w-24 h-24">
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://appetite.away" alt="QR Code" className="w-full h-full"/>
                            </div>
                            <p className="text-rose-100 text-sm">
                                It's all at your fingertips – the restaurants and shops you love. Find the right food and groceries to suit your mood, and make the first bite last. Go ahead, download us.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                             <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store" className="h-12">
                                <img src="https://apple-resources.s3.amazonaws.com/media-badges/download-on-the-app-store/white/en-us.svg" alt="Download on the App Store" className="h-full"/>
                            </a>
                            <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play" className="h-12">
                                <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" className="h-full scale-110"/>
                            </a>
                             <a href={APP_GALLERY_URL} target="_blank" rel="noopener noreferrer" aria-label="Explore it on AppGallery" className="h-12">
                                <img src="https://consumer-img.huawei.com/etc/designs/huawei-cbg-site/clientlib-campaign/appgallery-2022/images/explore-it-on-appgallery-black.png" alt="Explore it on AppGallery" className="h-full"/>
                            </a>
                        </div>
                    </div>

                    {/* Right Side: Phones */}
                    <div className="md:w-1/2 w-full h-80 md:h-auto order-1 md:order-2 flex items-end justify-center pt-8 md:pt-0">
                         <div className="relative w-full h-full">
                            <img src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=400" alt="App screen 1" className="absolute bottom-0 left-1/2 -translate-x-[70%] w-40 sm:w-48 lg:w-56 rounded-2xl shadow-2xl rotate-[-10deg] transform" />
                            <img src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=400" alt="App screen 2" className="absolute z-10 bottom-0 left-1/2 -translate-x-[30%] w-40 sm:w-48 lg:w-56 rounded-2xl shadow-2xl rotate-[5deg] transform" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DownloadAppSection;
