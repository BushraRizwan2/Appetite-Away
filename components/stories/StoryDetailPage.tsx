import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockStories } from './mockStories';
import StickyHeader from '../landing/StickyHeader';
import Footer from '../shared/Footer';
import { UserRole, Comment } from '../../types';
import { ICONS } from '../../constants';
import DownloadAppSection from '../landing/DownloadAppSection';
import StoryCard from './StoryCard';
import Button from '../shared/Button';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../context/NotificationContext';

interface StoryDetailPageProps {
  openModal: (type: 'login' | 'signup', role?: UserRole) => void;
}

const StoryDetailPage: React.FC<StoryDetailPageProps> = ({ openModal }) => {
    const { storyId } = useParams<{ storyId: string }>();
    const story = mockStories.find(s => s.id === storyId);
    
    const { user } = useAuth();
    const { showNotification } = useNotification();

    // State for likes
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(story?.likes || 0);

    // State for comments
    const [comments, setComments] = useState<Comment[]>(story?.comments || []);
    const [newCommentText, setNewCommentText] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);

    const handleLikeClick = () => {
        if (!user) {
            openModal('login', UserRole.Customer);
            return;
        }
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
        if(!isLiked) showNotification('You liked this story!', 'success');
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCommentText.trim() || !user) return;

        setIsSubmittingComment(true);
        setTimeout(() => {
            const newComment: Comment = {
                id: `comment-${Date.now()}`,
                authorName: user.name,
                authorImageUrl: 'https://i.pravatar.cc/150?u=current.user', // Mock user image
                text: newCommentText,
                timestamp: 'Just now',
            };
            setComments(prev => [newComment, ...prev]);
            setNewCommentText('');
            setIsSubmittingComment(false);
            showNotification('Comment posted!', 'success');
        }, 500);
    };

    if (!story) {
        return (
            <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
                <StickyHeader openModal={openModal} />
                <div className="flex flex-col items-center justify-center text-center py-20">
                    <h1 className="text-3xl font-bold">Story Not Found</h1>
                    <p className="mt-4">We couldn't find the story you're looking for.</p>
                    <Link to="/stories" className="mt-8 px-6 py-2 bg-rose-500 text-white rounded-lg font-semibold">
                        Back to All Stories
                    </Link>
                </div>
                <Footer openModal={openModal} />
            </div>
        );
    }

    const otherStories = mockStories.filter(s => s.id !== story.id).slice(0, 3);

    return (
        <div className="bg-white dark:bg-slate-900">
            <StickyHeader openModal={openModal} />
            <main>
                <article>
                    {/* Hero Image Section */}
                    <header className="relative w-full h-[50vh] min-h-[300px] md:h-[60vh] md:min-h-[400px] flex items-center justify-center text-center text-white px-4">
                        <img src={story.imageUrl} alt={story.title} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60"></div>
                        <div className="relative z-10 max-w-4xl">
                            <Link to="/stories" className="inline-block mb-4 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors">
                                See All Stories
                            </Link>
                            <h1 className="text-4xl md:text-6xl font-extrabold" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                                {story.title}
                            </h1>
                        </div>
                    </header>
                    
                    {/* Main Content Area */}
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                            {/* Story Content (main column) */}
                            <div className="lg:col-span-8">
                                <div className="prose dark:prose-invert lg:prose-xl max-w-none text-slate-700 dark:text-slate-300">
                                    {story.content.split('\n')
                                        .filter(p => p.trim() !== '')
                                        .map((paragraph, index) => (
                                            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
                                        ))}
                                </div>

                                {/* Comments Section */}
                                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                                    <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">Comments ({comments.length})</h2>
                                    
                                    <div className="mb-8">
                                        {user ? (
                                            <form onSubmit={handleCommentSubmit} className="flex items-start gap-4">
                                                <img src="https://i.pravatar.cc/150?u=current.user" alt="Your avatar" className="w-10 h-10 rounded-full flex-shrink-0" />
                                                <div className="flex-grow">
                                                    <textarea
                                                        value={newCommentText}
                                                        onChange={e => setNewCommentText(e.target.value)}
                                                        rows={3}
                                                        placeholder="Join the discussion..."
                                                        className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white dark:bg-slate-800"
                                                        required
                                                    />
                                                    <Button type="submit" disabled={isSubmittingComment} className="mt-2">
                                                        {isSubmittingComment ? 'Posting...' : 'Post Comment'}
                                                    </Button>
                                                </div>
                                            </form>
                                        ) : (
                                            <div className="text-center p-6 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                                <p className="font-semibold mb-2 text-slate-700 dark:text-slate-200">Want to join the conversation?</p>
                                                <Button onClick={() => openModal('login', UserRole.Customer)}>
                                                    Login to Comment & Like
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        {comments.map(comment => (
                                            <div key={comment.id} className="flex items-start gap-4">
                                                <img src={comment.authorImageUrl} alt={comment.authorName} className="w-10 h-10 rounded-full flex-shrink-0" />
                                                <div className="flex-grow bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                                                    <div className="flex justify-between items-center">
                                                        <p className="font-bold text-slate-800 dark:text-slate-100">{comment.authorName}</p>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">{comment.timestamp}</p>
                                                    </div>
                                                    <p className="mt-2 text-slate-700 dark:text-slate-300">{comment.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Writer's Section & Stats (sidebar) */}
                            <aside className="lg:col-span-4 mt-12 lg:mt-0">
                                <div className="sticky top-24 space-y-8">
                                    {/* Writer's Card */}
                                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl">
                                        <div className="flex items-center gap-4">
                                            <img src={story.authorImageUrl} alt={story.authorName} className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-slate-600 shadow-md"/>
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">{story.authorName}</h3>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">{story.authorRole}</p>
                                            </div>
                                        </div>
                                        <Button fullWidth className="mt-4">Follow</Button>
                                    </div>
                                    
                                    {/* Stats Card */}
                                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl">
                                         <div className="flex justify-around items-center text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <button onClick={handleLikeClick} className={`p-3 rounded-full transition-colors ${isLiked ? 'bg-rose-100 dark:bg-rose-900/50 text-rose-500' : 'bg-white dark:bg-slate-700 text-slate-400 hover:bg-rose-100'}`}>
                                                    {ICONS.thumbsUp}
                                                </button>
                                                <span className="font-bold text-lg text-slate-700 dark:text-slate-200">{likeCount.toLocaleString()}</span>
                                                <span className="text-xs text-slate-500 dark:text-slate-400">Likes</span>
                                            </div>
                                            <div className="h-12 w-px bg-slate-200 dark:bg-slate-700"></div>
                                             <div className="flex flex-col items-center gap-1">
                                                <span className="text-slate-400 p-3">{ICONS.share}</span>
                                                <span className="font-bold text-lg text-slate-700 dark:text-slate-200">{story.shares.toLocaleString()}</span>
                                                <span className="text-xs text-slate-500 dark:text-slate-400">Shares</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Social Share Card */}
                                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl">
                                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 text-center mb-4">Share this story</h3>
                                        <div className="flex justify-center items-center gap-4">
                                            <a href="#" aria-label="Share on Facebook" className="p-3 bg-white dark:bg-slate-700 rounded-full hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors">{ICONS.facebook}</a>
                                            <a href="#" aria-label="Share on Twitter" className="p-3 bg-white dark:bg-slate-700 rounded-full hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors">{ICONS.twitter}</a>
                                            <a href="#" aria-label="Share on LinkedIn" className="p-3 bg-white dark:bg-slate-700 rounded-full hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors">{ICONS.linkedin}</a>
                                        </div>
                                    </div>

                                </div>
                            </aside>
                        </div>
                    </div>

                    {/* More Stories Section */}
                    <section className="bg-slate-50 dark:bg-slate-800/50 py-16">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                             <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 text-center mb-12">More Stories to Devour</h2>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {otherStories.map(s => <StoryCard key={s.id} story={s} />)}
                            </div>
                        </div>
                    </section>
                </article>
            </main>
            
            <DownloadAppSection />
            <Footer openModal={openModal} />
        </div>
    );
};

export default StoryDetailPage;