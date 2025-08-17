import React, { createContext, useState, useCallback, useContext } from 'react';

// --- TYPES ---
type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType) => void;
}

// --- CONTEXT ---
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// --- HOOK ---
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// --- COMPONENT: The actual toast/notification UI ---
const NotificationComponent: React.FC<{ notification: Notification | null; onDismiss: () => void }> = ({ notification, onDismiss }) => {
    const [isVisible, setIsVisible] = useState(false);

    React.useEffect(() => {
        if (notification) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                // Allow for fade-out animation before fully dismissing
                setTimeout(onDismiss, 300);
            }, 5000); // Auto-dismiss after 5 seconds

            return () => clearTimeout(timer);
        }
    }, [notification, onDismiss]);
    
    if (!notification) return null;

    const baseClasses = 'fixed top-5 right-5 z-[9999] p-4 rounded-lg shadow-2xl flex items-center gap-4 transition-all duration-300 ease-in-out max-w-sm';
    const visibilityClasses = isVisible ? 'transform translate-x-0 opacity-100' : 'transform translate-x-full opacity-0';
    
    const typeClasses = {
        success: 'bg-emerald-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white',
        warning: 'bg-amber-500 text-white',
    };
    
    const icons = {
        success: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        error: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        info: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        warning: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
    };

    const handleDismiss = () => {
        setIsVisible(false);
        setTimeout(onDismiss, 300);
    };

    return (
        <div className={`${baseClasses} ${typeClasses[notification.type]} ${visibilityClasses}`} role="alert">
            <div className="flex-shrink-0">{icons[notification.type]}</div>
            <div className="flex-grow font-semibold">{notification.message}</div>
             <button onClick={handleDismiss} className="ml-4 -mr-2 p-1 rounded-full hover:bg-white/20 transition-colors" aria-label="Dismiss notification">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
    );
};


// --- PROVIDER ---
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [queue, setQueue] = useState<Notification[]>([]);

  const showNotification = useCallback((message: string, type: NotificationType = 'info') => {
    setQueue(prevQueue => [...prevQueue, { message, type }]);
  }, []);

  // Process the queue to show notifications one by one
  React.useEffect(() => {
    if (!notification && queue.length > 0) {
      const [nextNotification, ...restOfQueue] = queue;
      setNotification(nextNotification);
      setQueue(restOfQueue);
    }
  }, [notification, queue]);
  
  const dismissNotification = useCallback(() => {
      setNotification(null);
  }, []);

  const contextValue = {
    showNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <NotificationComponent notification={notification} onDismiss={dismissNotification} />
    </NotificationContext.Provider>
  );
};
