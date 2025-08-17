import React, { useState, useMemo } from 'react';
import { ICONS } from '../../constants';
import { Transaction } from '../../types';
import Button from '../shared/Button';
import WithdrawalModal from './WithdrawalModal';
import { useNotification } from '../../context/NotificationContext';
import TransactionDetailsModal from './TransactionDetailsModal';
import BankDetailsModal from './BankDetailsModal';
import CustomSelect from '../shared/CustomSelect';
import { MOCK_TRANSACTIONS } from '../../data/mockData';

const SummaryCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm flex items-start gap-4">
        <div className="p-3 bg-rose-100 dark:bg-rose-900/50 text-rose-500 rounded-lg">{icon}</div>
        <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{value}</p>
        </div>
    </div>
);

const TransactionRow: React.FC<{ transaction: Transaction; onClick: () => void; }> = ({ transaction, onClick }) => {
    const statusColors = {
        Completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
        Pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
        Failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };

    return (
        <tr className="border-b border-slate-200 dark:border-slate-700 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer" onClick={onClick}>
            <td className="p-3 text-sm font-semibold text-slate-700 dark:text-slate-300">{transaction.orderId}</td>
            <td className="p-3 text-sm text-slate-600 dark:text-slate-400 hidden sm:table-cell">{transaction.date}</td>
            <td className="p-3 text-sm font-semibold text-slate-800 dark:text-slate-200">Rs. {transaction.amount.toFixed(2)}</td>
            <td className="p-3 text-sm text-slate-600 dark:text-slate-400 hidden md:table-cell">{transaction.method}</td>
            <td className="p-3 text-sm">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[transaction.status]}`}>{transaction.status}</span>
            </td>
        </tr>
    );
}

const ShopkeeperEarnings: React.FC = () => {
    const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ dateRange: '', method: 'All', status: 'All' });
    const { showNotification } = useNotification();
    const balance = 13320;

    const handleWithdraw = (amount: number, destination: string) => {
        const destinationLabel = destination.charAt(0).toUpperCase() + destination.slice(1);
        showNotification(`Withdrawal of Rs. ${amount.toFixed(2)} to ${destinationLabel} is processing.`, 'success');
    };

    const handleRowClick = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setIsDetailsModalOpen(true);
    };

    const filteredTransactions = useMemo(() => {
        return MOCK_TRANSACTIONS
            .filter(tx => searchTerm ? tx.orderId.toLowerCase().includes(searchTerm.toLowerCase()) : true)
            .filter(tx => filters.method === 'All' ? true : tx.method === filters.method)
            .filter(tx => filters.status === 'All' ? true : tx.status === filters.status);
    }, [searchTerm, filters]);
    
    const methodOptions = [
        { value: 'All', label: 'All Methods' },
        { value: 'Card', label: 'Card' },
        { value: 'COD', label: 'COD' },
        { value: 'Wallet', label: 'Wallet' },
    ];
    
    const statusOptions = [
        { value: 'All', label: 'All Statuses' },
        { value: 'Completed', label: 'Completed' },
        { value: 'Pending', label: 'Pending' },
        { value: 'Failed', label: 'Failed' },
    ];

    const handleExport = () => {
        if (filteredTransactions.length === 0) {
            showNotification("No transactions to export for the current filter.", "warning");
            return;
        }

        const headers = [
            "Order ID", "Date", "Customer Name", "Amount (Rs.)", "Method", "Status",
            "Subtotal", "Platform Fee", "Tax", "Net Payout"
        ];

        const rows = filteredTransactions.map(tx => [
            `"${tx.orderId}"`,
            `"${tx.date}"`,
            `"${tx.customerName.replace(/"/g, '""')}"`,
            tx.amount.toFixed(2),
            `"${tx.method}"`,
            `"${tx.status}"`,
            tx.breakdown.subtotal.toFixed(2),
            tx.breakdown.platformFee.toFixed(2),
            tx.breakdown.tax.toFixed(2),
            tx.breakdown.netPayout.toFixed(2)
        ].join(','));

        const csvContent = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "transaction_report.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showNotification("Transaction report downloaded.", "success");
        }
    };


    return (
        <div className="p-4 space-y-6">
            {isWithdrawalModalOpen && <WithdrawalModal balance={balance} onClose={() => setIsWithdrawalModalOpen(false)} onConfirm={handleWithdraw} />}
            {isDetailsModalOpen && selectedTransaction && <TransactionDetailsModal transaction={selectedTransaction} onClose={() => setIsDetailsModalOpen(false)} />}
            {isSettingsModalOpen && <BankDetailsModal onClose={() => setIsSettingsModalOpen(false)} />}
            
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200">Payments & Earnings</h1>
                <Button variant="success" onClick={() => setIsWithdrawalModalOpen(true)}>
                    <span className="mr-2">{ICONS.wallet}</span>
                    Withdraw Funds
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SummaryCard title="Available for Payout" value={`Rs. ${balance.toFixed(2)}`} icon={ICONS.currencyRupee} />
                <SummaryCard title="Pending Sales (COD)" value="Rs. 540.00" icon={ICONS.receipt} />
                <SummaryCard title="Last Payout" value="Rs. 6,500.00" icon={ICONS.calendar} />
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/40 border-l-4 border-yellow-400 rounded-r-lg">
                <div className="flex items-center gap-3">
                    <span className="text-yellow-500">{ICONS.sparkles}</span>
                    <div>
                        <h4 className="font-bold text-yellow-800 dark:text-yellow-200">AI-Driven Alert</h4>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">Payment for order #S-098 failed. We suggest retrying or contacting the customer.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                    <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200">Transaction History</h3>
                    <div className="flex items-center gap-2">
                         <Button variant="secondary" onClick={() => setIsSettingsModalOpen(true)} className="!p-2">{ICONS.settings}</Button>
                         <Button variant="secondary" onClick={handleExport} className="!p-2">{ICONS.download}</Button>
                    </div>
                </div>
                {/* Filters and Search */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                     <div className="relative md:col-span-2">
                        <input type="search" placeholder="Search by Order ID..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full px-3 py-2 pl-10 border border-slate-300 dark:border-slate-600 rounded-lg" />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{ICONS.search}</span>
                    </div>
                    <CustomSelect
                        id="filter-method"
                        options={methodOptions}
                        value={filters.method}
                        onChange={val => setFilters(f => ({...f, method: val}))}
                        buttonClassName="!py-2.5"
                    />
                     <CustomSelect
                        id="filter-status"
                        options={statusOptions}
                        value={filters.status}
                        onChange={val => setFilters(f => ({...f, status: val}))}
                        buttonClassName="!py-2.5"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-700/50">
                            <tr>
                                <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Order ID</th>
                                <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300 hidden sm:table-cell">Date</th>
                                <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Amount</th>
                                <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300 hidden md:table-cell">Method</th>
                                <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map(tx => <TransactionRow key={tx.id} transaction={tx} onClick={() => handleRowClick(tx)} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ShopkeeperEarnings;