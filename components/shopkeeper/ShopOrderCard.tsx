
import React, { useState } from 'react';
import { Order, OrderStatus } from '../../types';
import Button from '../shared/Button';
import { ICONS } from '../../constants';
import ChatModal from '../shared/ChatModal';
import RejectOrderWithCommentModal from './RejectOrderWithCommentModal';

interface ShopOrderCardProps {
  order: Order;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus, details?: { reason?: string; prepTime?: number; comment?: string }) => void;
}

const statusColors = {
    [OrderStatus.Incoming]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    [OrderStatus.Preparing]: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    [OrderStatus.ReadyForPickup]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    [OrderStatus.Rejected]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    [OrderStatus.OutForDelivery]: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    [OrderStatus.Delivered]: 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200',
    [OrderStatus.Cancelled]: 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200',
};

const ShopOrderCard: React.FC<ShopOrderCardProps> = ({ order, onUpdateStatus }) => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleRejectConfirm = (comment: string) => {
    onUpdateStatus(order.id, OrderStatus.Rejected, { comment });
    setIsRejectModalOpen(false);
  };

  const handleAccept = () => {
    // Shopkeepers might not need to set a prep time, so we can directly update the status.
    onUpdateStatus(order.id, OrderStatus.Preparing);
  };

  const renderActions = () => {
    switch(order.status) {
        case OrderStatus.Incoming:
            return (
                <div className="flex gap-2 pt-2">
                    <Button variant="danger" className="flex-1" onClick={() => setIsRejectModalOpen(true)}>Reject</Button>
                    <Button variant="success" className="flex-1" onClick={handleAccept}>Accept</Button>
                </div>
            );
        case OrderStatus.Preparing:
             return (
                <div className="pt-2">
                    <Button variant="primary" fullWidth onClick={() => onUpdateStatus(order.id, OrderStatus.ReadyForPickup)}>Ready for Pickup</Button>
                </div>
            );
        case OrderStatus.ReadyForPickup:
            return (
                <div className="pt-2">
                    {!order.riderInfo && <p className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400">Awaiting rider assignment...</p>}
                </div>
            )
        default:
            return null;
    }
  }

  return (
    <>
    {isRejectModalOpen && <RejectOrderWithCommentModal onClose={() => setIsRejectModalOpen(false)} onConfirm={handleRejectConfirm} />}
    {isChatOpen && <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} recipientName={order.riderInfo?.name || "Rider"} orderId={order.id} isChatActive={true} />}
    
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 space-y-3 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white">Order #{order.id}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">For {order.customerName}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.status] || ''}`}>{order.status}</span>
      </div>
      
      <ul className="text-sm text-slate-700 dark:text-slate-300 list-disc list-inside">
        {order.items.map((item, index) => <li key={item.cartItemId || index}>{item.quantity}x {item.name}</li>)}
      </ul>
      
      {renderActions()}

      {order.riderInfo && (
         <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
             <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-2">Rider Assigned</p>
             <div className="flex items-center gap-3">
                 <img src={order.riderInfo.avatarUrl} alt={order.riderInfo.name} className="w-10 h-10 rounded-full"/>
                 <div className="flex-grow">
                     <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{order.riderInfo.name}</p>
                     <p className="text-xs text-slate-500 dark:text-slate-400">{order.riderInfo.vehicle} - {order.riderInfo.vehiclePlate}</p>
                 </div>
                 <div className="flex gap-2">
                     <button onClick={() => setIsChatOpen(true)} className="w-9 h-9 flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-full">{ICONS.chat}</button>
                     <a href="tel:123" className="w-9 h-9 flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-full">{ICONS.call}</a>
                 </div>
             </div>
        </div>
      )}
    </div>
    </>
  );
};

export default ShopOrderCard;
