import { effect, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiURL: string = `${environment.apiUrl}/auth`;
    private tokenSignal = signal<string | null>(localStorage.getItem('token'));
    private isAuthenticatedSignal = signal<boolean>(!!this.tokenSignal());

    constructor(private http: HttpClient, private router: Router) {
        effect(() => {
            const token = this.tokenSignal();
            if (token) {
                this.validateToken();
            } else {
                this.isAuthenticatedSignal.set(false);
            }
        });
    }

    logout(): void {
        this.setToken(null);
        // this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return this.tokenSignal();
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
