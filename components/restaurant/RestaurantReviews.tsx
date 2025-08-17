
import React, { useState } from 'react';
import { Review } from '../../types';
import Button from '../shared/Button';
import { ICONS } from '../../constants';
import Modal from '../shared/Modal';
import TabFilter from '../shared/TabFilter';

const MOCK_REVIEWS: Review[] = [
    { id: 'rev1', author: 'Ayesha K.', rating: 5, comment: 'Absolutely delicious! The food was hot and fresh. The Pepperoni Pizza was the best I\'ve had in a long time. Will definitely order again.', timestamp: '2 days ago' },
    { id: 'rev2', author: 'Bilal M.', rating: 4, comment: 'Good food, but the delivery was a bit slow. The garlic bread was a little cold on arrival. Overall, a positive experience though.', timestamp: '1 week ago' },
    { id: 'rev3', author: 'Fatima Z.', rating: 5, comment: 'Best in town! The quality is always consistent. My go-to for a quick and satisfying meal.', timestamp: '3 days ago' },
    { id: 'rev4', author: 'Ali Raza', rating: 3, comment: 'It was okay. The portion size for the House Salad could have been better for the price.', timestamp: '2 weeks ago' },
    { id: 'rev5', author: 'Sana J.', rating: 2, comment: 'The order was incorrect. I ordered a chicken karahi and received something else entirely. Disappointed.', timestamp: '2 weeks ago' },
];

const ReplyModal: React.FC<{ review: Review, onClose: () => void }> = ({ review, onClose }) => {
    const [reply, setReply] = useState('');

    const handleSubmit = () => {
        console.log(`Replying to ${review.author}: ${reply}`);
        alert('Reply submitted!');
        onClose();
    }

    return (
        <Modal isOpen={true} onClose={onClose}>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl">
                <h3 className="text-lg font-bold mb-2">Reply to {review.author}</h3>
                <blockquote className="text-sm bg-slate-100 dark:bg-slate-800 p-2 rounded-md italic border-l-4 border-slate-300 dark:border-slate-600">"{review.comment}"</blockquote>
                <textarea
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    rows={4}
                    placeholder="Write your public reply..."
                    className="w-full mt-4 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm bg-white dark:bg-slate-800"
                />
                <div className="flex gap-2 mt-4">
                    <Button variant="secondary" onClick={onClose} fullWidth>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit} fullWidth disabled={!reply}>Send Reply</Button>
                </div>
            </div>
        </Modal>
    );
}

const ReviewCard: React.FC<{ review: Review, onReply: (review: Review) => void }> = ({ review, onReply }) => {
    return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{review.author}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{review.timestamp}</p>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                    <span className="font-bold text-sm">{review.rating.toFixed(1)}</span>
                    {ICONS.filledStar}
                </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{review.comment}</p>
            <div className="flex gap-2 mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                <Button variant="primary" onClick={() => onReply(review)}><span className="mr-2">{ICONS.reply}</span>Reply</Button>
                <Button variant="secondary" onClick={() => alert('Review flagged for moderation.')}><span className="mr-2">{ICONS.flag}</span>Flag</Button>
            </div>
        </div>
    );
};

const RestaurantReviews: React.FC = () => {
    const [reviews, setReviews] = useState(MOCK_REVIEWS);
    const [replyingTo, setReplyingTo] = useState<Review | null>(null);
    const [filter, setFilter] = useState('All');

    const filteredReviews = reviews.filter(r => {
        if (filter === 'All') return true;
        if (filter === 'Positive') return r.rating >= 4;
        if (filter === 'Negative') return r.rating <= 2;
        return true;
    });

    return (
        <div className="p-4 space-y-6">
            {replyingTo && <ReplyModal review={replyingTo} onClose={() => setReplyingTo(null)} />}
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Customer Feedback</h2>
            
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                 <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Insights</h3>
                 <p className="text-sm text-slate-600 dark:text-slate-400">Common feedback themes include: <span className="font-semibold text-emerald-600">"food quality"</span>, <span className="font-semibold text-emerald-600">"fast delivery"</span>, and <span className="font-semibold text-orange-600">"portion size"</span>.</p>
            </div>

            <TabFilter 
                options={['All', 'Positive', 'Negative']}
                activeOption={filter}
                onOptionClick={setFilter}
                className="max-w-sm"
            />

            <div className="space-y-4">
                {filteredReviews.length > 0 ? (
                    filteredReviews.map(review => (
                        <ReviewCard key={review.id} review={review} onReply={setReplyingTo} />
                    ))
                ) : (
                    <p className="text-center text-slate-500 dark:text-slate-400 py-8">No reviews in this category.</p>
                )}
            </div>
        </div>
    );
};

export default RestaurantReviews;
