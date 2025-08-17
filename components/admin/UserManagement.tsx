import React, { useState, useMemo } from 'react';
import { User, UserRole } from '../../types';
import { mockUsers } from './mockData';
import Button from '../shared/Button';
import { ICONS } from '../../constants';
import CustomSelect from '../shared/CustomSelect';
import UserModal from './UserModal';
import UserDetailsModal from './UserDetailsModal';

const ITEMS_PER_PAGE = 10;

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ role: 'All', status: 'All' });
    const [currentPage, setCurrentPage] = useState(1);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [viewingUser, setViewingUser] = useState<User | null>(null);

    const filteredUsers = useMemo(() => {
        return users
            .filter(user => 
                searchTerm === '' || 
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter(user => filters.role === 'All' || user.role === filters.role)
            .filter(user => filters.status === 'All' || user.status === filters.status);
    }, [users, searchTerm, filters]);

    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredUsers, currentPage]);

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

    const handleAddUser = () => {
        setEditingUser(null);
        setIsEditModalOpen(true);
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setIsEditModalOpen(true);
    };
    
    const handleViewDetails = (user: User) => {
        setViewingUser(user);
        setIsDetailsModalOpen(true);
    };

    const handleSaveUser = (userToSave: User) => {
        if (editingUser) {
            // Update existing user
            setUsers(prevUsers => prevUsers.map(u => u.id === userToSave.id ? userToSave : u));
        } else {
            // Add new user
            setUsers(prevUsers => [{ ...userToSave, id: `user-${Date.now()}` }, ...prevUsers]);
        }
        setIsEditModalOpen(false);
    };
    
    const roleOptions = [
        { value: 'All', label: 'All Roles' },
        ...Object.values(UserRole).map(role => ({ value: role, label: role }))
    ];
    
    const statusOptions = [
        { value: 'All', label: 'All Statuses' },
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];

    return (
        <div className="flex flex-col h-full">
            {isEditModalOpen && (
                <UserModal 
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleSaveUser}
                    user={editingUser}
                />
            )}
            {isDetailsModalOpen && viewingUser && (
                <UserDetailsModal 
                    isOpen={isDetailsModalOpen}
                    onClose={() => setIsDetailsModalOpen(false)}
                    user={viewingUser}
                />
            )}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 flex-shrink-0">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">User Management</h1>
                <Button onClick={handleAddUser}><span className="mr-2">{ICONS.add}</span>Add User</Button>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow mb-6 flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative md:col-span-1">
                        <input 
                            type="search" 
                            placeholder="Search by name or email..." 
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{ICONS.search}</span>
                    </div>
                     <CustomSelect 
                        id="role-filter"
                        options={roleOptions}
                        value={filters.role}
                        onChange={val => setFilters(f => ({...f, role: val}))}
                        buttonClassName="!py-2.5"
                    />
                    <CustomSelect 
                        id="status-filter"
                        options={statusOptions}
                        value={filters.status}
                        onChange={val => setFilters(f => ({...f, status: val}))}
                        buttonClassName="!py-2.5"
                    />
                </div>
            </div>

            <div className="flex-grow bg-white dark:bg-slate-800 rounded-lg shadow overflow-auto">
                <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                    <thead className="text-xs text-rose-800 uppercase bg-rose-200 dark:bg-rose-800 dark:text-rose-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">User</th>
                            <th scope="col" className="px-6 py-3 hidden md:table-cell">Joined Date</th>
                            <th scope="col" className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.map(user => (
                            <tr key={user.id} className="border-b dark:border-slate-700 odd:bg-white dark:odd:bg-slate-800 even:bg-rose-50 dark:even:bg-rose-900/50 hover:bg-rose-100 dark:hover:bg-rose-800/50">
                                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 hidden md:table-cell">{user.joinedDate}</td>
                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end space-x-2">
                                        <Button variant="secondary" onClick={() => handleViewDetails(user)} className="!p-2" aria-label="View Details">
                                            <span className="h-5 w-5">{ICONS.eye}</span>
                                        </Button>
                                        <Button variant="secondary" onClick={() => handleEditUser(user)} className="!p-2" aria-label="Edit User">
                                            <span className="h-5 w-5">{ICONS.edit}</span>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="flex-shrink-0 flex justify-between items-center pt-4">
                <span className="text-sm text-slate-700 dark:text-slate-300">
                    Showing {filteredUsers.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length} users
                </span>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</Button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <Button variant="secondary" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</Button>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;