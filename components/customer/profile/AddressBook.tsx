
import React, { useState } from 'react';
import { Address } from '../../../types';
import ProfilePageWrapper from './ProfilePageWrapper';
import Button from '../../shared/Button';
import { ICONS } from '../../../constants';

const MOCK_ADDRESSES: Address[] = [
    { id: 'addr1', label: 'Home', street: '123 Dreamy Lane', city: 'Karachi', postalCode: '75270', isDefault: true },
    { id: 'addr2', label: 'Work', street: '456 Business Ave', city: 'Karachi', postalCode: '75300', isDefault: false },
];

const AddressCard: React.FC<{ address: Address, onDelete: (id: string) => void }> = ({ address, onDelete }) => (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
        <div className="flex justify-between items-start">
            <div>
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-800 dark:text-slate-200">{address.label}</h3>
                    {address.isDefault && <span className="px-2 py-0.5 text-xs font-semibold bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-300 rounded-full">Default</span>}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{address.street}, {address.city}, {address.postalCode}</p>
            </div>
            <div className="flex gap-2">
                <Button variant="secondary">{ICONS.edit}</Button>
                <Button variant="danger" onClick={() => onDelete(address.id)}>{ICONS.trash}</Button>
            </div>
        </div>
    </div>
);


const AddressBook: React.FC = () => {
    const [addresses, setAddresses] = useState(MOCK_ADDRESSES);

    const handleDelete = (id: string) => {
        if(window.confirm('Are you sure you want to delete this address?')) {
            setAddresses(current => current.filter(addr => addr.id !== id));
        }
    }

  return (
    <ProfilePageWrapper title="Address Book" actionButton={<Button><span className="mr-2">{ICONS.add}</span>Add New Address</Button>}>
      <div className="space-y-4">
        {addresses.length > 0 ? (
            addresses.map(addr => <AddressCard key={addr.id} address={addr} onDelete={handleDelete} />)
        ) : (
            <div className="text-center text-slate-500 py-16">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="font-bold text-lg text-slate-700 dark:text-slate-200">No saved addresses</h3>
                <p className="text-sm">Add an address to make checkout faster.</p>
            </div>
        )}
      </div>
    </ProfilePageWrapper>
  );
};

export default AddressBook;
