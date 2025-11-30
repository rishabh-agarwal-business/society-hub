import { useState, useEffect } from 'react';
import {
    Plus, Trash2, Users, Vote, BarChart3, Trophy, CheckCircle2,
    Search, Filter, Calendar, XCircle
} from 'lucide-react';
import { GlassCard } from '../../common/GlassCard';
import { GlassButton } from '../../common/GlassButton';
import { GlassInput } from '../../common/GlassInput';
import { GlassSelect } from '../../common/GlassSelect';
import { Modal } from '../../common/Modal';
import { StatusBadge } from '../../common/StatusBadge';

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { User } from '../../../types';

interface AdminElectionsTabProps {
    user: User;
}

interface Candidate {
    id: string;
    name: string;
    position: string;
    description: string;
    imageUrl?: string;
    votes: number;
}

interface Election {
    id: string;
    title: string;
    positions: string[];
    startDate: string;
    endDate: string;
    status: 'draft' | 'active' | 'completed';
    totalVoters: number;
    votedCount: number;
    resultsPublished: boolean;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

/**
 * Admin Elections Tab Component
 * Manage elections, candidates, view results, and declare winners
 */
export function AdminElectionsTab({ user }: AdminElectionsTabProps) {
    const [elections, setElections] = useState<Election[]>([]);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [showCreateElection, setShowCreateElection] = useState(false);
    const [showAddCandidate, setShowAddCandidate] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [selectedElection, setSelectedElection] = useState<Election | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    // Election form states
    const [electionTitle, setElectionTitle] = useState('');
    const [electionPositions, setElectionPositions] = useState<string[]>(['President', 'Vice President', 'Secretary', 'Treasurer']);
    const [newPosition, setNewPosition] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Candidate form states
    const [candidateName, setCandidateName] = useState('');
    const [candidatePosition, setCandidatePosition] = useState('');
    const [candidateDescription, setCandidateDescription] = useState('');
    const [candidateImage, setCandidateImage] = useState('');

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        loadElections();
        loadCandidates();
    }, []);

    const loadElections = () => {
        // Mock data - replace with actual API call
        const mockElections: Election[] = [
            {
                id: '1',
                title: 'Society Committee Election 2025',
                positions: ['President', 'Vice President', 'Secretary', 'Treasurer'],
                startDate: '2025-12-01',
                endDate: '2025-12-15',
                status: 'active',
                totalVoters: 150,
                votedCount: 87,
                resultsPublished: false
            },
            {
                id: '2',
                title: 'Annual Board Election 2024',
                positions: ['President', 'Vice President', 'Secretary'],
                startDate: '2024-12-01',
                endDate: '2024-12-15',
                status: 'completed',
                totalVoters: 140,
                votedCount: 128,
                resultsPublished: true
            },
            {
                id: '3',
                title: 'Special Committee Election 2025',
                positions: ['Sports Secretary', 'Cultural Secretary'],
                startDate: '2025-11-20',
                endDate: '2025-11-25',
                status: 'draft',
                totalVoters: 150,
                votedCount: 0,
                resultsPublished: false
            }
        ];
        setElections(mockElections);
        setSelectedElection(mockElections[0]);
    };

    const loadCandidates = () => {
        // Mock data - replace with actual API call
        const mockCandidates: Candidate[] = [
            { id: '1', name: 'John Smith', position: 'President', description: 'Experienced community leader', votes: 45 },
            { id: '2', name: 'Sarah Johnson', position: 'President', description: 'Building better communities', votes: 42 },
            { id: '3', name: 'Michael Brown', position: 'Vice President', description: 'Dedicated to service', votes: 38 },
            { id: '4', name: 'Emily Davis', position: 'Vice President', description: 'Voice of the people', votes: 49 },
            { id: '5', name: 'David Wilson', position: 'Secretary', description: 'Organized and efficient', votes: 55 },
            { id: '6', name: 'Lisa Anderson', position: 'Secretary', description: 'Transparent communication', votes: 32 },
            { id: '7', name: 'James Taylor', position: 'Treasurer', description: 'Financial expertise', votes: 51 },
            { id: '8', name: 'Jennifer Martin', position: 'Treasurer', description: 'Responsible management', votes: 36 },
        ];
        setCandidates(mockCandidates);
    };

    const handleCreateElection = (e: React.FormEvent) => {
        e.preventDefault();

        if (!electionTitle || !startDate || !endDate || electionPositions.length === 0) {
            setError('Please fill in all required fields');
            return;
        }

        const newElection: Election = {
            id: Date.now().toString(),
            title: electionTitle,
            positions: electionPositions,
            startDate,
            endDate,
            status: 'draft',
            totalVoters: 150, // Get from society members
            votedCount: 0,
            resultsPublished: false
        };

        setElections([newElection, ...elections]);
        setSelectedElection(newElection);
        setSuccess('Election created successfully!');
        setShowCreateElection(false);
        resetElectionForm();
    };

    const handleAddCandidate = (e: React.FormEvent) => {
        e.preventDefault();

        if (!candidateName || !candidatePosition || !candidateDescription) {
            setError('Please fill in all required fields');
            return;
        }

        const newCandidate: Candidate = {
            id: Date.now().toString(),
            name: candidateName,
            position: candidatePosition,
            description: candidateDescription,
            imageUrl: candidateImage,
            votes: 0
        };

        setCandidates([...candidates, newCandidate]);
        setSuccess('Candidate added successfully!');
        setShowAddCandidate(false);
        resetCandidateForm();
    };

    const handleDeleteCandidate = (id: string) => {
        if (window.confirm('Are you sure you want to remove this candidate?')) {
            setCandidates(candidates.filter(c => c.id !== id));
            setSuccess('Candidate removed successfully');
        }
    };

    const handlePublishResults = () => {
        if (!selectedElection) return;

        if (window.confirm('Are you sure you want to publish the election results? This action cannot be undone.')) {
            const updatedElections = elections.map(e =>
                e.id === selectedElection.id
                    ? { ...e, resultsPublished: true, status: 'completed' as const }
                    : e
            );
            setElections(updatedElections);
            setSelectedElection({ ...selectedElection, resultsPublished: true, status: 'completed' });
            setSuccess('Election results published successfully!');
        }
    };

    const handleActivateElection = (electionId: string) => {
        const updatedElections = elections.map(e =>
            e.id === electionId ? { ...e, status: 'active' as const } : e
        );
        setElections(updatedElections);
        setSuccess('Election activated successfully!');
    };

    const resetElectionForm = () => {
        setElectionTitle('');
        setElectionPositions(['President', 'Vice President', 'Secretary', 'Treasurer']);
        setStartDate('');
        setEndDate('');
        setError('');
    };

    const resetCandidateForm = () => {
        setCandidateName('');
        setCandidatePosition('');
        setCandidateDescription('');
        setCandidateImage('');
        setError('');
    };

    const addPosition = () => {
        if (newPosition.trim() && !electionPositions.includes(newPosition.trim())) {
            setElectionPositions([...electionPositions, newPosition.trim()]);
            setNewPosition('');
        }
    };

    const removePosition = (position: string) => {
        setElectionPositions(electionPositions.filter(p => p !== position));
    };

    const getCandidatesByPosition = (position: string) => {
        return candidates.filter(c => c.position === position);
    };

    const getWinnerByPosition = (position: string) => {
        const positionCandidates = getCandidatesByPosition(position);
        if (positionCandidates.length === 0) return null;
        return positionCandidates.reduce((prev, current) =>
            current.votes > prev.votes ? current : prev
        );
    };

    const getChartDataByPosition = (position: string) => {
        return getCandidatesByPosition(position).map(c => ({
            name: c.name,
            votes: c.votes
        }));
    };

    const filteredElections = elections.filter(election => {
        const matchesSearch = election.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || election.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="mb-2">Elections Management</h1>
                    <p>Manage society elections and view results</p>
                </div>
                <GlassButton onClick={() => setShowCreateElection(true)}>
                    <Plus className="h-5 w-5 mr-2" />
                    Create Election
                </GlassButton>
            </div>

            {/* Success/Error Messages */}
            {success && (
                <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400">
                    {success}
                </div>
            )}
            {error && (
                <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
                    {error}
                </div>
            )}

            {/* Filters */}
            <GlassCard className='p-4'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
                        <GlassInput
                            placeholder="Search elections..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <GlassSelect
                        icon={Calendar}
                        value={filterStatus}
                        onValueChange={(value) => setFilterStatus(value)}
                        options={[
                            { value: 'all', label: 'All Status' },
                            { value: 'draft', label: 'Draft' },
                            { value: 'active', label: 'Active' },
                            { value: 'completed', label: 'Completed' }
                        ]}
                    />
                </div>
            </GlassCard>

            {/* Elections List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredElections.map((election) => (
                    <GlassCard
                        key={election.id}
                        className={`cursor-pointer p-4 transition-all ${selectedElection?.id === election.id ? 'ring-2 ring-blue-500' : ''
                            }`}
                        onClick={() => setSelectedElection(election)}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className=" mb-1">{election.title}</h3>
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(election.startDate).toLocaleDateString()} - {new Date(election.endDate).toLocaleDateString()}
                                </div>
                            </div>
                            <StatusBadge variant={election.status === 'active' ? 'warning' : election.status === 'completed' ? 'success' : 'warning'}>
                                {election.status}
                            </StatusBadge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-white/5 p-3 rounded-lg">
                                <div className="text-sm mb-1">Total Voters</div>
                                <div className="text-xl">{election.totalVoters}</div>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg">
                                <div className="text-sm mb-1">Voted</div>
                                <div className="text-xl">{election.votedCount}</div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                                <span>Participation</span>
                                <span>{Math.round((election.votedCount / election.totalVoters) * 100)}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-linear-to-r from-blue-500 to-purple-500"
                                    style={{ width: `${(election.votedCount / election.totalVoters) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {election.positions.map((position, idx) => (
                                <span key={idx} className="px-2 py-1 bg-white/10 rounded text-sm">
                                    {position}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            {election.status === 'draft' && (
                                <GlassButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleActivateElection(election.id);
                                    }}
                                    className="flex-1"
                                >
                                    Activate Election
                                </GlassButton>
                            )}
                            {election.status === 'active' && !election.resultsPublished && (
                                <GlassButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowResults(true);
                                    }}
                                    className="flex-1"
                                >
                                    <BarChart3 className="h-4 w-4 mr-2" />
                                    View Results
                                </GlassButton>
                            )}
                            {election.resultsPublished && (
                                <GlassButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowResults(true);
                                    }}
                                    className="flex-1"
                                >
                                    <Trophy className="h-4 w-4 mr-2" />
                                    View Results
                                </GlassButton>
                            )}
                        </div>
                    </GlassCard>
                ))}
            </div>

            {/* Candidates Management */}
            {selectedElection && (
                <GlassCard className='p-4'>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="mb-1">Candidates - {selectedElection.title}</h2>
                            <p>Manage candidates for each position</p>
                        </div>
                        <GlassButton onClick={() => setShowAddCandidate(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Candidate
                        </GlassButton>
                    </div>

                    {selectedElection.positions.map((position) => (
                        <div key={position} className="mb-6 last:mb-0">
                            <h3 className="mb-3 flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                {position}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {getCandidatesByPosition(position).map((candidate) => (
                                    <div key={candidate.id} className="bg-white/5 p-4 rounded-lg border border-white/10">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <h4 className="mb-1">{candidate.name}</h4>
                                                <p className="text-sm line-clamp-2">{candidate.description}</p>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteCandidate(candidate.id)}
                                                className="text-red-400 hover:text-red-300 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                        {selectedElection.resultsPublished && (
                                            <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                                                <Vote className="h-4 w-4 text-blue-400" />
                                                <span>{candidate.votes} votes</span>
                                                {getWinnerByPosition(position)?.id === candidate.id && (
                                                    <Trophy className="h-4 w-4 text-yellow-400 ml-auto" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {getCandidatesByPosition(position).length === 0 && (
                                    <div className="col-span-full text-center py-8">
                                        No candidates added yet
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </GlassCard>
            )}

            {/* Create Election Modal */}
            <Modal
                isOpen={showCreateElection}
                onClose={() => {
                    setShowCreateElection(false);
                    resetElectionForm();
                }}
                title="Create New Election"
            >
                <form onSubmit={handleCreateElection} className="space-y-4">
                    <div>
                        <label className="block mb-2">Election Title</label>
                        <GlassInput
                            value={electionTitle}
                            onChange={(e) => setElectionTitle(e.target.value)}
                            placeholder="e.g., Society Committee Election 2025"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2">Start Date</label>
                            <GlassInput
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2">End Date</label>
                            <GlassInput
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2">Positions</label>
                        <div className="space-y-2 mb-3">
                            {electionPositions.map((position, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <span className="flex-1 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                                        {position}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => removePosition(position)}
                                        className="text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        <XCircle className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <GlassInput
                                value={newPosition}
                                onChange={(e) => setNewPosition(e.target.value)}
                                placeholder="Add new position"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addPosition();
                                    }
                                }}
                            />
                            <GlassButton type="button" onClick={addPosition}>
                                Add
                            </GlassButton>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <GlassButton type="submit" className="flex-1">
                            Create Election
                        </GlassButton>
                        <GlassButton
                            type="button"
                            onClick={() => {
                                setShowCreateElection(false);
                                resetElectionForm();
                            }}
                            className="flex-1"
                        >
                            Cancel
                        </GlassButton>
                    </div>
                </form>
            </Modal>

            {/* Add Candidate Modal */}
            <Modal
                isOpen={showAddCandidate}
                onClose={() => {
                    setShowAddCandidate(false);
                    resetCandidateForm();
                }}
                title="Add Candidate"
            >
                <form onSubmit={handleAddCandidate} className="space-y-4">
                    <div>
                        <label className="block mb-2">Candidate Name</label>
                        <GlassInput
                            value={candidateName}
                            onChange={(e) => setCandidateName(e.target.value)}
                            placeholder="Enter candidate name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2">Position</label>
                        <GlassSelect
                            icon={Calendar}
                            value={candidatePosition}
                            onValueChange={(value) => setCandidatePosition(value)}
                            required
                            placeholder=''
                            options={[
                                { value: 'all', label: 'Select Position' },
                                ...(selectedElection?.positions.map((position) => ({
                                    value: position,
                                    label: position
                                })) || [])
                            ]}
                        />
                    </div>

                    <div>
                        <label className="block mb-2">Description</label>
                        <GlassInput
                            value={candidateDescription}
                            onChange={(e) => setCandidateDescription(e.target.value)}
                            placeholder="Brief description of the candidate"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2">Image URL (Optional)</label>
                        <GlassInput
                            value={candidateImage}
                            onChange={(e) => setCandidateImage(e.target.value)}
                            placeholder="https://..."
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <GlassButton type="submit" className="flex-1">
                            Add Candidate
                        </GlassButton>
                        <GlassButton
                            type="button"
                            onClick={() => {
                                setShowAddCandidate(false);
                                resetCandidateForm();
                            }}
                            className="flex-1"
                        >
                            Cancel
                        </GlassButton>
                    </div>
                </form>
            </Modal>

            {/* Results Modal */}
            <Modal
                isOpen={showResults}
                onClose={() => setShowResults(false)}
                title="Election Results"
                size="xl"
            >
                {selectedElection && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className=" mb-1">{selectedElection.title}</h3>
                                <p>
                                    {selectedElection.votedCount} out of {selectedElection.totalVoters} members voted
                                </p>
                            </div>
                            {!selectedElection.resultsPublished && (
                                <GlassButton onClick={handlePublishResults}>
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    Publish Results
                                </GlassButton>
                            )}
                        </div>

                        {selectedElection.positions.map((position) => {
                            const positionCandidates = getCandidatesByPosition(position);
                            const winner = getWinnerByPosition(position);
                            const chartData = getChartDataByPosition(position);

                            return (
                                <div key={position} className="bg-white/5 p-6 rounded-lg border border-white/10">
                                    <h4 className=" mb-4 flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        {position}
                                    </h4>

                                    {positionCandidates.length > 0 ? (
                                        <>
                                            {/* Winner Card */}
                                            {winner && (
                                                <div className="bg-linear-to-r from-yellow-500/20 to-orange-500/20 p-4 rounded-lg border border-yellow-500/30 mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <Trophy className="h-8 w-8 text-yellow-400" />
                                                        <div className="flex-1">
                                                            <div className="text-sm mb-1">Winner</div>
                                                            <div>{winner.name}</div>
                                                            <div className="text-sm">{winner.votes} votes</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Bar Chart */}
                                            <div className="mb-4">
                                                <ResponsiveContainer width="100%" height={200}>
                                                    <BarChart data={chartData}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                                        <XAxis
                                                            dataKey="name"
                                                            stroke="rgba(255,255,255,0.6)"
                                                            tick={{ fill: 'rgba(255,255,255,0.6)' }}
                                                        />
                                                        <YAxis
                                                            stroke="rgba(255,255,255,0.6)"
                                                            tick={{ fill: 'rgba(255,255,255,0.6)' }}
                                                        />
                                                        <Tooltip
                                                            contentStyle={{
                                                                backgroundColor: 'rgba(0,0,0,0.8)',
                                                                border: '1px solid rgba(255,255,255,0.2)',
                                                                borderRadius: '8px'
                                                            }}
                                                        />
                                                        <Bar dataKey="votes" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>

                                            {/* Candidates List */}
                                            <div className="space-y-2">
                                                {positionCandidates
                                                    .sort((a, b) => b.votes - a.votes)
                                                    .map((candidate, idx) => (
                                                        <div key={candidate.id} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                                                            <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full">
                                                                {idx + 1}
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="">{candidate.name}</div>
                                                                <div className="text-sm">{candidate.description}</div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="">{candidate.votes}</div>
                                                                <div className="text-sm">votes</div>
                                                            </div>
                                                            {idx === 0 && <Trophy className="h-5 w-5 text-yellow-400" />}
                                                        </div>
                                                    ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center py-8">
                                            No candidates for this position
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </Modal>
        </div>
    );
}