import React from 'react';
import { Story } from '../../types';
import { Link } from 'react-router-dom';

interface StoryCardProps {
    story: Story;
}

const roleColors = {
    Customer: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    Restaurant: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
    Rider: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
    Shopkeeper: 'bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-300',
};

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-all duration-300 flex flex-col">
            <div className="relative">
                <img 
                    src={story.imageUrl} 
                    alt={story.title} 
                    className="w-full h-48 object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${roleColors[story.authorRole]}`}>
                        {story.authorRole}
                    </span>
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 leading-tight">{story.title}</h3>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">by {story.authorName}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 flex-grow line-clamp-4">
                    {story.content}
                </p>
                <Link to={`/stories/${story.id}`} className="font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 self-start mt-auto">
                    Read More &rarr;
                </Link>
            </div>
        </div>
    );
};

export default StoryCard;