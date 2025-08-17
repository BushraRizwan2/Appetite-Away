import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';
import Button from '../shared/Button';
import Spinner from '../shared/Spinner';
import TabFilter from '../shared/TabFilter';

const ConfirmationScreen: React.FC = () => {
    const { verificationPendingUser, verifyAccount, cancelVerification, loading } = useAuth();
    const [emailCode, setEmailCode] = useState('');
    const [smsCode, setSmsCode] = useState('');
    const [verificationMethod, setVerificationMethod] = useState<'email' | 'sms'>('email');

    if (!verificationPendingUser) {
        return null;
    }

    const isRestaurant = verificationPendingUser.role === UserRole.Restaurant;

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = verificationMethod === 'email' ? emailCode : smsCode;
        if (!code) {
            alert("Please enter a verification code.");
            return;
        }
        await verifyAccount(code, verificationMethod);
    };

    if (isRestaurant) {
        return (
            <div className="absolute inset-0 z-10 flex flex-col justify-center items-center bg-white dark:bg-black p-6 text-center">
                <div className="w-full">
                    <div className="text-5xl mb-4">✅</div>
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">Application Submitted!</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        Thank you for registering, <span className="font-semibold">{verificationPendingUser.businessName}</span>! Your application is now under review by the <Link to="/" onClick={cancelVerification} className="font-semibold text-rose-500 hover:underline">Appetite Away</Link> team.
                    </p>
                    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm text-slate-600 dark:text-slate-300">
                        We will verify your documents and information. You will be notified via email and SMS within <strong>1-3 business days</strong> once your account is approved.
                    </div>
                    <div className="mt-8">
                        <Button variant="primary" onClick={cancelVerification} fullWidth>
                            Return to Home
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
    
    // Standard verification for Customer and Rider
    const renderStandardVerification = () => (
        <>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
                Please check your {verificationMethod === 'email' ? `email at ${verificationPendingUser.email}` : `phone at ${verificationPendingUser.phone}`} for a verification code.
            </p>
            <TabFilter
                options={['Verify by Email', 'Verify by Phone']}
                activeOption={verificationMethod === 'email' ? 'Verify by Email' : 'Verify by Phone'}
                onOptionClick={(option) => setVerificationMethod(option === 'Verify by Email' ? 'email' : 'sms')}
                className="mb-4"
            />
            <div>
                <label htmlFor="verificationCode" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {verificationMethod === 'email' ? 'Email Verification Code' : 'SMS Verification Code'}
                </label>
                <input id="verificationCode" type="text" value={verificationMethod === 'email' ? emailCode : smsCode} onChange={e => verificationMethod === 'email' ? setEmailCode(e.target.value) : setSmsCode(e.target.value)} placeholder="e.g. 123456" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500" />
                <button className="text-xs text-rose-500 hover:underline mt-1">Resend Code</button>
            </div>
        </>
    );

    return (
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center bg-white dark:bg-black p-6 pt-8">
            <div className="w-full">
                <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-200 mb-2">Confirm Your Account</h2>
                
                <form onSubmit={handleVerify} className="space-y-4 mt-8">
                    {renderStandardVerification()}
                    
                    <div className="pt-4 space-y-2">
                        <Button type="submit" fullWidth disabled={loading}>
                            {loading ? <Spinner /> : 'Verify and Create Account'}
                        </Button>
                        <Button variant="secondary" fullWidth onClick={cancelVerification} disabled={loading}>
                            Back to Sign Up
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ConfirmationScreen;
