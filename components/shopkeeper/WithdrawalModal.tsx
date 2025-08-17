import React, { useState } from 'react';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import Input from '../shared/Input';
import Spinner from '../shared/Spinner';
import CustomSelect from '../shared/CustomSelect';

interface WithdrawalModalProps {
    onClose: () => void;
    onConfirm: (amount: number, destination: string) => void;
    balance: number;
}

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({ onClose, onConfirm, balance }) => {
    const [step, setStep] = useState<'amount' | 'otp' | 'success'>('amount');
    const [amount, setAmount] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [destination, setDestination] = useState('bank');
    const numericAmount = parseFloat(amount);

    const payoutOptions = [
        { value: 'bank', label: 'Bank: HBL **** 5678' },
        { value: 'easypaisa', label: 'Easypaisa Wallet' },
        { value: 'jazzcash', label: 'JazzCash Wallet' },
    ];

    const handleAmountSubmit = () => {
        if (numericAmount > 0 && numericAmount <= balance) {
            setIsLoading(true);
            setTimeout(() => { // Simulate sending OTP
                setIsLoading(false);
                setStep('otp');
            }, 1000);
        }
    };

    const handleOtpSubmit = () => {
        if (otp.length === 6) { // Simple validation
            setIsLoading(true);
            setTimeout(() => { // Simulate API call to verify OTP and process withdrawal
                onConfirm(numericAmount, destination);
                setIsLoading(false);
                setStep('success');
            }, 1500);
        } else {
            alert("Please enter a valid 6-digit OTP.");
        }
    };
    
    const renderContent = () => {
        switch (step) {
            case 'otp':
                return (
                    <>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                            An OTP has been sent to your registered phone number for security.
                        </p>
                        <Input 
                            id="otp" 
                            label="Enter 6-Digit OTP" 
                            type="text"
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                            placeholder="123456"
                            maxLength={6}
                            required 
                        />
                        <div className="flex gap-2 mt-6">
                            <Button variant="secondary" onClick={() => setStep('amount')} fullWidth>Back</Button>
                            <Button variant="success" onClick={handleOtpSubmit} fullWidth disabled={isLoading}>
                                {isLoading ? <Spinner size="sm" /> : 'Confirm Withdrawal'}
                            </Button>
                        </div>
                    </>
                );
            case 'success':
                 const destinationLabel = payoutOptions.find(o => o.value === destination)?.label || destination;
                 return (
                    <div className="text-center">
                        <div className="text-5xl mb-4">✅</div>
                        <h4 className="font-bold text-lg">Withdrawal Processed!</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                           Rs. {numericAmount.toFixed(2)} will be deposited into your {destinationLabel} within 1-3 business days.
                        </p>
                        <Button onClick={onClose} fullWidth className="mt-6">Done</Button>
                    </div>
                );
            case 'amount':
            default:
                return (
                    <>
                         <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                            Available balance: <span className="font-bold text-emerald-500">Rs. {balance.toFixed(2)}</span>
                        </p>
                        <div className="space-y-4">
                            <Input 
                                id="withdraw-amount" 
                                label="Amount to withdraw" 
                                type="number"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                placeholder="0.00"
                                required 
                            />
                            <CustomSelect
                                id="destination"
                                label="Destination Account"
                                options={payoutOptions}
                                value={destination}
                                onChange={setDestination}
                            />
                        </div>

                        <div className="flex gap-2 mt-6">
                            <Button variant="secondary" onClick={onClose} fullWidth>Cancel</Button>
                            <Button 
                                variant="success" 
                                onClick={handleAmountSubmit} 
                                fullWidth 
                                disabled={isLoading || !numericAmount || numericAmount <= 0 || numericAmount > balance}
                            >
                                {isLoading ? <Spinner size="sm" /> : 'Withdraw Now'}
                            </Button>
                        </div>
                    </>
                );
        }
    }

    return (
        <Modal isOpen={true} onClose={onClose}>
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl">
                <h3 className="text-xl font-bold mb-2">
                    {step === 'success' ? 'Success!' : 'Withdraw Funds'}
                </h3>
                {renderContent()}
            </div>
        </Modal>
    );
};

export default WithdrawalModal;