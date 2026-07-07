import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { map, tap } from 'rxjs';
import { BACKEND_API_BASE_URL } from '@/app/config/api-config';
import { LoginRequest, LoginResponse, AuthUser } from './auth.types';

const AUTH_TOKEN_KEY = 'dtm_auth_token';
const AUTH_USER_KEY = 'dtm_auth_user';
const AUTH_API_BASE = `${BACKEND_API_BASE_URL}/auth`;

interface ApiResponseEnvelope<T> {
    success: boolean;
    path: string;
    timestamp: string;
    data: T;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);

    private tokenSignal = signal<string | null>(this.readStoredToken());
    private userSignal = signal<AuthUser | null>(this.readStoredUser());

    isAuthenticated = computed(() => !!this.tokenSignal());
    user = computed(() => this.userSignal());
    token = computed(() => this.tokenSignal());

    login(payload: LoginRequest) {
        return this.http.post<ApiResponseEnvelope<LoginResponse> | LoginResponse>(`${AUTH_API_BASE}/login`, payload).pipe(
            map((response) => this.unwrapLoginResponse(response)),
            tap((response) => this.storeSession(response))
        );
    }

    logout() {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        this.tokenSignal.set(null);
        this.userSignal.set(null);
    }

    private storeSession(response: LoginResponse) {
        localStorage.setItem(AUTH_TOKEN_KEY, response.token);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.user));
        this.tokenSignal.set(response.token);
        this.userSignal.set(response.user);
    }

    private unwrapLoginResponse(response: ApiResponseEnvelope<LoginResponse> | LoginResponse): LoginResponse {
        if (this.isEnvelope(response)) {
            return response.data;
        }

        return response;
    }

    private isEnvelope(response: ApiResponseEnvelope<LoginResponse> | LoginResponse): response is ApiResponseEnvelope<LoginResponse> {
        return !!response && typeof response === 'object' && 'data' in response && 'success' in response;
    }

    private readStoredToken(): string | null {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);

        if (!token || token === 'undefined' || token === 'null') {
            return null;
        }

        return token;
    }

    private readStoredUser(): AuthUser | null {
        const raw = localStorage.getItem(AUTH_USER_KEY);
        if (!raw || raw === 'undefined' || raw === 'null') {
            return null;
        }

        try {
            return JSON.parse(raw) as AuthUser;
        } catch {
            return null;
        }
    }
}
