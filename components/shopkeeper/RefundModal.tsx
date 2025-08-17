import React, { useState } from 'react';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import Input from '../shared/Input';
import { Transaction } from '../../types';
import { useNotification } from '../../context/NotificationContext';

interface RefundModalProps {
    onClose: () => void;
    transaction: Transaction;
}

const RefundModal: React.FC<RefundModalProps> = ({ onClose, transaction }) => {
    const { showNotification } = useNotification();
    const [amount, setAmount] = useState<string>(transaction.amount.toFixed(2));
    const [reason, setReason] = useState('');
    
    const maxAmount = transaction.amount;
    const numericAmount = parseFloat(amount);

    const handleRefund = () => {
        if (!numericAmount || numericAmount <= 0 || numericAmount > maxAmount) {
            alert(`Please enter a valid amount between Rs. 0.01 and Rs. ${maxAmount.toFixed(2)}.`);
            return;
        }
        console.log(`Refunding Rs. ${numericAmount} for order ${transaction.orderId} due to: ${reason}`);
        showNotification(`Refund of Rs. ${numericAmount.toFixed(2)} processed successfully.`, 'success');
        onClose();
    };

    return (
        <Modal isOpen={true} onClose={onClose}>
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl">
                <h3 className="text-xl font-bold mb-2">Issue Refund</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    For Order ID: <span className="font-semibold">{transaction.orderId}</span>
                </p>
                
                <div className="space-y-4">
                    <Input 
                        id="refund-amount" 
                        label={`Amount (Max: Rs. ${maxAmount.toFixed(2)})`}
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        required 
                    />
                    <button type="button" onClick={() => setAmount(maxAmount.toFixed(2))} className="text-sm text-rose-500 font-semibold hover:underline">
                        Issue Full Refund
                    </button>
                    <div>
                        <label htmlFor="refund-reason" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Reason for Refund (Optional)</label>
                        <textarea
                            id="refund-reason"
                            rows={3}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="e.g., Item was out of stock."
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm bg-white dark:bg-slate-800"
                        />
                    </div>
                </div>

                <div className="flex gap-2 mt-6">
                    <Button variant="secondary" onClick={onClose} fullWidth>Cancel</Button>
                    <Button 
                        variant="danger" 
                        onClick={handleRefund}
                        fullWidth 
                        disabled={!numericAmount || numericAmount <= 0 || numericAmount > maxAmount}
                    >
                       Confirm Refund
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default RefundModal;