import React, { useState } from 'react';
import Modal from '../shared/Modal';
import Button from '../shared/Button';

interface RejectRequestModalProps {
    onClose: () => void;
    onConfirm: (reason: string) => void;
}

const RejectRequestModal: React.FC<RejectRequestModalProps> = ({ onClose, onConfirm }) => {
    const [reason, setReason] = useState('');
    const [otherReasonText, setOtherReasonText] = useState('');
    const reasons = [
        "Pickup location is too far",
        "Payout is too low",
        "Order seems too large/heavy",
        "I'm ending my shift",
        "Other",
    ];

    const isConfirmDisabled = !reason || (reason === 'Other' && !otherReasonText.trim());

    return (
        <Modal isOpen={true} onClose={onClose}>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl">
                <h3 className="text-lg font-bold mb-4">Reason for Rejection</h3>
                <div className="space-y-2 mb-4">
                    {reasons.map(r => (
                        <button
                            key={r}
                            onClick={() => setReason(r)}
                            className={`w-full text-left p-3 rounded-lg border-2 ${reason === r ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/40' : 'border-slate-200 dark:border-slate-700'}`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
                {reason === 'Other' && (
                    <textarea
                        value={otherReasonText}
                        onChange={e => setOtherReasonText(e.target.value)}
                        placeholder="Please specify..."
                        className="w-full mt-2 p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800"
                        rows={3}
                    />
                )}
                <div className="flex gap-2 mt-4">
                    <Button variant="secondary" onClick={onClose} fullWidth>Cancel</Button>
                    <Button variant="danger" onClick={() => onConfirm(reason === 'Other' ? otherReasonText : reason)} fullWidth disabled={isConfirmDisabled}>
                        Confirm Rejection
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default RejectRequestModal;
