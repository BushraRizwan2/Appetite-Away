
import React, { useState } from 'react';
import { MenuItem } from '../../types';
import Button from '../shared/Button';
import Input from '../shared/Input';
import Modal from '../shared/Modal';
import { ICONS } from '../../constants';
import Switch from '../shared/Switch';
import { generateMenuItemDescription } from '../../services/geminiService';
import Spinner from '../shared/Spinner';

const MOCK_MENU_ITEMS: MenuItem[] = [
  { id: 'm1', name: 'Margherita Pizza', description: 'Classic cheese and tomato.', price: 12.99, imageUrl: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Pizza', isPopular: true },
  { id: 'm2', name: 'Pepperoni Pizza with a very long name that might overflow', description: 'Loaded with pepperoni.', price: 14.99, imageUrl: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Pizza' },
  { id: 'm3', name: 'Garlic Bread', description: 'Warm and buttery.', price: 5.99, imageUrl: 'https://images.pexels.com/photos/3992209/pexels-photo-3992209.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: false, category: 'Sides' },
  { id: 'm4', name: 'House Salad', description: 'Fresh greens and vinaigrette.', price: 7.50, imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Salads' },
  { id: 'm5', name: 'Tiramisu', description: 'Coffee-flavored Italian dessert.', price: 6.50, imageUrl: 'https://images.pexels.com/photos/1854037/pexels-photo-1854037.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Desserts' },
];

const MenuItemModal: React.FC<{ item: Partial<MenuItem> | null, onClose: () => void, onSave: (item: MenuItem) => void }> = ({ item, onClose, onSave }) => {
    const [formData, setFormData] = useState<Partial<MenuItem>>(item || { inStock: true, isPopular: false });
    const [isGenerating, setIsGenerating] = useState(false);

    if (!item) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isCheckbox = type === 'checkbox';
        const isChecked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: isCheckbox ? isChecked : value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as MenuItem);
    }

    const handleGenerateDescription = async () => {
        if (!formData.name || !formData.category) {
            alert("Please enter an item name and category first.");
            return;
        }
        setIsGenerating(true);
        const description = await generateMenuItemDescription(formData.name, formData.category);
        setFormData(prev => ({ ...prev, description }));
        setIsGenerating(false);
    };
    
    return (
        <Modal isOpen={true} onClose={onClose}>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl">
                <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-bold">{item.id ? 'Edit Menu Item' : 'Add New Item'}</h3>
                </div>
                <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
                    <Input id="name" name="name" label="Item Name" value={formData.name || ''} onChange={handleChange} required />
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                        <div className="relative">
                            <textarea id="description" name="description" value={formData.description || ''} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm bg-white dark:bg-slate-800" required />
                            <Button 
                                type="button"
                                variant="secondary"
                                onClick={handleGenerateDescription}
                                disabled={isGenerating}
                                className="absolute bottom-2 right-2 !px-2 !py-1 text-xs"
                            >
                                {isGenerating ? <Spinner size="sm" /> : <><span className="h-4 w-4 mr-1">{ICONS.sparkles}</span> Generate</>}
                            </Button>
                        </div>
                    </div>
                    <Input id="price" name="price" label="Price" type="number" step="0.01" value={formData.price || ''} onChange={handleChange} required />
                    <Input id="category" name="category" label="Category" value={formData.category || ''} onChange={handleChange} required />
                    <Input id="imageUrl" name="imageUrl" label="Image URL" value={formData.imageUrl || ''} onChange={handleChange} />
                    <Switch checked={formData.isPopular || false} onChange={() => setFormData(prev => ({...prev, isPopular: !prev.isPopular}))} label="Popular Item (featured on menu)" />
                </div>
                <div className="p-4 flex gap-2 border-t border-slate-200 dark:border-slate-700">
                    <Button type="button" variant="secondary" onClick={onClose} fullWidth>Cancel</Button>
                    <Button type="submit" variant="primary" fullWidth>Save Changes</Button>
                </div>
            </form>
        </Modal>
    )
}

const MenuItemRow: React.FC<{ item: MenuItem; onToggle: (id: string) => void; onEdit: (item: MenuItem) => void; }> = ({ item, onToggle, onEdit }) => (
    <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-700/50">
        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
        <div className="flex-grow min-w-0">
            <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">{item.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Rs. {item.price.toFixed(2)}</p>
        </div>
        <div className="flex-shrink-0 flex items-center gap-4">
            <button onClick={() => onEdit(item)} className="p-2 text-slate-500 hover:text-rose-500">{ICONS.edit}</button>
            <Switch checked={item.inStock} onChange={() => onToggle(item.id)} />
        </div>
    </div>
);

const MenuManagement: React.FC = () => {
    const [menuItems, setMenuItems] = useState(MOCK_MENU_ITEMS);
    const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);

    const handleToggleStock = (id: string) => {
        setMenuItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, inStock: !item.inStock } : item
            )
        );
    };
    
    const handleSaveItem = (itemToSave: MenuItem) => {
        if (itemToSave.id) { // Editing existing item
            setMenuItems(prev => prev.map(item => item.id === itemToSave.id ? itemToSave : item));
        } else { // Adding new item
            setMenuItems(prev => [...prev, { ...itemToSave, id: `m${Date.now()}` }]);
        }
        setEditingItem(null);
    }
    
    const handleToggleCategory = (category: string, enable: boolean) => {
        setMenuItems(prev => prev.map(item => item.category === category ? { ...item, inStock: enable } : item));
    }
    
    const menuByCategory = menuItems.reduce((acc, item) => {
        const category = item.category || 'Uncategorized';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(item);
        return acc;
    }, {} as { [key: string]: MenuItem[] });

    return (
        <div className="p-4 space-y-6">
            {editingItem && <MenuItemModal item={editingItem} onClose={() => setEditingItem(null)} onSave={handleSaveItem} />}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Manage Menu</h2>
                <Button variant="primary" onClick={() => setEditingItem({})}>
                    <span className="mr-2">{ICONS.add}</span>
                    Add New Item
                </Button>
            </div>
            
             <div className="p-3 bg-blue-50 dark:bg-blue-900/40 rounded-lg text-sm text-blue-800 dark:text-blue-200">
                 <strong>Note:</strong> Price changes are subject to review and may take up to 24 hours to reflect.
            </div>

            <div className="space-y-6">
                {Object.keys(menuByCategory).map(category => (
                    <div key={category}>
                        <div className="flex justify-between items-center mb-3 p-2 bg-slate-100 dark:bg-slate-800/50 rounded-md">
                            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">{category}</h3>
                            <Switch 
                                checked={menuByCategory[category].some(item => item.inStock)}
                                onChange={() => handleToggleCategory(category, !menuByCategory[category].some(item => item.inStock))}
                                label="Enable Category"
                            />
                        </div>
                        <div className="space-y-3">
                            {menuByCategory[category].map(item => (
                                <MenuItemRow key={item.id} item={item} onToggle={handleToggleStock} onEdit={() => setEditingItem(item)} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuManagement;