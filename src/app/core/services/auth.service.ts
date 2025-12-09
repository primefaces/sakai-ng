import { Injectable, inject, signal } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, authState, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AppUser } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private auth = inject(Auth);
    private router = inject(Router);

    // Angular Signal for current user state
    currentUser = signal<AppUser | null>(null);
    loading = signal<boolean>(true);

    constructor() {
        // Subscribe to auth state changes and update signal
        authState(this.auth).subscribe((user: User | null) => {
            if (user) {
                this.currentUser.set({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                });
            } else {
                this.currentUser.set(null);
            }
            this.loading.set(false);
        });
    }

    async signInWithGoogle(): Promise<void> {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(this.auth, provider);

            if (result.user) {
                this.router.navigate(['/dashboard']);
            }
        } catch (error) {
            console.error('Error signing in with Google:', error);
            throw error;
        }
    }

    async signOut(): Promise<void> {
        try {
            await signOut(this.auth);
            this.router.navigate(['/login']);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    }
}
