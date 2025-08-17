
import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import ProfilePageWrapper from './ProfilePageWrapper';
import Input from '../../shared/Input';
import Button from '../../shared/Button';

const MyDetails: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Initialize state with user data or fallbacks
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const handleSave = () => {
      // In a real app, call an update user API
      console.log('Saving user details:', { name, email, phone });
      setIsEditing(false);
      alert('Details saved!');
  }

  const handleCancel = () => {
      // Reset fields to original values
      setName(user?.name || '');
      setEmail(user?.email || '');
      setPhone(user?.phone || '');
      setIsEditing(false);
  }

  const actionButton = isEditing ? (
      <div className="flex gap-2">
          <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
      </div>
  ) : (
      <Button onClick={() => setIsEditing(true)}>Edit Details</Button>
  );

  return (
    <ProfilePageWrapper title="My Details" actionButton={actionButton}>
      <div className="space-y-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm space-y-4">
            <Input id="name" label="Full Name" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing} placeholder="John Doe" />
            <Input id="email" label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!isEditing} placeholder="your@email.com" />
            <Input id="phone" label="Phone Number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={!isEditing} placeholder="+923001234567" />
        </div>
      </div>
    </ProfilePageWrapper>
  );
};

export default MyDetails;
