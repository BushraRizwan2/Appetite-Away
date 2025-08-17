import React, { useState } from 'react';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import { Transaction, CartItem } from '../../types';
import RefundModal from './RefundModal';

interface TransactionDetailsModalProps {
    onClose: () => void;
    transaction: Transaction;
}

const DetailRow: React.FC<{ label: string; value: string; isTotal?: boolean; isNegative?: boolean; }> = ({ label, value, isTotal = false, isNegative = false }) => (
    <div className={`flex justify-between text-sm ${isTotal ? 'font-bold text-lg border-t border-slate-200 dark:border-slate-700 pt-2 mt-2' : 'text-slate-600 dark:text-slate-400'}`}>
        <span>{label}</span>
        <span className={`${isTotal ? 'text-rose-500' : 'text-slate-800 dark:text-slate-200'} ${isNegative ? 'text-red-500' : ''}`}>{value}</span>
    </div>
);

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({ onClose, transaction }) => {
    const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);

    return (
        <>
        {isRefundModalOpen && <RefundModal transaction={transaction} onClose={() => setIsRefundModalOpen(false)} />}
        <Modal isOpen={true} onClose={onClose}>
            <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl">
                <header className="p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <h3 className="text-lg font-bold">Transaction Details</h3>
                    <p className="text-sm text-slate-500">Order ID: {transaction.orderId}</p>
                </header>
                <main className="p-4 space-y-4 flex-grow overflow-y-auto">
                    {/* Customer Info */}
                    <div>
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Customer</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{transaction.customerName}</p>
                    </div>
                    {/* Items */}
                    <div>
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Items Ordered</h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                        {transaction.items.map(item => (
                            <div key={item.cartItemId} className="flex justify-between text-sm">
                                <span className="text-slate-700 dark:text-slate-300">{item.quantity} x {item.name}</span>
                                <span className="text-slate-800 dark:text-slate-200">Rs. {item.price.toFixed(2)}</span>
                            </div>
                        ))}
                        </div>
                    </div>
                     {/* Payment Breakdown */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg space-y-2">
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Payment Breakdown</h4>
                        <DetailRow label="Subtotal" value={`Rs. ${transaction.breakdown.subtotal.toFixed(2)}`} />
                        <DetailRow label="Platform Fee" value={`- Rs. ${transaction.breakdown.platformFee.toFixed(2)}`} isNegative />
                        <DetailRow label="Taxes" value={`- Rs. ${transaction.breakdown.tax.toFixed(2)}`} isNegative />
                        <DetailRow label="Net Payout" value={`Rs. ${transaction.breakdown.netPayout.toFixed(2)}`} isTotal />
                    </div>
                </main>
                <footer className="p-4 flex flex-col sm:flex-row gap-2 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <Button variant="danger" onClick={() => setIsRefundModalOpen(true)} fullWidth>Issue Refund</Button>
                    <Button variant="secondary" onClick={() => alert("Contacting support...")} fullWidth>Contact Support</Button>
                </footer>
            </div>
        </Modal>
        </>
    );
};

export default TransactionDetailsModal;