import React, { useState, useEffect } from 'react';
import { Order, OrderStatus } from '../../types';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import { ICONS } from '../../constants';
import ChatModal from '../shared/ChatModal';

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus, details?: { reason?: string; prepTime?: number }) => void;
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

const RejectOrderModal: React.FC<{onClose: () => void, onConfirm: (reason: string) => void}> = ({ onClose, onConfirm }) => {
    const [reason, setReason] = useState('');
    const [otherReasonText, setOtherReasonText] = useState('');
    const reasons = ["Restaurant is too busy", "Item(s) out of stock", "Closing soon", "Other"];
    
    const isConfirmDisabled = !reason || (reason === 'Other' && !otherReasonText.trim());

    return (
        <Modal isOpen={true} onClose={onClose}>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl">
                <h3 className="text-lg font-bold mb-4">Reason for Rejection</h3>
                <div className="space-y-2 mb-4">
                    {reasons.map(r => (
                        <button 
                            key={r}
                            onClick={() => setReason(r)}
                            className={`w-full text-left p-3 rounded-lg border-2 ${reason === r ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/40' : 'border-slate-200 dark:border-slate-700'}`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
                {reason === 'Other' && (
                    <textarea
                        value={otherReasonText}
                        onChange={e => setOtherReasonText(e.target.value)}
                        placeholder="Please specify the reason..."
                        className="w-full mt-2 p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800"
                        rows={3}
                    />
                )}
                <div className="flex gap-2 mt-4">
                    <Button variant="secondary" onClick={onClose} fullWidth>Cancel</Button>
                    <Button variant="danger" onClick={() => onConfirm(reason === 'Other' ? otherReasonText : reason)} fullWidth disabled={isConfirmDisabled}>Confirm Rejection</Button>
                </div>
            </div>
        </Modal>
    );
};

const AcceptOrderModal: React.FC<{onClose: () => void, onConfirm: (prepTime: number) => void}> = ({ onClose, onConfirm }) => {
    const [prepTime, setPrepTime] = useState(15);
    const timeOptions = [15, 20, 30, 45, 60];

    return (
        <Modal isOpen={true} onClose={onClose}>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl">
                <h3 className="text-lg font-bold mb-4">Set Preparation Time</h3>
                <p className="text-sm text-slate-500 mb-4">Estimate how long it will take to prepare this order. This will be shown to the customer.</p>
                <div className="flex justify-center items-center gap-4 mb-4">
                    <button onClick={() => setPrepTime(p => Math.max(5, p-5))} className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 font-bold text-lg">-</button>
                    <span className="text-3xl font-bold w-20 text-center">{prepTime} min</span>
                    <button onClick={() => setPrepTime(p => p+5)} className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 font-bold text-lg">+</button>
                </div>
                <div className="flex justify-center gap-2 mb-4">
                    {timeOptions.map(t => (
                        <button key={t} onClick={() => setPrepTime(t)} className={`px-3 py-1 rounded-full text-sm font-semibold ${prepTime === t ? 'bg-rose-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>{t} min</button>
                    ))}
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" onClick={onClose} fullWidth>Cancel</Button>
                    <Button variant="success" onClick={() => onConfirm(prepTime)} fullWidth>Accept Order</Button>
                </div>
            </div>
        </Modal>
    );
}

const RiderInfo: React.FC<{ rider: any, onChat: () => void }> = ({ rider, onChat }) => (
    <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
         <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-2">Rider Assigned</p>
         <div className="flex items-center gap-3">
             <img src={rider.avatarUrl} alt={rider.name} className="w-10 h-10 rounded-full"/>
             <div className="flex-grow">
                 <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{rider.name}</p>
                 <p className="text-xs text-slate-500 dark:text-slate-400">{rider.vehicle} - {rider.vehiclePlate}</p>
             </div>
             <div className="flex gap-2">
                 <button onClick={onChat} className="w-9 h-9 flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-full">{ICONS.chat}</button>
                 <a href="tel:123" className="w-9 h-9 flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-full">{ICONS.call}</a>
             </div>
         </div>
    </div>
);


const OrderCard: React.FC<OrderCardProps> = ({ order, onUpdateStatus }) => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleRejectConfirm = (reason: string) => {
    onUpdateStatus(order.id, OrderStatus.Rejected, { reason });
    setIsRejectModalOpen(false);
  };

  const handleAcceptConfirm = (prepTime: number) => {
      onUpdateStatus(order.id, OrderStatus.Preparing, { prepTime });
      setIsAcceptModalOpen(false);
  };

  const renderActions = () => {
    switch(order.status) {
        case OrderStatus.Incoming:
            return (
                <div className="flex gap-2 pt-2">
                    <Button variant="danger" className="flex-1" onClick={() => setIsRejectModalOpen(true)}>Reject</Button>
                    <Button variant="success" className="flex-1" onClick={() => setIsAcceptModalOpen(true)}>Accept</Button>
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
    {isRejectModalOpen && <RejectOrderModal onClose={() => setIsRejectModalOpen(false)} onConfirm={handleRejectConfirm} />}
    {isAcceptModalOpen && <AcceptOrderModal onClose={() => setIsAcceptModalOpen(false)} onConfirm={handleAcceptConfirm} />}
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

      {order.riderInfo && <RiderInfo rider={order.riderInfo} onChat={() => setIsChatOpen(true)} />}

    </div>
    </>
  );
};

export default OrderCard;