import { effect, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { map } from 'rxjs/operators';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiURL: string = `${environment.apiUrl}/auth`;
    private tokenSignal = signal<string | null>(localStorage.getItem('token'));
    private isAuthenticatedSignal = signal<boolean>(!!this.tokenSignal());

    constructor(private http: HttpClient) {
        effect(() => {
            const token = this.tokenSignal();
            if (token) {
                this.validateToken();
            } else {
                this.isAuthenticatedSignal.set(false);
            }
        });
    }

    get isAuthenticated() {
        return this.isAuthenticatedSignal.asReadonly();
    }

    getToken(): string | null {
        return this.tokenSignal();
    }

    login(email: string, password: string): void {
        console.log('email: ', email);
        console.log('password: ', password);
        this.http
            .post<{ token: string }>(`${this.apiURL}/login`, { email, password })
            .pipe(
                tap((response) => {
                    if (response?.token) {
                        this.setToken(response.token); // Store the token
                        console.log('token: ', this.getToken())
                    }
                }),
                switchMap(() => this.validateToken()) // Validate the token after storing it
            )
            .subscribe({
                next: (isValid) => {
                    if (isValid) {
                        console.log('Navigating to /workouts');
                        // this.router.navigate(['/workouts']);
                    }
                },
                error: (err) => {
                    console.error('Login failed:', err);
                    this.logout();
                },
            });
    }

    logout(): void {
        this.setToken(null);
        // this.router.navigate(['/login']);
    }

    private setToken(token: string | null): void {
        if (token) {
            localStorage.setItem('token', token);
            this.tokenSignal.set(token);
            this.isAuthenticatedSignal.set(true);
        } else {
            this.removeToken();
        }
        console.log('AuthService: Updated isAuthenticated to', this.isAuthenticatedSignal());
    }

    private removeToken(): void {
        localStorage.removeItem('token');
        this.tokenSignal.set(null);
        this.isAuthenticatedSignal.set(false);
    }

    private validateToken() {
        const token = this.getToken();
        if (!token) {
            this.logout();
            return of(false);
        }

        return this.http
            .get(`${this.apiURL}/verify-token`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .pipe(
                tap(() => {
                    console.log('Token is valid');
                    this.isAuthenticatedSignal.set(true); // Update the signal on success
                }),
                map(() => true), // Return `true` when the validation is successful
                catchError(() => {
                    this.logout();
                    return of(false); // Return `false` on error
                })
            );
    }
}
