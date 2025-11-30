import { useState, useEffect } from 'react';
import {
    Vote, CheckCircle2, Trophy, Calendar, Users, AlertCircle,
    BarChart3
} from 'lucide-react';
import { GlassCard } from '../../common/GlassCard';
import { GlassButton } from '../../common/GlassButton';
import { Modal } from '../../common/Modal';
import { StatusBadge } from '../../common/StatusBadge';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer
} from 'recharts';
import { User } from '../../../types';

interface ElectionsTabProps {
    user: User;
}

interface Candidate {
    id: string;
    name: string;
    position: string;
    description: string;
    imageUrl?: string;
    votes?: number;
}

interface Election {
    id: string;
    title: string;
    positions: string[];
    startDate: string;
    endDate: string;
    status: 'upcoming' | 'active' | 'completed';
    hasVoted: boolean;
    resultsPublished: boolean;
    totalVoters: number;
    votedCount: number;
}

/**
 * Member Elections Tab Component
 * Vote in elections and view results
 */
export function ElectionsTab({ user }: ElectionsTabProps) {
    const [elections, setElections] = useState<Election[]>([]);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [showVoteModal, setShowVoteModal] = useState(false);
    const [showResultsModal, setShowResultsModal] = useState(false);
    const [selectedElection, setSelectedElection] = useState<Election | null>(null);
    const [selectedVotes, setSelectedVotes] = useState<Record<string, string>>({});
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
                hasVoted: false,
                resultsPublished: false,
                totalVoters: 150,
                votedCount: 87
            },
            {
                id: '4',
                title: 'Society Committee Election 2025',
                positions: ['President', 'Vice President', 'Secretary', 'Treasurer'],
                startDate: '2025-12-01',
                endDate: '2025-12-15',
                status: 'active',
                hasVoted: false,
                resultsPublished: false,
                totalVoters: 150,
                votedCount: 87
            },
            {
                id: '3',
                title: 'Special Committee Election 2026',
                positions: ['Sports Secretary', 'Cultural Secretary'],
                startDate: '2026-01-10',
                endDate: '2026-01-20',
                status: 'upcoming',
                hasVoted: false,
                resultsPublished: false,
                totalVoters: 150,
                votedCount: 0
            },
            {
                id: '2',
                title: 'Annual Board Election 2024',
                positions: ['President', 'Vice President', 'Secretary'],
                startDate: '2024-12-01',
                endDate: '2024-12-15',
                status: 'completed',
                hasVoted: true,
                resultsPublished: true,
                totalVoters: 140,
                votedCount: 128
            }
        ];
        setElections(mockElections);
    };

    const loadCandidates = () => {
        // Mock data - replace with actual API call
        const mockCandidates: Candidate[] = [
            { id: '1', name: 'John Smith', position: 'President', description: 'Experienced community leader with 10 years of service', votes: 45 },
            { id: '2', name: 'Sarah Johnson', position: 'President', description: 'Building better communities together', votes: 42 },
            { id: '3', name: 'Michael Brown', position: 'Vice President', description: 'Dedicated to serving our community', votes: 38 },
            { id: '4', name: 'Emily Davis', position: 'Vice President', description: 'Voice of the people, for the people', votes: 49 },
            { id: '5', name: 'David Wilson', position: 'Secretary', description: 'Organized, efficient, and transparent', votes: 55 },
            { id: '6', name: 'Lisa Anderson', position: 'Secretary', description: 'Commitment to clear communication', votes: 32 },
            { id: '7', name: 'James Taylor', position: 'Treasurer', description: 'Financial expertise you can trust', votes: 51 },
            { id: '8', name: 'Jennifer Martin', position: 'Treasurer', description: 'Responsible financial management', votes: 36 },
        ];
        setCandidates(mockCandidates);
    };

    const handleVoteClick = (election: Election) => {
        if (election.hasVoted) {
            setError('You have already voted in this election');
            return;
        }
        setSelectedElection(election);
        setSelectedVotes({});
        setShowVoteModal(true);
    };

    const handleCandidateSelect = (position: string, candidateId: string) => {
        setSelectedVotes(prev => ({
            ...prev,
            [position]: candidateId
        }));
    };

    const handleSubmitVote = () => {
        if (!selectedElection) return;

        // Check if all positions have been voted for
        const allPositionsVoted = selectedElection.positions.every(
            position => selectedVotes[position]
        );

        if (!allPositionsVoted) {
            setError('Please vote for all positions before submitting');
            return;
        }

        // Submit vote - replace with actual API call
        console.log('Submitting votes:', selectedVotes);

        // Update election as voted
        setElections(elections.map(e =>
            e.id === selectedElection.id ? { ...e, hasVoted: true } : e
        ));

        setSuccess('Your vote has been recorded successfully!');
        setShowVoteModal(false);
        setSelectedVotes({});
    };

    const handleViewResults = (election: Election) => {
        setSelectedElection(election);
        setShowResultsModal(true);
    };

    const getCandidatesByPosition = (position: string) => {
        return candidates.filter(c => c.position === position);
    };

    const getWinnerByPosition = (position: string) => {
        const positionCandidates = getCandidatesByPosition(position);
        if (positionCandidates.length === 0) return null;
        return positionCandidates.reduce((prev, current) =>
            (current.votes || 0) > (prev.votes || 0) ? current : prev
        );
    };

    const getChartDataByPosition = (position: string) => {
        return getCandidatesByPosition(position).map(c => ({
            name: c.name,
            votes: c.votes || 0
        }));
    };

    const activeElections = elections.filter(e => e.status === 'active');
    const completedElections = elections.filter(e => e.status === 'completed');
    const upcomingElections = elections.filter(e => e.status === 'upcoming');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl text-slate-900 dark:text-white mb-2">Elections</h1>
                <p className=" /60">Cast your vote and view election results</p>
            </div>

            {/* Success/Error Messages */}
            {success && (
                <div className="p-4 bg-green-500/10 dark:bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5" />
                    {success}
                </div>
            )}
            {error && (
                <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 flex items-center gap-3">
                    <AlertCircle className="h-5 w-5" />
                    {error}
                </div>
            )}

            {/* Active Elections */}
            {activeElections.length > 0 && (
                <div>
                    <h2 className="text-xl md:text-3xl text-slate-900 dark:text-white mb-2">Active Elections</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {activeElections.map((election) => (
                            <GlassCard key={election.id} className='p-4'>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="font-semibold mb-2">{election.title}</h3>
                                        <div className="flex items-center gap-2 text-sm  /60 mb-3">
                                            <Calendar className="h-4 w-4" />
                                            Ends on {new Date(election.endDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <StatusBadge variant={election.hasVoted ? 'success' : 'warning'}>
                                        {election.hasVoted ? 'Voted' : 'Not Voted'}
                                    </StatusBadge>
                                </div>

                                <div className="mb-4">
                                    <div className="text-sm mb-2">Participation Rate</div>
                                    <div className="flex justify-between text-sm  /80 mb-2">
                                        <span>{election.votedCount} voted</span>
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
                                        <span key={idx} className="px-2 py-1 bg-white/10 rounded  /80 text-sm">
                                            {position}
                                        </span>
                                    ))}
                                </div>

                                {election.hasVoted ? (
                                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5" />
                                        <span>You have already voted in this election</span>
                                    </div>
                                ) : (
                                    <GlassButton
                                        onClick={() => handleVoteClick(election)}
                                        className="w-full"
                                    >
                                        <Vote className="h-4 w-4 mr-2" />
                                        Cast Your Vote
                                    </GlassButton>
                                )}
                            </GlassCard>
                        ))}
                    </div>
                </div>
            )}

            {/* Upcoming Elections */}
            {/* {upcomingElections.length > 0 && (
                <div>
                    <h2 className="text-xl md:text-3xl text-slate-900 dark:text-white mb-2">Upcoming Elections</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {upcomingElections.map((election) => (
                            <GlassCard key={election.id} className='p-4'>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="mb-2 font-semibold">{election.title}</h3>
                                        <div className="flex items-center gap-2 text-sm  /60">
                                            <Calendar className="h-4 w-4" />
                                            Starts on {new Date(election.startDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <StatusBadge variant="warning">Upcoming</StatusBadge>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {election.positions.map((position, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-white/10 rounded  /80 text-sm">
                                            {position}
                                        </span>
                                    ))}
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            )} */}

            {/* Completed Elections */}
            {completedElections.length > 0 && (
                <div>
                    <h2 className="text-xl md:text-3xl text-slate-900 dark:text-white mb-2">Past Elections</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {completedElections.map((election) => (
                            <GlassCard key={election.id} className='p-4'>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="font-semibold mb-2">{election.title}</h3>
                                        <div className="flex items-center gap-2 text-sm  /60 mb-3">
                                            <Calendar className="h-4 w-4" />
                                            Ended on {new Date(election.endDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <StatusBadge variant="danger">Completed</StatusBadge>
                                </div>

                                <div className="mb-4">
                                    <div className=" /60 text-sm mb-2">Final Participation</div>
                                    <div className="flex justify-between text-sm  /80 mb-2">
                                        <span>{election.votedCount} out of {election.totalVoters} voted</span>
                                        <span>{Math.round((election.votedCount / election.totalVoters) * 100)}%</span>
                                    </div>
                                </div>

                                {election.resultsPublished ? (
                                    <GlassButton
                                        onClick={() => handleViewResults(election)}
                                        className="w-full"
                                    >
                                        <Trophy className="h-4 w-4 mr-2" />
                                        View Results
                                    </GlassButton>
                                ) : (
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg  /60 text-center">
                                        Results will be published soon
                                    </div>
                                )}
                            </GlassCard>
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {elections.length === 0 && (
                <GlassCard>
                    <div className="text-center py-12">
                        <Vote className="h-16 w-16/20 mx-auto mb-4" />
                        <h3 className=" mb-2">No Elections Available</h3>
                        <p>There are no elections scheduled at the moment</p>
                    </div>
                </GlassCard>
            )}

            {/* Vote Modal */}
            <Modal
                isOpen={showVoteModal}
                onClose={() => {
                    setShowVoteModal(false);
                    setError('');
                }}
                title="Cast Your Vote"
                size="xl"
            >
                {selectedElection && (
                    <div className="space-y-6">
                        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
                            <div>
                                <p className="mb-1">Important: You must vote for all positions before submitting.</p>
                                <p className="text-sm text-blue-400/80">Your vote is anonymous and cannot be changed once submitted.</p>
                            </div>
                        </div>

                        {selectedElection.positions.map((position) => {
                            const positionCandidates = getCandidatesByPosition(position);
                            const selectedCandidate = selectedVotes[position];

                            return (
                                <div key={position}>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Users className="h-5 w-5  " />
                                        <h3>{position}</h3>
                                        {selectedCandidate && (
                                            <CheckCircle2 className="h-5 w-5 text-green-400 ml-auto" />
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        {positionCandidates.map((candidate) => (
                                            <div
                                                key={candidate.id}
                                                onClick={() => handleCandidateSelect(position, candidate.id)}
                                                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedCandidate === candidate.id
                                                    ? 'bg-blue-500/20 border-blue-500'
                                                    : 'bg-white/5 border-white/10 hover:border-white/30'
                                                    }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center   shrink-0">
                                                        {candidate.name.charAt(0)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="  mb-1">{candidate.name}</h4>
                                                        <p className=" /60 text-sm">{candidate.description}</p>
                                                    </div>
                                                    {selectedCandidate === candidate.id && (
                                                        <CheckCircle2 className="h-6 w-6 text-blue-400 shrink-0" />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

                        {error && (
                            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                {error}
                            </div>
                        )}

                        <div className="flex gap-3 pt-4">
                            <GlassButton
                                onClick={handleSubmitVote}
                                className="flex-1"
                            >
                                <Vote className="h-4 w-4 mr-2" />
                                Submit Vote
                            </GlassButton>
                            <GlassButton
                                onClick={() => {
                                    setShowVoteModal(false);
                                    setError('');
                                }}
                                className="flex-1"
                            >
                                Cancel
                            </GlassButton>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Results Modal */}
            <Modal
                isOpen={showResultsModal}
                onClose={() => setShowResultsModal(false)}
                title="Election Results"
                size="xl"
            >
                {selectedElection && (
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold mb-1">{selectedElection.title}</h3>
                            <p>
                                {selectedElection.votedCount} out of {selectedElection.totalVoters} members voted
                                ({Math.round((selectedElection.votedCount / selectedElection.totalVoters) * 100)}% participation)
                            </p>
                        </div>

                        {selectedElection.positions.map((position) => {
                            const positionCandidates = getCandidatesByPosition(position);
                            const winner = getWinnerByPosition(position);
                            const chartData = getChartDataByPosition(position);

                            return (
                                <div key={position} className="bg-white/5 p-6 rounded-lg border border-white/10">
                                    <h4 className="  mb-4 flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        {position}
                                    </h4>

                                    {positionCandidates.length > 0 ? (
                                        <>
                                            {/* Winner Card */}
                                            {winner && (
                                                <div className="bg-linear-to-r from-yellow-500/20 to-orange-500/20 p-4 rounded-lg border border-yellow-500/30 mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <Trophy className="h-8 w-8 text-yellow-400 shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <div className=" /60 text-sm mb-1">Winner</div>
                                                            <div className="  truncate">{winner.name}</div>
                                                            <div className=" /80 text-sm">{winner.votes} votes</div>
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
                                                    .sort((a, b) => (b.votes || 0) - (a.votes || 0))
                                                    .map((candidate, idx) => (
                                                        <div key={candidate.id} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                                                            <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full   shrink-0">
                                                                {idx + 1}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="  truncate">{candidate.name}</div>
                                                                <div className=" /60 text-sm truncate">{candidate.description}</div>
                                                            </div>
                                                            <div className="text-right shrink-0">
                                                                <div className=" ">{candidate.votes}</div>
                                                                <div className=" /60 text-sm">votes</div>
                                                            </div>
                                                            {idx === 0 && <Trophy className="h-5 w-5 text-yellow-400 shrink-0" />}
                                                        </div>
                                                    ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center py-8  /40">
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