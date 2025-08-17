import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeliveryRequest } from '../../types';
import Button from '../shared/Button';
import Spinner from '../shared/Spinner';
import RejectRequestModal from './RejectRequestModal';

interface DeliveryRequestCardProps {
  request: DeliveryRequest;
}

const DeliveryRequestCard: React.FC<DeliveryRequestCardProps> = ({ request }) => {
  const [loading, setLoading] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAccept = () => {
    setLoading(true);
    setTimeout(() => {
      // In a real app, this would update the backend state
      setLoading(false);
      navigate(`/rider/delivery/${request.id}`);
    }, 1000);
  };
  
  const handleRejectConfirm = (reason: string) => {
      console.log(`Rejected delivery ${request.id} for reason: ${reason}`);
      alert('Delivery rejected.');
      setIsRejectModalOpen(false);
      // In a real app, you would remove this card from the view
  };
    
  return (
    <>
    {isRejectModalOpen && <RejectRequestModal onClose={() => setIsRejectModalOpen(false)} onConfirm={handleRejectConfirm} />}
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 space-y-3 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg text-rose-500">Rs. {request.payout.toFixed(2)}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{request.distance} km trip</p>
      </div>

      <div>
        <div className="flex items-start gap-3">
          <div className="text-xs text-rose-500 font-bold mt-1">PICKUP</div>
          <div>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{request.restaurantName}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{request.restaurantAddress}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 mt-2">
          <div className="text-xs text-blue-500 font-bold mt-1">DROPOFF</div>
          <div>
            <p className="font-semibold text-slate-800 dark:text-slate-200">Customer Location</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{request.customerAddress}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
        <Button variant="secondary" onClick={() => setIsRejectModalOpen(true)} className="flex-1" disabled={loading}>
            Reject
        </Button>
        <Button onClick={handleAccept} fullWidth disabled={loading} className="flex-1">
            {loading ? <Spinner /> : 'Accept & Ride'}
        </Button>
      </div>
    </div>
    </>
  );
};

export default DeliveryRequestCard;