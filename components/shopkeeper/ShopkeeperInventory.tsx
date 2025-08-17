import React, { useState, useMemo } from 'react';
import { MenuItem } from '../../types';
import Button from '../shared/Button';
import { ICONS } from '../../constants';
import Switch from '../shared/Switch';
import Modal from '../shared/Modal';
import Input from '../shared/Input';
import TabFilter from '../shared/TabFilter';

const MOCK_INVENTORY: MenuItem[] = [
    { id: 'inv1', name: 'Fresh Milk 1L', description: 'Full cream dairy milk.', price: 220, category: 'Dairy & Eggs', inStock: true, imageUrl: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 50 },
    { id: 'inv2', name: 'Brown Bread', description: 'Whole wheat bread loaf.', price: 150, category: 'Bakery', inStock: true, imageUrl: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 30 },
    { id: 'inv3', name: 'Organic Eggs (Dozen)', description: 'Farm fresh organic eggs.', price: 350, category: 'Dairy & Eggs', inStock: false, imageUrl: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 0 },
    { id: 'inv4', name: 'Potato Chips - Salty', description: 'Classic salted potato chips.', price: 100, category: 'Snacks', inStock: true, imageUrl: 'https://images.pexels.com/photos/3793238/pexels-photo-3793238.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 120 },
    { id: 'inv5', name: 'Cola 1.5L', description: 'Chilled carbonated soft drink.', price: 180, category: 'Beverages', inStock: true, imageUrl: 'https://images.pexels.com/photos/1571849/pexels-photo-1571849.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 80 },
    { id: 'inv6', name: 'Apples (1kg)', description: 'Fresh red apples.', price: 300, category: 'Fruits & Vegetables', inStock: true, imageUrl: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 25 },
    { id: 'inv7', name: 'Basmati Rice 5kg', description: 'Premium quality basmati rice.', price: 1800, category: 'Pantry', inStock: true, imageUrl: 'https://images.pexels.com/photos/1547843/pexels-photo-1547843.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 40 },
    { id: 'inv8', name: 'Cooking Oil 1L', description: 'Vegetable cooking oil.', price: 550, category: 'Pantry', inStock: true, imageUrl: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=400', stockLevel: 60 },
    { id: 'inv9', name: 'Yogurt 500g', description: 'Natural plain yogurt.', price: 160, category: 'Dairy & Eggs', inStock: true, imageUrl: 'https://images.pexels.com/photos/4033233/pexels-photo-4033233.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 35 },
    { id: 'inv10', name: 'Lentils (Daal) 1kg', description: 'Red split lentils.', price: 280, category: 'Pantry', inStock: true, imageUrl: 'https://images.pexels.com/photos/13019313/pexels-photo-13019313.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 100 },
    { id: 'inv11', name: 'Tomatoes (1kg)', description: 'Fresh, ripe tomatoes.', price: 120, category: 'Fruits & Vegetables', inStock: true, imageUrl: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 45 },
    { id: 'inv12', name: 'Onions (1kg)', description: 'Fresh red onions.', price: 100, category: 'Fruits & Vegetables', inStock: true, imageUrl: 'https://images.pexels.com/photos/144234/onions-kitchen-bio-food-144234.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 5 },
    { id: 'inv13', name: 'Chocolate Bar', description: 'Dairy milk chocolate.', price: 150, category: 'Snacks', inStock: true, imageUrl: 'https://images.pexels.com/photos/4113941/pexels-photo-4113941.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 200 },
    { id: 'inv14', name: 'Instant Noodles', description: 'Chicken flavor instant noodles.', price: 90, category: 'Pantry', inStock: true, imageUrl: 'https://images.pexels.com/photos/209506/pexels-photo-209506.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 150 },
    { id: 'inv15', name: 'Green Tea (25 bags)', description: 'Jasmine green tea bags.', price: 450, category: 'Beverages', inStock: true, imageUrl: 'https://images.pexels.com/photos/414630/pexels-photo-414630.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 2 },
    { id: 'inv16', name: 'Cheese Slices (10 pack)', description: 'Processed cheddar cheese slices.', price: 400, category: 'Dairy & Eggs', inStock: true, imageUrl: 'https://images.pexels.com/photos/3642633/pexels-photo-3642633.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 28 },
    { id: 'inv17', name: 'Washing Powder 1kg', description: 'Detergent powder for clothes.', price: 380, category: 'Household', inStock: true, imageUrl: 'https://images.pexels.com/photos/7747514/pexels-photo-7747514.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 40 },
    { id: 'inv18', name: 'Bananas (dozen)', description: 'Fresh, ripe bananas.', price: 180, category: 'Fruits & Vegetables', inStock: true, imageUrl: 'https://images.pexels.com/photos/5966439/pexels-photo-5966439.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 40 },
    { id: 'inv19', name: 'Biscuits - Cream', description: 'Cream filled biscuits pack.', price: 120, category: 'Snacks', inStock: true, imageUrl: 'https://images.pexels.com/photos/4846437/pexels-photo-4846437.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 90 },
    { id: 'inv20', name: 'Water 1.5L', description: 'Mineral water bottle.', price: 80, category: 'Beverages', inStock: true, imageUrl: 'https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 300 },
];

const ProductItemModal: React.FC<{ item: Partial<MenuItem> | null, onClose: () => void, onSave: (item: MenuItem) => void }> = ({ item, onClose, onSave }) => {
    const [formData, setFormData] = useState<Partial<MenuItem>>(item || { inStock: true });

    if (!item) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as MenuItem);
    }
    
    return (
        <Modal isOpen={true} onClose={onClose}>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl flex flex-col h-full">
                <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <h3 className="text-lg font-bold">{item.id ? 'Edit Product' : 'Add New Product'}</h3>
                </div>
                <div className="p-4 space-y-4 flex-grow overflow-y-auto">
                    <Input id="name" name="name" label="Product Name" value={formData.name || ''} onChange={handleChange} required />
                    <Button type="button" variant="secondary" className="w-full justify-start"><span className="mr-2">{ICONS.barcode}</span> Scan Barcode</Button>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                        <textarea id="description" name="description" value={formData.description || ''} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm bg-white dark:bg-slate-800" />
                    </div>
                    <div className="flex gap-4">
                        <Input id="price" name="price" label="Price (Rs.)" type="number" step="0.01" value={formData.price || ''} onChange={handleChange} required />
                        <Input id="stockLevel" name="stockLevel" label="Quantity" type="number" value={formData.stockLevel || ''} onChange={handleChange} required />
                    </div>
                    <Input id="category" name="category" label="Category" value={formData.category || ''} onChange={handleChange} required />
                    <Input id="imageUrl" name="imageUrl" label="Image URL" value={formData.imageUrl || ''} onChange={handleChange} placeholder="https://..." />
                </div>
                <div className="p-4 flex gap-2 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <Button type="button" variant="secondary" onClick={onClose} fullWidth>Cancel</Button>
                    <Button type="submit" variant="primary" fullWidth>Save Product</Button>
                </div>
            </form>
        </Modal>
    )
}

const InventoryItemRow: React.FC<{ item: MenuItem; onToggle: (id: string) => void; onEdit: (item: MenuItem) => void; }> = ({ item, onToggle, onEdit }) => (
    <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-2 md:p-4 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-700/50">
        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md flex-shrink-0 bg-slate-200" />
        <div className="flex-grow min-w-0">
            <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">{item.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Rs. {item.price.toFixed(2)}</p>
            <p className={`text-sm font-semibold ${item.stockLevel === 0 ? 'text-red-500' : (item.stockLevel && item.stockLevel < 10 ? 'text-orange-500' : 'text-slate-500 dark:text-slate-400')}`}>
                Stock: {item.stockLevel}
            </p>
        </div>
        <div className="flex-shrink-0 flex items-center gap-4">
            <button onClick={() => onEdit(item)} className="p-2 text-slate-500 hover:text-rose-500" aria-label="Edit Item">{ICONS.edit}</button>
            <Switch checked={item.inStock} onChange={() => onToggle(item.id)} />
        </div>
    </div>
);

const ShopkeeperInventory: React.FC = () => {
    const [inventory, setInventory] = useState(MOCK_INVENTORY);
    const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');

    const handleToggleStock = (id: string) => {
        setInventory(prev =>
            prev.map(item =>
                item.id === id ? { ...item, inStock: !item.inStock } : item
            )
        );
    };

    const handleSaveItem = (itemToSave: MenuItem) => {
        if (itemToSave.id) { // Editing existing item
            setInventory(prev => prev.map(item => item.id === itemToSave.id ? itemToSave : item));
        } else { // Adding new item
            setInventory(prev => [{ ...itemToSave, id: `inv${Date.now()}` }, ...prev]);
        }
        setEditingItem(null);
    }
    
    const filteredInventory = useMemo(() => {
        return inventory
            .filter(item => {
                if (filter === 'Low Stock') return item.stockLevel !== undefined && item.stockLevel > 0 && item.stockLevel < 10;
                if (filter === 'Out of Stock') return item.stockLevel === 0 || !item.inStock;
                return true;
            })
            .filter(item => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [inventory, searchTerm, filter]);

    return (
        <div className="p-4 space-y-6">
            {editingItem && <ProductItemModal item={editingItem} onClose={() => setEditingItem(null)} onSave={handleSaveItem} />}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200">Inventory</h1>
                <Button variant="primary" onClick={() => setEditingItem({})}>
                    <span className="mr-2">{ICONS.add}</span> Add New Product
                </Button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <input 
                        type="search"
                        placeholder="Search products by name or category..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 pl-10 border border-slate-300 dark:border-slate-600 rounded-lg"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{ICONS.search}</span>
                </div>
                <TabFilter 
                    options={['All', 'Low Stock', 'Out of Stock']}
                    activeOption={filter}
                    onOptionClick={setFilter}
                    className="md:max-w-sm"
                />
            </div>

            <div className="space-y-3">
                {filteredInventory.map(item => (
                    <InventoryItemRow key={item.id} item={item} onToggle={handleToggleStock} onEdit={() => setEditingItem(item)} />
                ))}
            </div>
        </div>
    );
};

export default ShopkeeperInventory;