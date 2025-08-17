import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Convert to a centered modal on all screen sizes with padding and responsive width.
  const backdropClasses = "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4";
  
  const containerClasses = `
    relative bg-white dark:bg-slate-900 shadow-xl w-full flex flex-col 
    transition-all duration-300 ease-in-out 
    max-w-lg rounded-2xl max-h-[90vh]
  `;

  return (
    <div className={backdropClasses} onClick={handleBackdropClick}>
      <div className={containerClasses} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;