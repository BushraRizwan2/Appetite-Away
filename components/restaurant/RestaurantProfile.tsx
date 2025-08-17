import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../shared/Button';
import { Link } from 'react-router-dom';
import { ICONS } from '../../constants';
import ProfilePageWrapper from '../customer/profile/ProfilePageWrapper';
import CustomSelect from '../shared/CustomSelect';

const EditableField: React.FC<{ label: string; value: string; onChange: (val: string) => void; isEditing: boolean; placeholder?: string }> = ({ label, value, onChange, isEditing, placeholder }) => (
    <div className="py-2">
        <label className="text-sm text-slate-500 dark:text-slate-400">{label}</label>
        {isEditing ? (
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full mt-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm bg-white dark:bg-slate-800"
            />
        ) : (
            <p className="font-semibold text-slate-800 dark:text-slate-200">{value || '-'}</p>
        )}
    </div>
);

const FileUpload: React.FC<{ label: string; onFileSelect: (file: File | null) => void; previewUrl?: string; isEditing: boolean }> = ({ label, onFileSelect, previewUrl, isEditing }) => (
     <div className="py-2">
        <label className="text-sm text-slate-500 dark:text-slate-400">{label}</label>
        <div className="mt-1 flex items-center gap-4">
            <img src={previewUrl || 'https://placehold.co/100x100/e2e8f0/e2e8f0'} alt="preview" className="w-16 h-16 object-cover rounded-md bg-slate-200" />
            {isEditing && (
                 <input 
                    type="file" 
                    onChange={e => onFileSelect(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                />
            )}
        </div>
    </div>
);


const RestaurantProfile: React.FC = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    // Form state
    const [profileData, setProfileData] = useState({
        businessName: user?.businessName || 'The Golden Spoon',
        address: user?.restaurantAddress || '123 Johar St, Karachi',
        defaultPrepTime: '35', // in minutes
        visibility: 'Public',
        bankDetails: user?.bankDetails || 'HBL **** 5678',
        logoFile: null as File | null,
        coverFile: null as File | null,
    });
    const [logoPreview, setLogoPreview] = useState<string | undefined>(user?.logoUrl);
    const [coverPreview, setCoverPreview] = useState<string | undefined>('https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');

    const handleFieldChange = (field: keyof typeof profileData, value: any) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
    };
    
    const handleFileChange = (field: 'logoFile' | 'coverFile', file: File | null, setPreview: (url: string) => void) => {
        if (file) {
            handleFieldChange(field, file);
            setPreview(URL.createObjectURL(file));
        }
    };
    
    const handleSave = () => {
        console.log('Saving profile data:', profileData);
        alert("Profile updated successfully!");
        setIsEditing(false);
    };

    const actionButton = isEditing ? (
        <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSave}>Save</Button>
        </div>
    ) : (
        <Button variant="primary" onClick={() => setIsEditing(true)}>Edit Profile</Button>
    );
    
    const visibilityOptions = [
        { value: 'Public', label: 'Public' },
        { value: 'Private (Unlisted)', label: 'Private (Unlisted)' },
    ];

    return (
        <ProfilePageWrapper title="Manage Profile" actionButton={actionButton}>
            <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 divide-y divide-slate-200 dark:divide-slate-700">
                    <EditableField label="Restaurant Name" value={profileData.businessName} onChange={val => handleFieldChange('businessName', val)} isEditing={isEditing} />
                    <EditableField label="Restaurant Address" value={profileData.address} onChange={val => handleFieldChange('address', val)} isEditing={isEditing} />
                    <FileUpload label="Logo" previewUrl={logoPreview} onFileSelect={file => handleFileChange('logoFile', file, setLogoPreview)} isEditing={isEditing} />
                    <FileUpload label="Cover Page" previewUrl={coverPreview} onFileSelect={file => handleFileChange('coverFile', file, setCoverPreview)} isEditing={isEditing} />
                    
                    <div className="py-2">
                        {isEditing ? (
                            <CustomSelect
                                id="visibility"
                                label="Profile Visibility"
                                options={visibilityOptions}
                                value={profileData.visibility}
                                onChange={val => handleFieldChange('visibility', val)}
                            />
                        ) : (
                            <>
                               <label className="text-sm text-slate-500 dark:text-slate-400">Profile Visibility</label>
                               <p className="font-semibold text-slate-800 dark:text-slate-200">{profileData.visibility}</p>
                            </>
                        )}
                    </div>
                </div>

                 <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 divide-y divide-slate-200 dark:divide-slate-700">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 pb-2">Operational Settings</h3>
                    <EditableField label="Default Preparation Time (minutes)" value={profileData.defaultPrepTime} onChange={val => handleFieldChange('defaultPrepTime', val)} isEditing={isEditing} />
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 pb-2">Menu Management</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Update your menu items, categories, and prices.</p>
                    <Link to="/restaurant/menu">
                        <Button fullWidth>
                            <span className="mr-2">{ICONS.orders}</span> Manage Menu & Prices
                        </Button>
                    </Link>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 divide-y divide-slate-200 dark:divide-slate-700">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 pb-2">Financials</h3>
                     <EditableField label="Bank Account for Payouts" value={profileData.bankDetails} onChange={val => handleFieldChange('bankDetails', val)} isEditing={isEditing} placeholder="Bank Name - Account Number"/>
                </div>
            </div>
        </ProfilePageWrapper>
    );
};

export default RestaurantProfile;