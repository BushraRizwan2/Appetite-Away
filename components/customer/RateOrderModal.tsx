
import React, { useState } from 'react';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import { Order } from '../../types';
import { ICONS } from '../../constants';

interface RateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

const RateOrderModal: React.FC<RateOrderModalProps> = ({ isOpen, onClose, order }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    // In a real app, you'd submit this data to a backend
    console.log({
      orderId: order.id,
      rating,
      comment,
    });
    alert('Thank you for your feedback!');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Rate Your Order</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          How was your experience with <span className="font-semibold">{order.restaurantName}</span>?
        </p>

        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Rating</label>
            <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                    <button key={index} onClick={() => setRating(index + 1)} aria-label={`Rate ${index+1} stars`}>
                        <span className={`text-3xl transition-colors ${index < rating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600 hover:text-amber-300'}`}>
                           {ICONS.filledStar}
                        </span>
                    </button>
                ))}
            </div>
        </div>

        <div>
            <label htmlFor="comment" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Add a comment</label>
            <textarea
                id="comment"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us more about your experience..."
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200"
            />
        </div>

        <div className="flex gap-2 pt-2">
            <Button variant="secondary" onClick={onClose} fullWidth>Maybe Later</Button>
            <Button variant="primary" onClick={handleSubmit} fullWidth disabled={rating === 0}>Submit Feedback</Button>
        </div>
      </div>
    </Modal>
  );
};

export default RateOrderModal;
