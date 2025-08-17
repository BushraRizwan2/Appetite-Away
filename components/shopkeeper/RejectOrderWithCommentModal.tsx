import React, { useState } from 'react';
import Modal from '../shared/Modal';
import Button from '../shared/Button';

interface RejectOrderWithCommentModalProps {
    onClose: () => void;
    onConfirm: (comment: string) => void;
}

const RejectOrderWithCommentModal: React.FC<RejectOrderWithCommentModalProps> = ({ onClose, onConfirm }) => {
    const [comment, setComment] = useState('');

    return (
        <Modal isOpen={true} onClose={onClose}>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl">
                <h3 className="text-lg font-bold mb-4">Reason for Rejection</h3>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    placeholder="e.g., An item is out of stock, we are closing soon..."
                    className="w-full mt-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm bg-white dark:bg-slate-800"
                />
                <div className="flex gap-2 mt-4">
                    <Button variant="secondary" onClick={onClose} fullWidth>Cancel</Button>
                    <Button variant="danger" onClick={() => onConfirm(comment)} fullWidth disabled={!comment.trim()}>Confirm Rejection</Button>
                </div>
            </div>
        </Modal>
    );
};

export default RejectOrderWithCommentModal;