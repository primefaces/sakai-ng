import { Injectable, signal, WritableSignal } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { AuthResponse, createClient, User } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    currentUser = signal<User | null>(null);
    supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    isSessionRestored: WritableSignal<boolean> = signal(false); // Track if the session is restored

    constructor() {
        this.restoreSession(); // Restore the session on app initialization
        this.supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                this.currentUser.set(session.user);
            } else {
                this.currentUser.set(null);
            }
        });
    }

    register(email: string, username: string, password: string): Observable<AuthResponse> {
        const promise = this.supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username
                }
            }
        });
        return from(promise);
    }

    login(email: string, password: string): Observable<AuthResponse> {
        const promise = this.supabase.auth.signInWithPassword({
            email,
            password
        });
        return from(promise);
    }

    logout(): void {
        this.supabase.auth.signOut();
    }

    async restoreSession(): Promise<void> {
        console.log('AuthService: Restoring session...');
        const { data: { session }, error } = await this.supabase.auth.getSession();

        if (error) {
            console.error('AuthService: Error restoring session:', error);
        }

        if (session?.user) {
            console.log('AuthService: Session restored. User:', session.user);
            this.currentUser.set(session.user);
        } else {
            console.warn('AuthService: No session found.');
            this.currentUser.set(null);
        }

        this.isSessionRestored.set(true); // Notify that session restoration is complete
    }
}
