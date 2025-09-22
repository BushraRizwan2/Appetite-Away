
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.ts';
import { ALL_ROLES_FOR_DEMO_LOGIN, DEMO_USERS, ICONS } from '../../constants.tsx';
import { UserRole } from '../../types.ts';
import Button from '../shared/Button.tsx';
import Input from '../shared/Input.tsx';
import Spinner from '../shared/Spinner.tsx';
import Modal from '../shared/Modal.tsx';
import CustomSelect from '../shared/CustomSelect.tsx';

interface LoginModalProps {
  onClose: () => void;
  onSwitchToSignup: (role?: UserRole) => void;
  initialRole?: UserRole;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSwitchToSignup, initialRole }) => {
  const [authStep, setAuthStep] = useState<'login' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole || UserRole.Customer);
  const { login, loading } = useAuth();
  
  const formId = `auth-form-${authStep}`;
  const scrollableContentRef = useRef<HTMLDivElement>(null);

  // Gesture handling state
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const swipeDistanceThreshold = 50; // pixels
  
  useEffect(() => {
    if (authStep === 'login') {
      const demoUser = DEMO_USERS[selectedRole];
      setEmail(demoUser.email);
      setPassword(demoUser.password);
    } else {
      setEmail('');
      setPassword('');
    }
  }, [authStep, selectedRole]);

  const handleHeaderTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleHeaderTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    if (touchStartY === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY;
    setTouchStartY(null);

    // Only handle swipe down to close
    if (deltaY > swipeDistanceThreshold) {
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


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, selectedRole);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Password reset link sent to ${email}`);
    setAuthStep('login');
  };

  const roleOptions = ALL_ROLES_FOR_DEMO_LOGIN.map(role => ({ value: role, label: role }));

  const renderContent = () => {
    switch (authStep) {
        case 'login':
            return (
                 <>
                    <Input id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" />
                    <Input 
                        id="password" 
                        label="Password" 
                        type={showPassword ? 'text' : 'password'} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        placeholder="••••••••"
                        icon={showPassword ? ICONS.eyeOff : ICONS.eye}
                        onIconClick={() => setShowPassword(!showPassword)}
                    />
                    <div className="text-right -mt-2">
                        <button type="button" onClick={() => setAuthStep('forgot')} className="text-sm font-medium text-rose-600 hover:text-rose-500 dark:text-rose-400 dark:hover:text-rose-300">
                            Forgot Password?
                        </button>
                    </div>
                    <CustomSelect
                      id="role"
                      label="Select a demo role"
                      options={roleOptions}
                      value={selectedRole}
                      onChange={(value) => setSelectedRole(value as UserRole)}
                    />
                </>
            );
        case 'forgot':
            return (
                <>
                    <p className="text-sm text-center text-slate-600 dark:text-slate-400">Enter your email and we'll send you a link to reset your password.</p>
                    <Input id="email-forgot" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" />
                </>
            );
    }
  }

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
                 {authStep === 'forgot' ? 'Reset your password' : 'Welcome back!'}
            </p>
            {authStep === 'login' && (
                <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                    New here?{' '}
                    <button
                        type="button"
                        onClick={() => onSwitchToSignup(selectedRole)}
                        className="font-semibold text-rose-600 hover:text-rose-500 dark:text-rose-400 dark:hover:text-rose-300 focus:outline-none"
                    >
                        Create an account
                    </button>
                </p>
            )}
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
                onSubmit={authStep === 'login' ? handleLogin : handleForgotPassword}
                className="space-y-4"
            >
                {renderContent()}
            </form>
        </div>


        {/* Fixed Footer */}
        <footer className="flex-shrink-0 p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
             {authStep === 'login' && (
                <Button type="submit" form={formId} fullWidth disabled={loading}>
                    {loading ? <Spinner size="sm" /> : 'Login'}
                </Button>
             )}
              {authStep === 'forgot' && (
                <div className="space-y-2">
                    <Button type="submit" form={formId} fullWidth disabled={loading}>
                        {loading ? <Spinner size="sm" /> : 'Send Reset Link'}
                    </Button>
                    <Button variant="secondary" fullWidth onClick={() => setAuthStep('login')} disabled={loading}>
                        Back to Login
                    </Button>
                </div>
             )}
        </footer>
    </Modal>
  );
};

export default LoginModal;