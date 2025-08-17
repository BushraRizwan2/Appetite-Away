import React, { useState } from 'react';
import Button from '../shared/Button';
import Input from '../shared/Input';
import Modal from '../shared/Modal';
import { ICONS } from '../../constants';
import Switch from '../shared/Switch';
import CustomSelect from '../shared/CustomSelect';

interface Promotion {
    id: string;
    title: string;
    type: 'percentage' | 'fixed_amount' | 'combo';
    value: number;
    description: string;
    isActive: boolean;
}

const MOCK_PROMOTIONS: Promotion[] = [
    { id: 'p1', title: 'Weekend Special', type: 'percentage', value: 20, description: '20% off on all pizzas', isActive: true },
    { id: 'p2', title: 'Lunch Deal', type: 'combo', value: 1599, description: 'Pizza slice + Drink for Rs. 1599', isActive: true },
    { id: 'p3', title: 'Eid Offer', type: 'fixed_amount', value: 500, description: 'Flat Rs. 500 off on orders over Rs. 3000', isActive: false },
];

const PromotionModal: React.FC<{onClose: () => void, onSave: (promo: Omit<Promotion, 'id' | 'isActive'>) => void}> = ({ onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState<'percentage' | 'fixed_amount' | 'combo'>('percentage');
    const [value, setValue] = useState(0);
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        if (!title || value <= 0 || !description) {
            alert("Please fill all fields.");
            return;
        }
        onSave({ title, type, value, description });
        onClose();
    };

    const promoTypeOptions = [
        { value: 'percentage', label: 'Percentage Discount (%)' },
        { value: 'fixed_amount', label: 'Fixed Amount Off (Rs.)' },
        { value: 'combo', label: 'Combo Deal' },
    ];

    return (
        <Modal isOpen={true} onClose={onClose}>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl">
                <h3 className="text-lg font-bold mb-4">Create New Promotion</h3>
                <div className="space-y-4">
                    <Input id="promo-title" label="Promotion Title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Happy Hour" required />
                    <CustomSelect
                        id="promo-type"
                        label="Type"
                        options={promoTypeOptions}
                        value={type}
                        onChange={val => setType(val as any)}
                    />
                     <Input id="promo-value" label={type === 'combo' ? 'Combo Price (Rs.)' : (type === 'percentage' ? 'Discount %' : 'Discount Amount (Rs.)')} type="number" value={value || ''} onChange={e => setValue(Number(e.target.value))} required />
                     <Input id="promo-desc" label="Description / Conditions" value={description} onChange={e => setDescription(e.target.value)} placeholder="e.g., On orders over Rs. 2000" required />
                </div>
                 <div className="flex gap-2 mt-6">
                    <Button variant="secondary" onClick={onClose} fullWidth>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit} fullWidth>Create Promotion</Button>
                </div>
            </div>
        </Modal>
    )
}

const PromotionCard: React.FC<{ promo: Promotion, onToggle: (id: string) => void, onDelete: (id: string) => void }> = ({ promo, onToggle, onDelete }) => (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm flex items-start justify-between">
        <div>
            <p className="font-bold text-slate-800 dark:text-slate-200">{promo.title}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{promo.description}</p>
        </div>
        <div className="flex items-center gap-4">
            <button onClick={() => onDelete(promo.id)} className="text-slate-500 hover:text-red-500">{ICONS.trash}</button>
            <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${promo.isActive ? 'text-emerald-500' : 'text-slate-500'}`}>{promo.isActive ? 'Active' : 'Paused'}</span>
                <Switch checked={promo.isActive} onChange={() => onToggle(promo.id)} />
            </div>
        </div>
    </div>
);

const RestaurantPromotions: React.FC = () => {
    const [promotions, setPromotions] = useState(MOCK_PROMOTIONS);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = (newPromo: Omit<Promotion, 'id' | 'isActive'>) => {
        setPromotions(prev => [...prev, { ...newPromo, id: `p${Date.now()}`, isActive: true }]);
    }
    
    const handleToggle = (id: string) => {
        setPromotions(prev => prev.map(p => p.id === id ? {...p, isActive: !p.isActive} : p));
    }

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this promotion?")) {
            setPromotions(prev => prev.filter(p => p.id !== id));
        }
    }

    return (
        <div className="p-4 space-y-6">
            {isModalOpen && <PromotionModal onClose={() => setIsModalOpen(false)} onSave={handleSave} />}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                 <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Promotions & Deals</h2>
                 <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                    <span className="mr-2">{ICONS.add}</span>
                    Create Promotion
                </Button>
            </div>
           
            <div className="bg-blue-50 dark:bg-blue-900/40 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 dark:text-blue-200">Participate in Campaigns</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">Boost your visibility by joining official Appetite Away campaigns like "Ramadan Deals" or "Winter Warmers".</p>
                <Button variant="info" className="mt-3 bg-blue-500 hover:bg-blue-600">View Available Campaigns</Button>
            </div>

            <div>
                <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-3">Your Promotions</h3>
                <div className="space-y-3">
                    {promotions.length > 0 ? (
                        promotions.map(promo => <PromotionCard key={promo.id} promo={promo} onToggle={handleToggle} onDelete={handleDelete} />)
                    ) : (
                         <div className="text-center text-slate-500 dark:text-slate-400 py-8 px-4 bg-white dark:bg-slate-800 rounded-lg">
                            <div className="text-4xl mb-2">🎉</div>
                            <p>No active promotions.</p>
                            <p className="text-sm">Click "Create Promotion" to get started!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RestaurantPromotions;