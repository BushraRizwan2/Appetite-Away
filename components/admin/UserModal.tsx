import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../../types';
import Modal from '../shared/Modal';
import Input from '../shared/Input';
import Button from '../shared/Button';
import CustomSelect from '../shared/CustomSelect';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (user: User) => void;
    user: User | null;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSave, user }) => {
    const [formData, setFormData] = useState<Partial<User>>({});

    useEffect(() => {
        if (user) {
            setFormData(user);
        } else {
            // Default for new user
            setFormData({
                name: '',
                email: '',
                role: UserRole.Customer,
                status: 'Active',
                joinedDate: new Date().toISOString().split('T')[0],
                avatarUrl: `https://i.pravatar.cc/150?u=${Date.now()}`
            });
        }
    }, [user]);

    const handleChange = (field: keyof User, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as User);
    };

    const roleOptions = Object.values(UserRole).map(role => ({ value: role, label: role }));
    const statusOptions = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl">
                <header className="p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <h3 className="text-lg font-bold">{user ? 'Edit User' : 'Add New User'}</h3>
                </header>
                <main className="p-6 space-y-4 flex-grow overflow-y-auto">
                    <Input 
                        id="name" 
                        label="Full Name"
                        value={formData.name || ''}
                        onChange={e => handleChange('name', e.target.value)}
                        required
                    />
                     <Input 
                        id="email" 
                        label="Email Address"
                        type="email"
                        value={formData.email || ''}
                        onChange={e => handleChange('email', e.target.value)}
                        required
                    />
                    <CustomSelect 
                        id="role"
                        label="User Role"
                        options={roleOptions}
                        value={formData.role || ''}
                        onChange={val => handleChange('role', val as UserRole)}
                    />
                     <CustomSelect 
                        id="status"
                        label="Account Status"
                        options={statusOptions}
                        value={formData.status || ''}
                        onChange={val => handleChange('status', val as 'Active' | 'Inactive')}
                    />
                </main>
                <footer className="p-4 flex gap-2 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <Button type="button" variant="secondary" onClick={onClose} fullWidth>Cancel</Button>
                    <Button type="submit" variant="primary" fullWidth>Save Changes</Button>
                </footer>
            </form>
        </Modal>
    );
};

export default UserModal;