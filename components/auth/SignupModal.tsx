

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.ts';
import { ROLES, ICONS } from '../../constants.tsx';
import { UserRole, User } from '../../types.ts';
import Button from '../shared/Button.tsx';
import Input from '../shared/Input.tsx';
import Spinner from '../shared/Spinner.tsx';
import PhoneNumberInput from './PhoneNumberInput.tsx';
import Accordion from '../shared/Accordion.tsx';
import Modal from '../shared/Modal.tsx';
import CustomSelect from '../shared/CustomSelect.tsx';

interface SignupModalProps {
  onClose: () => void;
  onSwitchToLogin: (role?: UserRole) => void;
  initialRole?: UserRole;
}

const FileInput: React.FC<{ label: string; subtext?: string; required?: boolean; isOptional?: boolean }> = ({ label, subtext, required, isOptional }) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>} {isOptional && <span className="text-xs text-slate-500">(Optional)</span>}
      </label>
      {subtext && <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{subtext}</p>}
      <input 
          type="file" 
          className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100" 
          required={required}
      />
    </div>
  );

const SignupModal: React.FC<SignupModalProps> = ({ onClose, onSwitchToLogin, initialRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [countryCode, setCountryCode] = useState('+92');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [vehicleType, setVehicleType] = useState<'bicycle' | 'motorbike' | 'car' | 'walker'>('motorbike');
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole || UserRole.Customer);
  const { signup, loading } = useAuth();
  
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [taxId, setTaxId] = useState('');
  const [bankDetails, setBankDetails] = useState('');
  
  const scrollableContentRef = useRef<HTMLDivElement>(null);

  // Gesture handling state
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const swipeDistanceThreshold = 50; // pixels

  const emailRegex = /^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,3}$/;
  const formId = `auth-form-signup`;
  
  useEffect(() => {
    // Reset fields when role changes
    setEmail('');
    setPassword('');
    setName('');
    setBusinessName('');
    setPhoneNumber('');
    setCountryCode('+92');
    setShowPassword(false);
    setRestaurantAddress('');
    setCuisineType('');
    setTaxId('');
    setBankDetails('');
  }, [selectedRole]);
  
  const handleHeaderTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleHeaderTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    if (touchStartY === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY;
    setTouchStartY(null);

    if (deltaY > swipeDistanceThreshold) { // Swiped Down
      onClose();
    }
  };

  const handleContentTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // Only track touch for swipe-down-to-close if we are scrolled to the top.
    if (scrollableContentRef.current && scrollableContentRef.current.scrollTop === 0) {
      setTouchStartY(e.touches[0].clientY);
    } else {
      setTouchStartY(null);
    }
  };

  const handleContentTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartY === null) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY;
    setTouchStartY(null);

    // Only handle swipe down on content area to prevent conflict with scrolling up
    if (deltaY > swipeDistanceThreshold) {
      onClose();
    }
  };


  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address (e.g., user@example.com).');
        return;
    }
    if (phoneNumber.trim().length < 7 && selectedRole !== UserRole.Customer) {
        alert('Please enter a valid phone number.');
        return;
    }
    const signupDetails: Omit<User, 'id'> = {
        name,
        email,
        phone: `${countryCode}${phoneNumber}`,
        role: selectedRole,
        status: 'Active',
        joinedDate: new Date().toISOString(),
        businessName: selectedRole === UserRole.Restaurant || selectedRole === UserRole.Shopkeeper ? businessName : undefined,
        restaurantAddress: selectedRole === UserRole.Restaurant ? restaurantAddress : undefined,
        cuisineType: selectedRole === UserRole.Restaurant ? cuisineType : undefined,
        taxId: selectedRole === UserRole.Restaurant ? taxId : undefined,
        bankDetails: selectedRole === UserRole.Restaurant ? bankDetails : undefined,
        vehicleType: selectedRole === UserRole.Rider ? vehicleType : undefined,
    };
    await signup(signupDetails);
  };

  const roleOptions = ROLES.map(role => ({ value: role, label: role }));
  const vehicleOptions = [
      { value: 'motorbike', label: 'Motorbike' },
      { value: 'bicycle', label: 'Bicycle' },
      { value: 'car', label: 'Car' },
      { value: 'walker', label: 'Walker' },
  ];
  
  const renderContent = () => {
    return (
        <>
            <CustomSelect
                id="role-signup"
                label="I am signing up as a"
                options={roleOptions}
                value={selectedRole}
                onChange={(value) => setSelectedRole(value as UserRole)}
            />

            {selectedRole === UserRole.Customer && (
                <div className="space-y-4 pt-2">
                    <Input id="name" label="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. John Doe" />
                    <Input id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" />
                    <Input id="password" label="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Choose a strong password" icon={showPassword ? ICONS.eyeOff : ICONS.eye} onIconClick={() => setShowPassword(!showPassword)} />
                    <PhoneNumberInput
                        id="phone"
                        label="Phone Number (Optional)"
                        countryCode={countryCode}
                        onCountryCodeChange={setCountryCode}
                        phoneNumber={phoneNumber}
                        onPhoneNumberChange={setPhoneNumber}
                    />
                </div>
            )}

            {selectedRole === UserRole.Shopkeeper && (
                <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-700 mt-4">
                    <Input id="name" label="Your Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Jane Doe" />
                    <Input id="businessName" label="Shop Name" type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required placeholder="e.g. The Corner Store" />
                    <Input id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your.shop@email.com" />
                    <Input id="password" label="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Choose a strong password" icon={showPassword ? ICONS.eyeOff : ICONS.eye} onIconClick={() => setShowPassword(!showPassword)} />
                     <PhoneNumberInput
                        id="phone"
                        label="Shop Phone Number"
                        countryCode={countryCode}
                        onCountryCodeChange={setCountryCode}
                        phoneNumber={phoneNumber}
                        onPhoneNumberChange={setPhoneNumber}
                    />
                </div>
            )}

            {selectedRole === UserRole.Rider && (
                <div className="space-y-2 border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
                    <Accordion title="Step 1: Account & Contact" initialOpen={true}>
                        <div className="space-y-4 p-2">
                            <Input id="name" label="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. John Doe" />
                            <Input id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" />
                            <Input id="password" label="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Choose a strong password" icon={showPassword ? ICONS.eyeOff : ICONS.eye} onIconClick={() => setShowPassword(!showPassword)} />
                            <PhoneNumberInput
                                id="phone"
                                label="Phone Number"
                                countryCode={countryCode}
                                onCountryCodeChange={setCountryCode}
                                phoneNumber={phoneNumber}
                                onPhoneNumberChange={setPhoneNumber}
                            />
                        </div>
                    </Accordion>
                    <Accordion title="Step 2: Vehicle & Documents" initialOpen={false}>
                        <div className="space-y-4 p-2">
                            <CustomSelect
                                id="vehicle"
                                label="Vehicle Type"
                                options={vehicleOptions}
                                value={vehicleType}
                                onChange={(value) => setVehicleType(value as any)}
                            />
                            <FileInput label="Driver's License / ID" required />
                        </div>
                    </Accordion>
                </div>
            )}
            
            {selectedRole === UserRole.Restaurant && (
                <div className="space-y-2 border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
                    <Accordion title="Step 1: Account Basics" initialOpen={true}>
                        <div className="space-y-4 p-2">
                            <Input id="name" label="Owner's Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. John Doe" />
                            <Input id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" />
                            <Input id="password" label="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Choose a strong password" icon={showPassword ? ICONS.eyeOff : ICONS.eye} onIconClick={() => setShowPassword(!showPassword)} />
                        </div>
                    </Accordion>
                    <Accordion title="Step 2: Business & Contact" initialOpen={false}>
                            <div className="space-y-4 p-2">
                            <Input id="businessName" label="Business Name" type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required placeholder="e.g. The Golden Spoon" />
                            <Input id="restaurantAddress" label="Restaurant Address" type="text" value={restaurantAddress} onChange={(e) => setRestaurantAddress(e.target.value)} required placeholder="Street, City, Country" />
                            <Input id="cuisineType" label="Cuisine Type" type="text" value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} required placeholder="e.g., Pakistani, Italian" />
                                <PhoneNumberInput
                                id="phone"
                                label="Phone Number"
                                countryCode={countryCode}
                                onCountryCodeChange={setCountryCode}
                                phoneNumber={phoneNumber}
                                onPhoneNumberChange={setPhoneNumber}
                            />
                        </div>
                    </Accordion>
                    <Accordion title="Step 3: Financial & Legal" initialOpen={false}>
                        <div className="space-y-4 p-2">
                            <Input id="taxId" label="Tax ID" type="text" value={taxId} onChange={(e) => setTaxId(e.target.value)} required placeholder="Your business tax identification number" />
                            <Input id="bankDetails" label="Bank Details for Payouts" type="text" value={bankDetails} onChange={(e) => setBankDetails(e.target.value)} required placeholder="e.g., Account Number, Bank Name" />
                            <FileInput label="Business Registration" subtext="Official business registration certificate." required />
                            <FileInput label="Tax Document" subtext="e.g., BIR 2303 or regional equivalent." required />
                        </div>
                    </Accordion>
                    <Accordion title="Step 4: Menu & Photos" initialOpen={false}>
                        <div className="space-y-4 p-2">
                            <FileInput label="Full Menu" subtext="A clear, readable PDF of your menu." required />
                            <FileInput label="Storefront Images" subtext="Photos of your restaurant's exterior." isOptional />
                        </div>
                    </Accordion>
                </div>
            )}
        </>
    );
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
        {/* Header */}
        <header 
            className="relative flex-shrink-0 p-4 md:p-6 border-b border-slate-200 dark:border-slate-700"
            onTouchStart={handleHeaderTouchStart}
            onTouchEnd={handleHeaderTouchEnd}
            aria-label="Drag to close on mobile"
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 z-20"
                aria-label="Close"
            >
                {ICONS.close}
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
                <Link to="/" onClick={onClose} className="text-rose-500 hover:underline">Appetite Away</Link>
            </h1>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
                 Create your account
            </p>
             <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                Already have an account?{' '}
                <button
                    type="button"
                    onClick={() => onSwitchToLogin(selectedRole)}
                    className="font-semibold text-rose-600 hover:text-rose-500 dark:text-rose-400 dark:hover:text-rose-300 focus:outline-none"
                >
                    Log In
                </button>
            </p>
        </header>
        
        {/* Scrollable Container */}
        <div 
            ref={scrollableContentRef}
            className="flex-grow min-h-0 overflow-y-auto p-4 md:p-6 pb-32"
            onTouchStart={handleContentTouchStart}
            onTouchEnd={handleContentTouchEnd}
        >
            <form
                id={formId}
                onSubmit={handleSignup}
                className="space-y-4"
            >
                {renderContent()}
            </form>
        </div>


        {/* Fixed Footer */}
        <footer className="flex-shrink-0 p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            <Button type="submit" form={formId} fullWidth disabled={loading}>
                {loading ? <Spinner size="sm"/> : 'Sign Up & Get Started'}
            </Button>
        </footer>
    </Modal>
  );
};

export default SignupModal;