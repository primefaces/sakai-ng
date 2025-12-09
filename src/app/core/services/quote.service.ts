import { Injectable, inject, signal, computed, effect } from '@angular/core';
import {
    Firestore,
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    getDocs,
    Timestamp,
    CollectionReference,
    DocumentData
} from '@angular/fire/firestore';
import { Quote } from '../models/quote.model';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class QuoteService {
    private firestore = inject(Firestore);
    private authService = inject(AuthService);

    // Angular Signals
    quotes = signal<Quote[]>([]);
    loading = signal<boolean>(false);

    constructor() {
        // Auto-load quotes when user authenticates
        effect(() => {
            const user = this.authService.currentUser();
            if (user) {
                this.loadUserQuotes();
            } else {
                this.quotes.set([]);
            }
        });
    }

    // Computed signal for quote statistics
    quoteSummary = computed(() => {
        const allQuotes = this.quotes();
        return {
            total: allQuotes.length,
            draft: allQuotes.filter(q => q.status === 'DRAFT').length,
            submitted: allQuotes.filter(q => q.status === 'SUBMITTED').length,
            quoted: allQuotes.filter(q => q.status === 'QUOTED').length,
            bound: allQuotes.filter(q => q.status === 'BOUND').length,
            denied: allQuotes.filter(q => q.status === 'DENIED').length
        };
    });

    recentActivities = computed(() => {
        return this.quotes().slice(0, 5).map(q => ({
            label: q.status,
            description: `Quote for ${q.client.businessName}`,
            date: q.createdAt?.toDate ? q.createdAt.toDate() : new Date(),
            icon: 'pi pi-file'
        }));
    });

    private getQuotesCollection(): CollectionReference<DocumentData> {
        return collection(this.firestore, 'quotes');
    }

    async loadUserQuotes(): Promise<void> {
        const user = this.authService.currentUser();
        if (!user) return;

        this.loading.set(true);

        try {
            const quotesRef = this.getQuotesCollection();
            const q = query(
                quotesRef,
                where('agentId', '==', user.uid),
                orderBy('createdAt', 'desc')
            );

            const querySnapshot = await getDocs(q);
            const loadedQuotes: Quote[] = [];

            querySnapshot.forEach((doc) => {
                loadedQuotes.push({
                    id: doc.id,
                    ...doc.data() as Omit<Quote, 'id'>
                });
            });

            this.quotes.set(loadedQuotes);
        } catch (error) {
            console.error('Error loading quotes:', error);
            throw error;
        } finally {
            this.loading.set(false);
        }
    }

    async createQuote(quoteData: Partial<Quote>): Promise<string> {
        const user = this.authService.currentUser();

        if (!user) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Required',
                text: 'You must be logged in to save a quote.'
            });
            throw new Error('User not authenticated');
        }

        this.loading.set(true);

        try {
            const newQuote: any = {
                ...quoteData,
                userId: user.uid, // Explicitly requested
                agentId: user.uid,
                agentName: user.displayName || user.email || 'Unknown Agent', // Explicitly requested
                agentEmail: user.email || '',
                createdAt: Timestamp.now(),
                status: 'DRAFT'
            };

            const docRef = await addDoc(this.getQuotesCollection(), newQuote);

            // Refresh quotes list
            await this.loadUserQuotes();

            return docRef.id;
        } catch (error) {
            console.error('Error creating quote:', error);
            Swal.fire({
                icon: 'error',
                title: 'Save Failed',
                text: 'There was an error saving your quote.'
            });
            throw error;
        } finally {
            this.loading.set(false);
        }
    }

    async updateQuote(quoteId: string, updates: Partial<Quote>): Promise<void> {
        this.loading.set(true);

        try {
            const quoteRef = doc(this.firestore, 'quotes', quoteId);
            await updateDoc(quoteRef, { ...updates });

            // Refresh quotes list
            await this.loadUserQuotes();
        } catch (error) {
            console.error('Error updating quote:', error);
            throw error;
        } finally {
            this.loading.set(false);
        }
    }

    async updateQuoteStatus(quoteId: string, status: Quote['status']): Promise<void> {
        const updates: any = { status };

        if (status === 'SUBMITTED') updates.submittedAt = Timestamp.now();
        if (status === 'QUOTED') updates.quotedAt = Timestamp.now();
        if (status === 'BOUND') updates.boundAt = Timestamp.now();

        await this.updateQuote(quoteId, updates);
    }

    async deleteQuote(quoteId: string): Promise<void> {
        this.loading.set(true);

        try {
            const quoteRef = doc(this.firestore, 'quotes', quoteId);
            await deleteDoc(quoteRef);

            // Refresh quotes list
            await this.loadUserQuotes();
        } catch (error) {
            console.error('Error deleting quote:', error);
            throw error;
        } finally {
            this.loading.set(false);
        }
    }

    getQuoteById(id: string): Quote | undefined {
        return this.quotes().find(q => q.id === id);
    }
}
