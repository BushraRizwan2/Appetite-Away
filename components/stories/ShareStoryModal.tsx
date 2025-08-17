import React, { useState } from 'react';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import Input from '../shared/Input';
import { ICONS } from '../../constants';
import { UserRole } from '../../types';
import CustomSelect from '../shared/CustomSelect';

interface ShareStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareStoryModal: React.FC<ShareStoryModalProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState<UserRole | ''>('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        console.log({ name, role, title, content });
        setTimeout(() => {
            setIsSubmitting(false);
            alert('Thank you for sharing your story! It will be reviewed by our team.');
            onClose();
            // Reset form
            setName('');
            setRole('');
            setTitle('');
            setContent('');
        }, 1000);
    };

    const storyRoleOptions = [
        { value: UserRole.Customer, label: 'Customer' },
        { value: UserRole.Restaurant, label: 'Restaurant Owner/Staff' },
        { value: UserRole.Rider, label: 'Rider' },
        { value: UserRole.Shopkeeper, label: 'Shopkeeper' },
    ];

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
             <form onSubmit={handleSubmit} className="flex flex-col h-full">
                {/* Header */}
                <header className="p-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Share Your Story</h2>
                    <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" aria-label="Close">
                        {ICONS.close}
                    </button>
                </header>

                {/* Form Body */}
                <div className="p-6 space-y-4 overflow-y-auto flex-grow">
                    <Input id="story-name" label="Your Name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. John Doe" required />

                    <CustomSelect
                        id="story-role"
                        label="I am a..."
                        options={storyRoleOptions}
                        value={role}
                        onChange={value => setRole(value as UserRole)}
                    />

                    <Input id="story-title" label="Story Title" value={title} onChange={e => setTitle(e.target.value)} placeholder="A catchy title for your story" required />

                    <div>
                        <label htmlFor="story-content" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Your Story</label>
                        <textarea
                            id="story-content"
                            rows={6}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Tell us what happened..."
                            required
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Upload a Photo <span className="text-xs text-slate-500">(Optional)</span>
                        </label>
                        <input 
                            type="file" 
                            accept="image/*"
                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100" 
                        />
                    </div>
                </div>

                {/* Footer */}
                <footer className="p-4 flex-shrink-0 border-t border-slate-200 dark:border-slate-700">
                    <Button type="submit" fullWidth disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Story'}
                    </Button>
                </footer>
            </form>
        </Modal>
    );
};

export default ShareStoryModal;