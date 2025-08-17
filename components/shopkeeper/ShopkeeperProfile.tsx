import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../shared/Button';
import ProfilePageWrapper from '../customer/profile/ProfilePageWrapper';
import { ICONS } from '../../constants';

const EditableField: React.FC<{ label: string; value: string; onChange: (val: string) => void; isEditing: boolean; placeholder?: string; type?: string; }> = ({ label, value, onChange, isEditing, placeholder, type = 'text' }) => (
    <div className="py-3">
        <label className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</label>
        {isEditing ? (
            <input
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full mt-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm bg-white dark:bg-slate-800"
            />
        ) : (
            <p className="font-semibold text-slate-800 dark:text-slate-200 mt-1">{value || '-'}</p>
        )}
    </div>
);

const FileUploadField: React.FC<{ label: string; onFileSelect: (file: File | null) => void; previewUrl?: string; isEditing: boolean; className?: string; }> = ({ label, onFileSelect, previewUrl, isEditing, className = 'w-20 h-20' }) => (
     <div className="py-3">
        <label className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</label>
        <div className="mt-2 flex items-center gap-4">
            <img src={previewUrl || 'https://placehold.co/400x400/e2e8f0/e2e8f0'} alt="preview" className={`${className} object-cover rounded-md bg-slate-200`} />
            {isEditing && (
                 <input 
                    type="file" 
                    accept="image/*"
                    onChange={e => onFileSelect(e.target.files ? e.target.files[0] : null)}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                />
            )}
        </div>
    </div>
);

const ShopkeeperProfile: React.FC = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    // Form state with mock data
    const [profileData, setProfileData] = useState({
        shopName: user?.businessName || 'The Corner Store',
        slogan: user?.slogan || 'Your neighborhood\'s favorite stop!',
        address: user?.restaurantAddress || 'Shop 4, Market St, Karachi',
        ownerName: user?.name || 'Ahmed Siddiqui',
        email: user?.email || 'shopkeeper@appetite.com',
        logoFile: null as File | null,
        bannerFile: null as File | null,
        businessLicense: null as File | null,
    });
    
    const [logoPreview, setLogoPreview] = useState<string | undefined>(user?.logoUrl || 'https://placehold.co/100x100/f43f5e/white?text=Logo');
    const [bannerPreview, setBannerPreview] = useState<string | undefined>(user?.bannerUrl || 'https://placehold.co/600x200/fbcfe8/f43f5e?text=Shop+Banner');

    const handleFieldChange = (field: keyof typeof profileData, value: any) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
    };
    
    const handleFileChange = (field: 'logoFile' | 'bannerFile' | 'businessLicense', file: File | null, setPreview?: React.Dispatch<React.SetStateAction<string | undefined>>) => {
        if (file) {
            handleFieldChange(field, file);
            setPreview?.(URL.createObjectURL(file));
        }
    };
    
    const handleSave = () => {
        console.log('Saving profile data:', profileData);
        alert("Shop profile updated successfully!");
        setIsEditing(false);
    };

    const actionButton = isEditing ? (
        <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setIsEditing(false)} className="px-3 py-1 text-sm">Cancel</Button>
            <Button variant="primary" onClick={handleSave} className="px-3 py-1 text-sm">Save</Button>
        </div>
    ) : (
        <Button variant="primary" onClick={() => setIsEditing(true)} className="px-3 py-1 text-sm">
            <span className="mr-2 h-4 w-4">{ICONS.edit}</span> Edit Profile
        </Button>
    );

    return (
        <ProfilePageWrapper title="My Shop Profile" actionButton={actionButton}>
            <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 divide-y divide-slate-200 dark:divide-slate-700">
                    <EditableField label="Shop Name" value={profileData.shopName} onChange={val => handleFieldChange('shopName', val)} isEditing={isEditing} />
                    <EditableField label="Slogan" value={profileData.slogan} onChange={val => handleFieldChange('slogan', val)} isEditing={isEditing} placeholder="e.g., Fresh groceries, daily." />
                    <FileUploadField label="Shop Logo" previewUrl={logoPreview} onFileSelect={file => handleFileChange('logoFile', file, setLogoPreview)} isEditing={isEditing} />
                    <FileUploadField label="Shop Banner" previewUrl={bannerPreview} onFileSelect={file => handleFileChange('bannerFile', file, setBannerPreview)} isEditing={isEditing} className="w-full h-32" />
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 divide-y divide-slate-200 dark:divide-slate-700">
                     <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 pb-2 -mt-1">Location</h3>
                     <EditableField label="Address" value={profileData.address} onChange={val => handleFieldChange('address', val)} isEditing={isEditing} />
                     <div className="py-3">
                        <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Location on Map</label>
                        <div className="mt-2 h-48 bg-slate-200 dark:bg-slate-700 rounded-md flex items-center justify-center text-slate-500">
                            Map Placeholder
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 divide-y divide-slate-200 dark:divide-slate-700">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 pb-2 -mt-1">Owner & Business Details</h3>
                    <EditableField label="Owner Name" value={profileData.ownerName} onChange={val => handleFieldChange('ownerName', val)} isEditing={isEditing} />
                    <EditableField label="Contact Email" value={profileData.email} onChange={val => handleFieldChange('email', val)} isEditing={isEditing} type="email" />
                    <div className="py-3">
                        <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Business License</label>
                        {profileData.businessLicense ? <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{profileData.businessLicense.name}</p> : <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">No file uploaded.</p>}
                        {isEditing && (
                             <input 
                                type="file" 
                                accept=".pdf,.jpg,.png"
                                onChange={e => handleFileChange('businessLicense', e.target.files ? e.target.files[0] : null)}
                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 mt-2"
                            />
                        )}
                    </div>
                </div>
            </div>
        </ProfilePageWrapper>
    );
};

export default ShopkeeperProfile;