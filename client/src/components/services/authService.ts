// Authentication service using localStorage
// NOTE: This is for demonstration only. In production, use a real backend with secure authentication

import { Payment, Society, SocietyEvent, SocietyMember, User } from "../../types";

// Store passwords separately (in production, these would be hashed and stored securely)
const PASSWORDS_KEY = 'societyhub_passwords';

class AuthService {
    private storageKeys = {
        users: 'societyhub_users',
        societies: 'societyhub_societies',
        members: 'societyhub_members',
        payments: 'societyhub_payments',
        currentUser: 'societyhub_current_user',
        passwords: 'societyhub_passwords',
        events: 'societyhub_events',
    };

    constructor() {
        this.initializeMockData();
    }

    // Password management (simplified for demo - in production use proper hashing)
    private getPasswords(): Record<string, string> {
        const passwordsJson = localStorage.getItem(this.storageKeys.passwords);
        return passwordsJson ? JSON.parse(passwordsJson) : {};
    }

    private setPassword(email: string, password: string) {
        const passwords = this.getPasswords();
        passwords[email] = password;
        localStorage.setItem(this.storageKeys.passwords, JSON.stringify(passwords));
    }

    private verifyPassword(email: string, password: string): boolean {
        const passwords = this.getPasswords();
        return passwords[email] === password;
    }

    // Initialize some mock data for demonstration
    private initializeMockData() {
        const societies = this.getSocieties();
        if (societies.length === 0) {
            // Add sample societies with their own admins
            const sampleSocieties: Society[] = [
                {
                    id: 'soc-001',
                    name: 'Green Valley Apartments',
                    address: '123 Main Street, Mumbai',
                    totalUnits: 50,
                    createdAt: new Date().toISOString(),
                    adminId: 'admin-001',
                },
                {
                    id: 'soc-002',
                    name: 'Sunshine Residency',
                    address: '456 Park Avenue, Mumbai',
                    totalUnits: 30,
                    createdAt: new Date().toISOString(),
                    adminId: 'admin-002',
                },
            ];
            localStorage.setItem(this.storageKeys.societies, JSON.stringify(sampleSocieties));

            // Add sample admins for each society
            const users = this.getUsers();
            users.push(
                {
                    id: 'admin-001',
                    email: 'admin1@greenvalley.com',
                    name: 'John Doe',
                    role: 'society_admin',
                    societyId: 'soc-001',
                    phone: '0000000000'
                },
                {
                    id: 'admin-002',
                    email: 'admin2@sunshine.com',
                    name: 'Jane Smith',
                    role: 'society_admin',
                    societyId: 'soc-002',
                    phone: '0000000000'
                }
            );
            localStorage.setItem(this.storageKeys.users, JSON.stringify(users));

            // Set passwords for demo admins
            this.setPassword('admin1@greenvalley.com', 'admin@123');
            this.setPassword('admin2@sunshine.com', 'admin@123');

            // Add sample members
            const sampleMembers: SocietyMember[] = [
                {
                    id: 'mem-001',
                    societyId: 'soc-001',
                    houseNumber: 'A-101',
                    ownerName: 'Rajesh Kumar',
                    email: 'rajesh@example.com',
                    phone: '9876543210',
                    hasAccount: false,
                },
                {
                    id: 'mem-002',
                    societyId: 'soc-001',
                    houseNumber: 'A-102',
                    ownerName: 'Priya Sharma',
                    email: 'priya@example.com',
                    phone: '9876543211',
                    hasAccount: false,
                },
                {
                    id: 'mem-003',
                    societyId: 'soc-001',
                    houseNumber: 'A-103',
                    ownerName: 'Amit Patel',
                    email: 'amit@example.com',
                    phone: '9876543212',
                    hasAccount: true,
                    userId: 'user-001',
                },
                {
                    id: 'mem-004',
                    societyId: 'soc-002',
                    houseNumber: 'B-201',
                    ownerName: 'Sneha Desai',
                    email: 'sneha@example.com',
                    phone: '9876543213',
                    hasAccount: false,
                },
            ];
            localStorage.setItem(this.storageKeys.members, JSON.stringify(sampleMembers));

            // Add a sample member user
            users.push({
                id: 'user-001',
                email: 'amit@example.com',
                name: 'Amit Patel',
                role: 'member',
                societyId: 'soc-001',
                houseNumber: 'A-103',
                phone: '0000000000'
            });
            localStorage.setItem(this.storageKeys.users, JSON.stringify(users));
            this.setPassword('amit@example.com', 'member@123');

            // Add sample payments
            const samplePayments: Payment[] = [
                {
                    id: 'pay-001',
                    userId: 'user-001',
                    societyId: 'soc-001',
                    amount: 5000,
                    month: 'November',
                    year: 2025,
                    status: 'paid',
                    paidDate: '2025-11-05',
                },
                {
                    id: 'pay-002',
                    userId: 'user-001',
                    societyId: 'soc-001',
                    amount: 5000,
                    month: 'October',
                    year: 2025,
                    status: 'paid',
                    paidDate: '2025-10-03',
                },
            ];
            localStorage.setItem(this.storageKeys.payments, JSON.stringify(samplePayments));
        }
    }

    // Authentication methods
    login(email: string, password: string, societyId?: string): User | null {
        const users = this.getUsers();

        // Find user by email
        let user = users.find(u => u.email === email);

        // For society admins, verify they're logging into their society
        if (user && user.role === 'society_admin') {
            if (!societyId || user.societyId !== societyId) {
                return null; // Admin must select their society
            }
        }

        // For members, verify they're logging into their society
        if (user && user.role === 'member') {
            if (!societyId || user.societyId !== societyId) {
                return null; // Member must select their society
            }
        }

        // Verify password
        if (user && this.verifyPassword(email, password)) {
            localStorage.setItem(this.storageKeys.currentUser, JSON.stringify(user));
            return user;
        }

        return null;
    }

    logout() {
        localStorage.removeItem(this.storageKeys.currentUser);
    }

    getCurrentUser(): User | null {
        const userJson = localStorage.getItem(this.storageKeys.currentUser);
        return userJson ? JSON.parse(userJson) : null;
    }

    // Register a society admin (first time registration)
    registerSocietyAdmin(email: string, password: string, name: string, phone: string): User {
        const users = this.getUsers();

        // Check if email already exists
        if (users.some(u => u.email === email)) {
            throw new Error('Email already registered');
        }

        // Create admin user (without society initially)
        const newAdmin: User = {
            id: `admin-${Date.now()}`,
            email,
            name,
            role: 'society_admin',
            phone: '0000000000'
        };

        users.push(newAdmin);
        localStorage.setItem(this.storageKeys.users, JSON.stringify(users));

        // Store password
        this.setPassword(email, password);

        return newAdmin;
    }

    // Register a member
    register(email: string, password: string, name: string, societyId: string, houseNumber: string): User | null {
        const users = this.getUsers();
        const members = this.getMembers();

        // Check if email already exists
        if (users.some(u => u.email === email)) {
            throw new Error('Email already registered');
        }

        // Find member record
        const member = members.find(m =>
            m.societyId === societyId &&
            m.email === email &&
            m.houseNumber === houseNumber &&
            !m.hasAccount
        );

        if (!member) {
            throw new Error('No member record found. Please contact your society admin.');
        }

        // Create user account
        const newUser: User = {
            id: `user-${Date.now()}`,
            email,
            name,
            role: 'member',
            societyId,
            houseNumber,
            phone: '0000000000'
        };

        users.push(newUser);
        localStorage.setItem(this.storageKeys.users, JSON.stringify(users));

        // Store password
        this.setPassword(email, password);

        // Update member record
        member.hasAccount = true;
        member.userId = newUser.id;
        localStorage.setItem(this.storageKeys.members, JSON.stringify(members));

        return newUser;
    }

    // Society methods
    getSocieties(): Society[] {
        const societiesJson = localStorage.getItem(this.storageKeys.societies);
        return societiesJson ? JSON.parse(societiesJson) : [];
    }

    getSocietyById(id: string): Society | null {
        const societies = this.getSocieties();
        return societies.find(s => s.id === id) || null;
    }

    createSociety(name: string, address: string, totalUnits: number): Society {
        const societies = this.getSocieties();
        const users = this.getUsers();
        const currentUser = this.getCurrentUser();

        if (!currentUser || currentUser.role !== 'society_admin') {
            throw new Error('Only society admins can create societies');
        }

        // Check if admin already has a society
        if (currentUser.societyId) {
            throw new Error('You have already registered a society');
        }

        const newSociety: Society = {
            id: `soc-${Date.now()}`,
            name,
            address,
            totalUnits,
            createdAt: new Date().toISOString(),
            adminId: currentUser.id,
        };

        societies.push(newSociety);
        localStorage.setItem(this.storageKeys.societies, JSON.stringify(societies));

        // Update admin user with societyId
        currentUser.societyId = newSociety.id;
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem(this.storageKeys.users, JSON.stringify(users));
            localStorage.setItem(this.storageKeys.currentUser, JSON.stringify(currentUser));
        }

        return newSociety;
    }

    // Member methods
    getMembers(): SocietyMember[] {
        const membersJson = localStorage.getItem(this.storageKeys.members);
        return membersJson ? JSON.parse(membersJson) : [];
    }

    getMembersBySociety(societyId: string): SocietyMember[] {
        const members = this.getMembers();
        return members.filter(m => m.societyId === societyId);
    }

    addMember(societyId: string, houseNumber: string, ownerName: string, email: string, phone: string): SocietyMember {
        const currentUser = this.getCurrentUser();

        if (!currentUser || currentUser.role !== 'society_admin') {
            throw new Error('Only society admins can add members');
        }

        // Verify admin is adding member to their own society
        if (currentUser.societyId !== societyId) {
            throw new Error('You can only add members to your own society');
        }

        const members = this.getMembers();

        // Check if member already exists
        const exists = members.some(m =>
            m.societyId === societyId &&
            (m.houseNumber === houseNumber || m.email === email)
        );

        if (exists) {
            throw new Error('Member with this house number or email already exists');
        }

        const newMember: SocietyMember = {
            id: `mem-${Date.now()}`,
            societyId,
            houseNumber,
            ownerName,
            email,
            phone,
            hasAccount: false,
        };

        members.push(newMember);
        localStorage.setItem(this.storageKeys.members, JSON.stringify(members));

        return newMember;
    }

    // User methods
    getUsers(): User[] {
        const usersJson = localStorage.getItem(this.storageKeys.users);
        return usersJson ? JSON.parse(usersJson) : [];
    }

    getUsersBySociety(societyId: string): User[] {
        const users = this.getUsers();
        return users.filter(u => u.societyId === societyId && u.role === 'member');
    }

    // Payment methods
    getPayments(): Payment[] {
        const paymentsJson = localStorage.getItem(this.storageKeys.payments);
        return paymentsJson ? JSON.parse(paymentsJson) : [];
    }

    getPaymentsByUser(userId: string): Payment[] {
        const payments = this.getPayments();
        return payments.filter(p => p.userId === userId);
    }

    getPaymentsBySociety(societyId: string): Payment[] {
        const payments = this.getPayments();
        return payments.filter(p => p.societyId === societyId);
    }

    getDefaulters(societyId: string): any[] {
        const members = this.getMembersBySociety(societyId);
        const payments = this.getPaymentsBySociety(societyId);
        const users = this.getUsersBySociety(societyId);

        const currentMonth = new Date().toLocaleString('default', { month: 'long' });
        const currentYear = new Date().getFullYear();

        const defaulters: any[] = [];

        members.forEach(member => {
            if (member.hasAccount && member.userId) {
                const user = users.find(u => u.id === member.userId);
                const hasPaid = payments.some(p =>
                    p.userId === member.userId &&
                    p.month === currentMonth &&
                    p.year === currentYear &&
                    p.status === 'paid'
                );

                if (!hasPaid) {
                    defaulters.push({
                        ...member,
                        userName: user?.name || member.ownerName,
                    });
                }
            }
        });

        return defaulters;
    }

    // Event methods
    getEvents(): SocietyEvent[] {
        const eventsJson = localStorage.getItem(this.storageKeys.events);
        return eventsJson ? JSON.parse(eventsJson) : [];
    }

    getEventsBySociety(societyId: string): SocietyEvent[] {
        const events = this.getEvents();
        return events.filter(e => e.societyId === societyId);
    }

    createEvent(societyId: string, title: string, description: string, type: SocietyEvent['type'], date: string): SocietyEvent {
        const currentUser = this.getCurrentUser();

        if (!currentUser || currentUser.role !== 'society_admin') {
            throw new Error('Only society admins can create events');
        }

        if (currentUser.societyId !== societyId) {
            throw new Error('You can only create events for your own society');
        }

        const events = this.getEvents();

        const newEvent: SocietyEvent = {
            id: `event-${Date.now()}`,
            societyId,
            title,
            description,
            type,
            date,
            createdAt: new Date().toISOString(),
            createdBy: currentUser.id,
        };

        events.push(newEvent);
        localStorage.setItem(this.storageKeys.events, JSON.stringify(events));

        return newEvent;
    }

    deleteEvent(eventId: string): void {
        const events = this.getEvents();
        const eventIndex = events.findIndex(e => e.id === eventId);

        if (eventIndex === -1) {
            throw new Error('Event not found');
        }

        const currentUser = this.getCurrentUser();
        if (!currentUser || currentUser.role !== 'society_admin') {
            throw new Error('Only society admins can delete events');
        }

        if (events[eventIndex].societyId !== currentUser.societyId) {
            throw new Error('You can only delete events from your own society');
        }

        events.splice(eventIndex, 1);
        localStorage.setItem(this.storageKeys.events, JSON.stringify(events));
    }

    // Update member details
    updateMember(memberId: string, updates: Partial<SocietyMember>): SocietyMember {
        const currentUser = this.getCurrentUser();

        if (!currentUser || currentUser.role !== 'society_admin') {
            throw new Error('Only society admins can update members');
        }

        const members = this.getMembers();
        const memberIndex = members.findIndex(m => m.id === memberId);

        if (memberIndex === -1) {
            throw new Error('Member not found');
        }

        if (members[memberIndex].societyId !== currentUser.societyId) {
            throw new Error('You can only update members from your own society');
        }

        // Update member
        members[memberIndex] = { ...members[memberIndex], ...updates };
        localStorage.setItem(this.storageKeys.members, JSON.stringify(members));

        return members[memberIndex];
    }

    // Update payment
    updatePayment(userId: string, month: string, year: number, amount: number, status: Payment['status'], paidDate?: string): Payment {
        const currentUser = this.getCurrentUser();

        if (!currentUser || currentUser.role !== 'society_admin') {
            throw new Error('Only society admins can update payments');
        }

        const payments = this.getPayments();

        // Check if payment already exists
        const existingPaymentIndex = payments.findIndex(p =>
            p.userId === userId && p.month === month && p.year === year
        );

        if (existingPaymentIndex !== -1) {
            // Update existing payment
            payments[existingPaymentIndex] = {
                ...payments[existingPaymentIndex],
                amount,
                status,
                paidDate: status === 'paid' ? (paidDate || new Date().toISOString().split('T')[0]) : undefined,
            };
            localStorage.setItem(this.storageKeys.payments, JSON.stringify(payments));
            return payments[existingPaymentIndex];
        } else {
            // Create new payment
            const newPayment: Payment = {
                id: `pay-${Date.now()}`,
                userId,
                societyId: currentUser.societyId!,
                amount,
                month,
                year,
                status,
                paidDate: status === 'paid' ? (paidDate || new Date().toISOString().split('T')[0]) : undefined,
            };
            payments.push(newPayment);
            localStorage.setItem(this.storageKeys.payments, JSON.stringify(payments));
            return newPayment;
        }
    }
}

export const authService = new AuthService();
