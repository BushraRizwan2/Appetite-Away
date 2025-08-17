
import React, { useState } from 'react';
import { ICONS } from '../../constants';
import Button from './Button';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  orderId: string;
  isChatActive: boolean;
}

const MOCK_MESSAGES = [
    { id: 1, sender: 'rider', text: 'Hi there! I\'ve picked up your order and I am on my way.' },
    { id: 2, sender: 'customer', text: 'Great, thank you! Could you please leave it at the door?' },
    { id: 3, sender: 'rider', text: 'Sure thing! Will do.' },
];

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, recipientName, orderId, isChatActive }) => {
    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        const newMsg = {
            id: messages.length + 1,
            sender: 'customer',
            text: newMessage,
        };
        setMessages([...messages, newMsg]);
        setNewMessage('');
    };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center bg-black bg-opacity-60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white dark:bg-slate-900 rounded-t-2xl md:rounded-2xl shadow-xl w-full max-w-lg h-[80vh] md:h-[70vh] flex flex-col transform transition-all animate-slide-up md:animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <header className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center flex-shrink-0">
            <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Chat with {recipientName}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Order #{orderId}</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" aria-label="Close chat">
                {ICONS.close}
            </button>
        </header>

        {/* Message Area */}
        <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'customer' ? 'bg-rose-500 text-white rounded-br-none' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'}`}>
                        {msg.text}
                    </div>
                </div>
            ))}
        </div>
        
        {/* Input Area */}
        {isChatActive ? (
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 dark:border-slate-800 flex-shrink-0 flex gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm bg-white dark:bg-slate-800"
                    aria-label="Chat message input"
                />
                <Button type="submit">Send</Button>
            </form>
        ) : (
             <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-center bg-slate-100 dark:bg-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">
                    Chat has been disabled as the order is complete.
                </p>
            </div>
        )}

        <style>{`
          @keyframes slide-up {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
           @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95) translateY(0); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
          
          @media (min-width: 768px) {
            .md\\:animate-fade-in {
                animation: fade-in 0.2s ease-out forwards;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ChatModal;
