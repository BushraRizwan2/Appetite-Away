

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import StickyHeader from '../landing/StickyHeader';
import Footer from '../shared/Footer';
import StoryCard from './StoryCard';
import ShareStoryModal from './ShareStoryModal';
import { mockStories } from './mockStories';
import { UserRole } from '../../types';
import Button from '../shared/Button';
import { ICONS } from '../../constants';
import DownloadAppSection from '../landing/DownloadAppSection';
import Icon from '../shared/Icon';

interface ScrumptiousStoriesPageProps {
  openModal: (type: 'login' | 'signup', role?: UserRole) => void;
}

const STORY_ROLES = ['All', 'Customer', 'Restaurant', 'Rider', 'Shopkeeper'];

const ScrumptiousStoriesPage: React.FC<ScrumptiousStoriesPageProps> = ({ openModal }) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('All');

    const filteredStories = useMemo(() => {
        if (activeTab === 'All') {
            return mockStories;
        }
        return mockStories.filter(story => story.authorRole === activeTab);
    }, [activeTab]);

    return (
        <div className="bg-slate-50 dark:bg-slate-900">
            <StickyHeader openModal={openModal} />
            
            <main>
                {/* Hero Section */}
                <section 
                    className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-white text-center px-4" 
                    style={{backgroundImage: "url('https://images.pexels.com/photos/326281/pexels-photo-326281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div className="relative z-10 max-w-3xl">
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-4" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.5)'}}>
                            Scrumptious Stories
                        </h1>
                        <p className="text-lg" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.7)'}}>
                           Tales from the table, the kitchen, and the road.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        {/* Filter Tabs */}
                        <div className="mb-12">
                            <div className="flex justify-center flex-wrap gap-2">
                                {STORY_ROLES.map(role => (
                                    <button
                                        key={role}
                                        onClick={() => setActiveTab(role)}
                                        className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-all duration-200 ${
                                            activeTab === role 
                                            ? 'bg-rose-500 text-white shadow-md' 
                                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-100 dark:hover:bg-slate-700'
                                        }`}
                                    >
                                        {role === 'All' ? 'All Stories' : `From ${role}s`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Story Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredStories.map(story => (
                                <StoryCard key={story.id} story={story} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section 
                    className="relative py-20 px-4 text-center overflow-hidden bg-cover bg-center"
                    style={{backgroundImage: "url('https://images.pexels.com/photos/716276/pexels-photo-716276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"}}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                        <Icon className="h-24 w-24 text-white mx-auto mb-4">{ICONS.quill}</Icon>
                        <h2 className="text-3xl font-bold text-white mb-4">Have a story to share?</h2>
                        <p className="text-gray-200 mb-8">
                            Whether you're a customer who found a new favorite dish, a rider with a heartwarming delivery, or a partner with a success story, we want to hear it!
                        </p>
                        <Button
                            onClick={() => setIsShareModalOpen(true)}
                            className="bg-white text-gray-800 font-bold hover:bg-gray-200 text-lg py-3 px-8 shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                            Share Your Story
                        </Button>
                    </div>
                </section>
            </main>
            
            <DownloadAppSection />

            <Footer openModal={openModal} />
            
            <ShareStoryModal 
                isOpen={isShareModalOpen} 
                onClose={() => setIsShareModalOpen(false)}
            />
        </div>
    );
};

export default ScrumptiousStoriesPage;
