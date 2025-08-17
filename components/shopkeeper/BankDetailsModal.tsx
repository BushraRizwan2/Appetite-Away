import React, { useState } from 'react';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import Input from '../shared/Input';
import { useNotification } from '../../context/NotificationContext';
import CustomSelect from '../shared/CustomSelect';

interface BankDetailsModalProps {
    onClose: () => void;
}

const BankDetailsModal: React.FC<BankDetailsModalProps> = ({ onClose }) => {
    const { showNotification } = useNotification();
    const [bankDetails, setBankDetails] = useState({
        accountHolder: 'Ahmed Siddiqui',
        accountNumber: '**** **** **** 5678',
        ifsc: 'HABB0001234',
        bankName: 'HBL'
    });
    const [payoutSchedule, setPayoutSchedule] = useState('Weekly');

    const handleSave = () => {
        console.log("Saving financial settings:", { bankDetails, payoutSchedule });
        showNotification('Financial settings updated successfully!', 'success');
        onClose();
    };

    const scheduleOptions = [
        { value: 'Daily', label: 'Daily' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Monthly', label: 'Monthly' },
    ];

    return (
        <Modal isOpen={true} onClose={onClose}>
            <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl">
                <header className="p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <h3 className="text-lg font-bold">Financial Settings</h3>
                </header>
                <main className="p-4 space-y-6 flex-grow overflow-y-auto">
                    <div>
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Bank Account Details</h4>
                        <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                            <Input id="acc-holder" label="Account Holder Name" value={bankDetails.accountHolder} onChange={e => setBankDetails(p => ({...p, accountHolder: e.target.value}))} />
                            <Input id="acc-number" label="Account Number" value={bankDetails.accountNumber} onChange={e => setBankDetails(p => ({...p, accountNumber: e.target.value}))} />
                            <Input id="ifsc" label="IFSC Code" value={bankDetails.ifsc} onChange={e => setBankDetails(p => ({...p, ifsc: e.target.value}))} />
                            <Input id="bank-name" label="Bank Name" value={bankDetails.bankName} onChange={e => setBankDetails(p => ({...p, bankName: e.target.value}))} />
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Payout Schedule</h4>
                         <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                            <CustomSelect
                                id="payout-schedule"
                                label="Automatic Payout Frequency"
                                options={scheduleOptions}
                                value={payoutSchedule}
                                onChange={setPayoutSchedule}
                            />
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Payouts will be automatically transferred based on your selection. A minimum balance may apply.</p>
                        </div>
                    </div>
                </main>
                <footer className="p-4 flex gap-2 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <Button type="button" variant="secondary" onClick={onClose} fullWidth>Cancel</Button>
                    <Button type="button" variant="primary" onClick={handleSave} fullWidth>Save Settings</Button>
                </footer>
            </div>
        </Modal>
    );
};

export default BankDetailsModal;