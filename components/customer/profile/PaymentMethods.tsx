
import React, { useState } from 'react';
import { PaymentMethod } from '../../../types';
import ProfilePageWrapper from './ProfilePageWrapper';
import Button from '../../shared/Button';
import { ICONS } from '../../../constants';

const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
    { id: 'pm1', cardType: 'Visa', last4: '4242', expiryDate: '12/25', isDefault: true },
    { id: 'pm2', cardType: 'Mastercard', last4: '5555', expiryDate: '06/26', isDefault: false },
];

const PaymentMethodCard: React.FC<{ method: PaymentMethod, onDelete: (id: string) => void }> = ({ method, onDelete }) => (
     <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm flex justify-between items-center transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
        <div className="flex items-center gap-4">
            <div className="text-3xl font-bold text-slate-700 dark:text-slate-300 w-16 text-center">
                {method.cardType === 'Visa' ? 'VISA' : 'MC'}
            </div>
            <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">**** **** **** {method.last4}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Expires {method.expiryDate}</p>
            </div>
        </div>
        <div className="flex items-center gap-3">
            {method.isDefault && <span className="text-xs font-semibold text-rose-500">Default</span>}
            <Button variant="danger" onClick={() => onDelete(method.id)}>{ICONS.trash}</Button>
        </div>
    </div>
);

const PaymentMethods: React.FC = () => {
    const [methods, setMethods] = useState(MOCK_PAYMENT_METHODS);

    const handleDelete = (id: string) => {
        if(window.confirm('Are you sure you want to remove this payment method?')) {
            setMethods(current => current.filter(m => m.id !== id));
        }
    }

  return (
    <ProfilePageWrapper title="Payment Methods" actionButton={<Button><span className="mr-2">{ICONS.add}</span>Add New Card</Button>}>
        <div className="space-y-4">
             {methods.length > 0 ? (
                methods.map(method => <PaymentMethodCard key={method.id} method={method} onDelete={handleDelete} />)
            ) : (
                <div className="text-center text-slate-500 py-16">
                    <div className="text-4xl mb-4">💳</div>
                    <h3 className="font-bold text-lg text-slate-700 dark:text-slate-200">No saved cards</h3>
                    <p className="text-sm">Add a payment method for seamless transactions.</p>
                </div>
            )}
        </div>
    </ProfilePageWrapper>
  );
};

export default PaymentMethods;
