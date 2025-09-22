
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.ts';
import LoginModal from './components/auth/LoginModal.tsx';
import SignupModal from './components/auth/SignupModal.tsx';
import CustomerApp from './components/customer/CustomerApp.tsx';
import RestaurantApp from './components/restaurant/RestaurantApp.tsx';
import RiderApp from './components/rider/RiderApp.tsx';
import ShopkeeperApp from './components/shopkeeper/ShopkeeperApp.tsx';
import AdminApp from './components/admin/AdminApp.tsx';
import { UserRole } from './types.ts';
import Spinner from './components/shared/Spinner.tsx';
import ConfirmationScreen from './components/auth/ConfirmationScreen.tsx';
import SplashScreen from './components/shared/SplashScreen.tsx';
import LandingPage from './components/landing/LandingPage.tsx';
import ScrumptiousStoriesPage from './components/stories/ScrumptiousStoriesPage.tsx';
import StoryDetailPage from './components/stories/StoryDetailPage.tsx';

// --- LAYOUTS & SHARED COMPONENTS ---

const RoleBasedRedirect: React.FC = () => {
    const { role } = useAuth();
    switch (role) {
        case UserRole.Customer:
            return <Navigate to="/customer" replace />;
        case UserRole.Restaurant:
            return <Navigate to="/restaurant" replace />;
        case UserRole.Rider:
            return <Navigate to="/rider" replace />;
        case UserRole.Shopkeeper:
            return <Navigate to="/shopkeeper" replace />;
        case UserRole.Admin:
            return <Navigate to="/admin" replace />;
        default:
            return (
              <div className="flex items-center justify-center h-full">
                <Spinner />
              </div>
            );
    }
};

const AuthenticatedRoutes: React.FC = () => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/" replace />;
    
    return (
        <Routes>
            <Route path="/customer/*" element={user.role === UserRole.Customer ? <CustomerApp /> : <RoleBasedRedirect />} />
            <Route path="/restaurant/*" element={user.role === UserRole.Restaurant ? <RestaurantApp /> : <RoleBasedRedirect />} />
            <Route path="/rider/*" element={user.role === UserRole.Rider ? <RiderApp /> : <RoleBasedRedirect />} />
            <Route path="/shopkeeper/*" element={user.role === UserRole.Shopkeeper ? <ShopkeeperApp /> : <RoleBasedRedirect />} />
            <Route path="/admin/*" element={user.role === UserRole.Admin ? <AdminApp /> : <RoleBasedRedirect />} />
            <Route path="*" element={<RoleBasedRedirect />} />
        </Routes>
    );
};

const GuestRoutes: React.FC<{ openModal: (type: 'login' | 'signup', role?: UserRole) => void; }> = ({ openModal }) => (
    <Routes>
        <Route path="/" element={<LandingPage openModal={openModal} />} />
        <Route path="/stories" element={<ScrumptiousStoriesPage openModal={openModal} />} />
        <Route path="/stories/:storyId" element={<StoryDetailPage openModal={openModal} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
);


// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const { user, loading, verificationPendingUser } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [initialModalRole, setInitialModalRole] = useState<UserRole | undefined>();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isInitialLoad && !loading) {
      setIsInitialLoad(false);
    }
  }, [loading, isInitialLoad]);

  const openModal = (type: 'login' | 'signup', role?: UserRole) => {
    setInitialModalRole(role);
    if (type === 'login') {
      setIsSignupModalOpen(false);
      setIsLoginModalOpen(true);
    } else {
      setIsLoginModalOpen(false);
      setIsSignupModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
  };

  useEffect(() => {
      if (user) {
          closeModal();
      }
  }, [user]);

  if (showSplash) return <SplashScreen />;

  if (isInitialLoad && loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-100 dark:bg-slate-900">
        <Spinner />
      </div>
    );
  }
  
  const Modals = (
    <>
      {verificationPendingUser && <ConfirmationScreen />}
      {isLoginModalOpen && !verificationPendingUser && (
        <LoginModal
          onClose={closeModal}
          onSwitchToSignup={(role) => openModal('signup', role)}
          initialRole={initialModalRole}
        />
      )}
      {isSignupModalOpen && !verificationPendingUser && (
        <SignupModal
          onClose={closeModal}
          onSwitchToLogin={(role) => openModal('login', role)}
          initialRole={initialModalRole}
        />
      )}
    </>
  );

  return (
      <>
        {Modals}
        {user ? <AuthenticatedRoutes /> : <GuestRoutes openModal={openModal} />}
      </>
  );
};

export default App;