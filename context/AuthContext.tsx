

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  verificationPendingUser: User | null; // New state
  loading: boolean;
  login: (email: string, role: UserRole) => Promise<void>;
  signup: (details: Omit<User, 'id'>) => Promise<void>;
  logout: () => void;
  verifyAccount: (code: string, method: 'email' | 'sms') => Promise<void>; // New function
  cancelVerification: () => void; // New function
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [verificationPendingUser, setVerificationPendingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for an existing session
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const login = useCallback(async (email: string, role: UserRole) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockUser: User = { 
        id: '1', 
        name: role === UserRole.Restaurant ? 'Restaurant Owner' : 'Test User', 
        email, 
        role,
        status: 'Active',
        joinedDate: new Date().toISOString(),
        businessName: role === UserRole.Restaurant ? 'The Golden Spoon' : undefined,
        logoUrl: role === UserRole.Restaurant ? 'https://ui-avatars.com/api/?name=The+Golden+Spoon&background=ffedd5&color=9a3412' : undefined,
    };
    setUser(mockUser);
    setRole(role);
    setVerificationPendingUser(null);
    setLoading(false);
  }, []);

  const signup = useCallback(async (details: Omit<User, 'id'>) => {
    setLoading(true);
    // Simulate API call to register user, which sends verification codes
    await new Promise(resolve => setTimeout(resolve, 500));
    const pendingUser: User = { id: 'temp-id', ...details };
    setVerificationPendingUser(pendingUser);
    setUser(null); // Ensure no user is logged in
    setRole(null);
    setLoading(false);
  }, []);

  const verifyAccount = useCallback(async (code: string, method: 'email' | 'sms') => {
    if (!verificationPendingUser) return;
    setLoading(true);
    // Simulate API call to verify the code
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Verifying with code ${code} via ${method}`);
    
    // On successful verification, log the user in
    // In a real app, the backend would return the final user object
    const finalUser: User = { ...verificationPendingUser, id: '1' };
    setUser(finalUser);
    setRole(finalUser.role);
    setVerificationPendingUser(null); // Clear pending state
    setLoading(false);
  }, [verificationPendingUser]);

  const cancelVerification = useCallback(() => {
    setVerificationPendingUser(null);
  }, []);


  const logout = useCallback(() => {
    setUser(null);
    setRole(null);
    setVerificationPendingUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, verificationPendingUser, loading, login, signup, logout, verifyAccount, cancelVerification }}>
      {children}
    </AuthContext.Provider>
  );
};
