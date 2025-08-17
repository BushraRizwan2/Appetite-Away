
import React from 'react';
import { Voucher } from '../../../types';
import ProfilePageWrapper from './ProfilePageWrapper';
import Button from '../../shared/Button';

const MOCK_VOUCHERS: Voucher[] = [
    { id: 'v1', code: 'YUMMY20', description: '20% off on orders over Rs. 500', discount: '20% OFF', expiryDate: '2024-12-31' },
    { id: 'v2', code: 'FREEDEL', description: 'Free delivery on your next order', discount: 'FREE DELIVERY', expiryDate: '2024-10-31' },
    { id: 'v3', code: 'EID100', description: 'Flat Rs. 100 off on any order. Eid Mubarak!', discount: 'Rs. 100 OFF', expiryDate: '2024-08-15' },
];

const VoucherCard: React.FC<{ voucher: Voucher }> = ({ voucher }) => {
    const handleCopyCode = () => {
        navigator.clipboard.writeText(voucher.code);
        alert(`Code "${voucher.code}" copied to clipboard!`);
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden flex transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="p-4 bg-rose-50 dark:bg-rose-900/40 flex flex-col items-center justify-center w-1/4">
                <span className="font-bold text-lg text-rose-600 dark:text-rose-300 text-center">{voucher.discount}</span>
            </div>
            <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-bold text-slate-800 dark:text-slate-200">{voucher.description}</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Expires on: {voucher.expiryDate}</p>
                <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-sm font-semibold border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-md px-3 py-1">{voucher.code}</span>
                    <Button variant="secondary" onClick={handleCopyCode}>Copy</Button>
                </div>
            </div>
        </div>
    );
}

const Vouchers: React.FC = () => {
  return (
    <ProfilePageWrapper title="Vouchers & Offers">
      <div className="space-y-4">
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm flex gap-2">
            <input type="text" placeholder="Enter voucher code" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm bg-slate-100 dark:bg-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-500"/>
            <Button>Apply Code</Button>
        </div>
        {MOCK_VOUCHERS.map(v => <VoucherCard key={v.id} voucher={v}/>)}
      </div>
    </ProfilePageWrapper>
  );
};

export default Vouchers;
