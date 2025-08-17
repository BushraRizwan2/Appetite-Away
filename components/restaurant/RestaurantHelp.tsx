

import React from 'react';
import Accordion from '../shared/Accordion';

const RestaurantHelp: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Help & Support</h2>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Contact Support</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
                For urgent issues, please contact our vendor support team.
            </p>
            <div className="mt-3 space-y-2">
                <p className="text-sm"><strong>Email:</strong> <a href="mailto:vendorsupport@appetite.com" className="text-rose-500 hover:underline">vendorsupport@appetite.com</a></p>
                <p className="text-sm"><strong>Phone:</strong> <a href="tel:+92123456789" className="text-rose-500 hover:underline">+92-123-456789</a> (9am - 9pm)</p>
            </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Frequently Asked Questions</h3>
            <div className="space-y-2">
                <Accordion title="How do I update my menu?">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        You can manage your menu items and categories from the "Menu" tab in the app. You can add new items, edit existing ones, and temporarily mark items as "Out of Stock". For price changes, please note they are subject to approval.
                    </p>
                </Accordion>
                <Accordion title="How do I see my earnings?">
                     <p className="text-sm text-slate-600 dark:text-slate-400">
                        Navigate to the "Business" tab and select "Earnings". Here you can see your total revenue, app charges, and net payouts. A history of your weekly payouts is also available.
                    </p>
                </Accordion>
                 <Accordion title="What if I need to reject an order?">
                     <p className="text-sm text-slate-600 dark:text-slate-400">
                        If you are unable to fulfill an incoming order, click the "Reject" button. You will be prompted to select a reason (e.g., "Too busy", "Item out of stock"). This helps us inform the customer appropriately.
                    </p>
                </Accordion>
                 <Accordion title="How can I change my bank account details?">
                     <p className="text-sm text-slate-600 dark:text-slate-400">
                        To change your bank account details for payouts, go to the "Profile" tab. You can edit your financial information there. Please ensure the details are correct to avoid payout delays. Changes may take a few days to verify.
                    </p>
                </Accordion>
            </div>
        </div>
    </div>
  );
};

export default RestaurantHelp;