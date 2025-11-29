import { useState, useEffect, useMemo } from 'react';
import {
    Search, Plus, Edit, CheckCircle2, UserX,
    ArrowUpDown, ChevronUp, ChevronDown
} from 'lucide-react';
import { GlassCard } from '../../common/GlassCard';
import { GlassButton } from '../../common/GlassButton';
import { GlassInput } from '../../common/GlassInput';
import { Modal } from '../../common/Modal';
import { StatusBadge } from '../../common/StatusBadge';
import { SocietyMember, User } from '../../../types';
import { authService } from '../../services/authService';

interface AdminMembersTabProps {
    user: User;
}

type SortField = 'houseNumber' | 'ownerName' | 'email' | 'phone';
type SortDirection = 'asc' | 'desc';

/**
 * Admin Members Tab Component
 * Manage society members - add, edit, view member details
 */
export function AdminMembersTab({ user }: AdminMembersTabProps) {
    const [members, setMembers] = useState<SocietyMember[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<SortField>('houseNumber');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [showAddMember, setShowAddMember] = useState(false);
    const [showEditMember, setShowEditMember] = useState(false);
    const [selectedMember, setSelectedMember] = useState<SocietyMember | null>(null);

    // Form states
    const [memberHouse, setMemberHouse] = useState('');
    const [memberName, setMemberName] = useState('');
    const [memberEmail, setMemberEmail] = useState('');
    const [memberPhone, setMemberPhone] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        loadMembers();
    }, []);

    const loadMembers = () => {
        if (user.societyId) {
            const membersData = authService.getMembersBySociety(user.societyId);
            setMembers(membersData);
        }
    };

    const handleAddMember = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!user.societyId) {
            setError('Society ID not found');
            return;
        }

        try {
            authService.addMember(
                user.societyId,
                memberHouse,
                memberName,
                memberEmail,
                memberPhone
            );
            setSuccess(`Member "${memberName}" added successfully!`);
            setMemberHouse('');
            setMemberName('');
            setMemberEmail('');
            setMemberPhone('');
            setShowAddMember(false);
            loadMembers();
        } catch (err: any) {
            setError(err.message || 'Failed to add member');
        }
    };

    const handleEditMember = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMember) return;

        try {
            authService.updateMember(selectedMember.id, {
                houseNumber: memberHouse,
                ownerName: memberName,
                email: memberEmail,
                phone: memberPhone,
            });
            setSuccess('Member updated successfully!');
            setShowEditMember(false);
            setSelectedMember(null);
            loadMembers();
        } catch (err: any) {
            setError(err.message || 'Failed to update member');
        }
    };

    const openEditMember = (member: SocietyMember) => {
        setSelectedMember(member);
        setMemberHouse(member.houseNumber);
        setMemberName(member.ownerName);
        setMemberEmail(member.email);
        setMemberPhone(member.phone);
        setShowEditMember(true);
    };

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) return <ArrowUpDown className="w-4 h-4 opacity-30" />;
        return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
    };

    // Filtered and sorted members
    const filteredMembers = useMemo(() => {
        let filtered = [...members];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(m =>
                m.houseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.phone.includes(searchTerm)
            );
        }

        // Sort
        filtered.sort((a, b) => {
            let aVal: any = a[sortField];
            let bVal: any = b[sortField];

            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }

            if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [members, searchTerm, sortField, sortDirection]);

    const stats = {
        total: members.length,
        withAccounts: members.filter(m => m.hasAccount).length,
        withoutAccounts: members.filter(m => !m.hasAccount).length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl text-slate-900 dark:text-white mb-2">
                        Society Members
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Manage and view all society members
                    </p>
                </div>
                <GlassButton
                    variant="primary"
                    onClick={() => setShowAddMember(true)}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Member
                </GlassButton>
            </div>

            {/* Alerts */}
            {error && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400">
                    <span>{error}</span>
                    <button onClick={() => setError('')} className="ml-auto">×</button>
                </div>
            )}

            {success && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400">
                    <span>{success}</span>
                    <button onClick={() => setSuccess('')} className="ml-auto">×</button>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <GlassCard className="p-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Members</p>
                    <p className="text-2xl text-slate-900 dark:text-white">{stats.total}</p>
                </GlassCard>
                <GlassCard className="p-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">With Accounts</p>
                    <p className="text-2xl text-slate-900 dark:text-white">{stats.withAccounts}</p>
                </GlassCard>
                <GlassCard className="p-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Without Accounts</p>
                    <p className="text-2xl text-slate-900 dark:text-white">{stats.withoutAccounts}</p>
                </GlassCard>
            </div>

            {/* Search */}
            <GlassCard className="p-4 md:p-6">
                <GlassInput
                    label="Search Members"
                    placeholder="Search by name, house, email or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={<Search className='w-4 h-4' />}
                />
            </GlassCard>

            {/* Members Table */}
            <GlassCard className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg text-slate-900 dark:text-white">
                        Members List
                    </h2>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        {filteredMembers.length} members
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                                <th className="text-left p-3 text-sm text-slate-600 dark:text-slate-400">
                                    <button
                                        onClick={() => handleSort('houseNumber')}
                                        className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white"
                                    >
                                        House #
                                        <SortIcon field="houseNumber" />
                                    </button>
                                </th>
                                <th className="text-left p-3 text-sm text-slate-600 dark:text-slate-400">
                                    <button
                                        onClick={() => handleSort('ownerName')}
                                        className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white"
                                    >
                                        Owner Name
                                        <SortIcon field="ownerName" />
                                    </button>
                                </th>
                                <th className="text-left p-3 text-sm text-slate-600 dark:text-slate-400">
                                    <button
                                        onClick={() => handleSort('email')}
                                        className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white"
                                    >
                                        Email
                                        <SortIcon field="email" />
                                    </button>
                                </th>
                                <th className="text-left p-3 text-sm text-slate-600 dark:text-slate-400">
                                    <button
                                        onClick={() => handleSort('phone')}
                                        className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white"
                                    >
                                        Phone
                                        <SortIcon field="phone" />
                                    </button>
                                </th>
                                <th className="text-left p-3 text-sm text-slate-600 dark:text-slate-400">Status</th>
                                <th className="text-left p-3 text-sm text-slate-600 dark:text-slate-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMembers.map((member) => (
                                <tr
                                    key={member.id}
                                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
                                >
                                    <td className="p-3 text-slate-900 dark:text-white">{member.houseNumber}</td>
                                    <td className="p-3 text-slate-900 dark:text-white">{member.ownerName}</td>
                                    <td className="p-3 text-slate-600 dark:text-slate-400">{member.email}</td>
                                    <td className="p-3 text-slate-600 dark:text-slate-400">{member.phone}</td>
                                    <td className="p-3">
                                        <StatusBadge variant={member.hasAccount ? 'success' : 'warning'} size="sm">
                                            {member.hasAccount ? (
                                                <div className="flex items-center gap-1">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    Active
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1">
                                                    <UserX className="w-3 h-3" />
                                                    No Account
                                                </div>
                                            )}
                                        </StatusBadge>
                                    </td>
                                    <td className="p-3">
                                        <GlassButton
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openEditMember(member)}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </GlassButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredMembers.length === 0 && (
                        <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                            No members found
                        </div>
                    )}
                </div>
            </GlassCard>

            {/* Add Member Modal */}
            {showAddMember && (
                <Modal
                    isOpen={showAddMember}
                    onClose={() => {
                        setShowAddMember(false);
                        setMemberHouse('');
                        setMemberName('');
                        setMemberEmail('');
                        setMemberPhone('');
                    }}
                    title="Add New Member"
                >
                    <form onSubmit={handleAddMember} className="space-y-4">
                        <GlassInput
                            label="House/Unit Number"
                            value={memberHouse}
                            onChange={(e) => setMemberHouse(e.target.value)}
                            required
                            placeholder="e.g., A-101"
                        />

                        <GlassInput
                            label="Owner Name"
                            value={memberName}
                            onChange={(e) => setMemberName(e.target.value)}
                            required
                            placeholder="Full name"
                        />

                        <GlassInput
                            label="Email"
                            type="email"
                            value={memberEmail}
                            onChange={(e) => setMemberEmail(e.target.value)}
                            required
                            placeholder="email@example.com"
                        />

                        <GlassInput
                            label="Phone"
                            type="tel"
                            value={memberPhone}
                            onChange={(e) => setMemberPhone(e.target.value)}
                            required
                            placeholder="10-digit number"
                        />

                        <div className="flex gap-2 pt-4">
                            <GlassButton type="submit" variant="primary" className="flex-1">
                                Add Member
                            </GlassButton>
                            <GlassButton
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => setShowAddMember(false)}
                            >
                                Cancel
                            </GlassButton>
                        </div>
                    </form>
                </Modal>
            )}

            {/* Edit Member Modal */}
            {showEditMember && selectedMember && (
                <Modal
                    isOpen={showEditMember}
                    onClose={() => {
                        setShowEditMember(false);
                        setSelectedMember(null);
                    }}
                    title="Edit Member"
                >
                    <form onSubmit={handleEditMember} className="space-y-4">
                        <GlassInput
                            label="House/Unit Number"
                            value={memberHouse}
                            onChange={(e) => setMemberHouse(e.target.value)}
                            required
                        />

                        <GlassInput
                            label="Owner Name"
                            value={memberName}
                            onChange={(e) => setMemberName(e.target.value)}
                            required
                        />

                        <GlassInput
                            label="Email"
                            type="email"
                            value={memberEmail}
                            onChange={(e) => setMemberEmail(e.target.value)}
                            required
                        />

                        <GlassInput
                            label="Phone"
                            type="tel"
                            value={memberPhone}
                            onChange={(e) => setMemberPhone(e.target.value)}
                            required
                        />

                        <div className="flex gap-2 pt-4">
                            <GlassButton type="submit" variant="primary" className="flex-1">
                                Save Changes
                            </GlassButton>
                            <GlassButton
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => {
                                    setShowEditMember(false);
                                    setSelectedMember(null);
                                }}
                            >
                                Cancel
                            </GlassButton>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
}
