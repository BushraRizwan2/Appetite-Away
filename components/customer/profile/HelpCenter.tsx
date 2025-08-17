
import React, { useState } from 'react';
import { HelpTopic } from '../../../types';
import ProfilePageWrapper from './ProfilePageWrapper';

const MOCK_HELP_TOPICS: HelpTopic[] = [
    { id: 'h1', question: 'How do I track my order?', answer: 'You can track your order from the "My Orders" page. Click on the "Track Order" button for any active order to see its live status and location.' },
    { id: 'h2', question: 'How can I change my delivery address?', answer: 'Once an order is placed, you cannot change the delivery address. Please cancel the order immediately and place a new one with the correct address. If the restaurant has already accepted the order, please contact support.' },
    { id: 'h3', question: 'What payment methods are accepted?', answer: 'We accept credit/debit cards (Visa, Mastercard) and Cash on Delivery (where available). You can manage your saved cards in the "Payment Methods" section of your profile.' },
    { id: 'h4', question: 'How do I report an issue with my order?', answer: 'If you have an issue with your order (e.g., missing items, incorrect food), please use the "Help Center" or contact our support team via email at support@appetite.com within 24 hours of delivery.' },
];

const FaqItem: React.FC<{ topic: HelpTopic }> = ({ topic }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-4 flex justify-between items-center">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{topic.question}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="px-4 pb-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-600 dark:text-slate-400 pt-3">{topic.answer}</p>
                </div>
            )}
        </div>
    );
};

const HelpCenter: React.FC = () => {
  return (
    <ProfilePageWrapper title="Help Center">
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Frequently Asked Questions</h3>
        {MOCK_HELP_TOPICS.map(topic => <FaqItem key={topic.id} topic={topic} />)}
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm mt-6">
            <h3 className="font-bold text-slate-800 dark:text-slate-200">Still need help?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Contact our support team at <a href="mailto:support@appetite.com" className="text-rose-500 hover:underline">support@appetite.com</a>.</p>
        </div>
      </div>
    </ProfilePageWrapper>
  );
};

export default HelpCenter;