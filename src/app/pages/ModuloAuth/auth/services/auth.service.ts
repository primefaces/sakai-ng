import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap,BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../../../../environments/environment';
import { AuthResponse } from '../models/AuthResponse';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Observable para el estado de autenticación
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable(); // Se puede suscribir desde cualquier componente

  private apiUrl = `${environment.backend.host}`;

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token'); // Devuelve true si hay token
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.isAuthenticatedSubject.next(true); // 🔥 Notifica que el usuario está autenticado
        }
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap({
        next: () => {
          // ✅ Limpieza de datos locales
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          // ✅ Actualiza estado de autenticación
          this.isAuthenticatedSubject.next(false);
          console.log('✅ Sesión cerrada correctamente (frontend y backend)');
        },
        error: (err) => {
          // ❌ Manejo de error si el backend falla
          console.error('❌ Error al cerrar sesión en el backend:', err);
        }
      })
    );
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`); 
  }

  updateProfile(user : User): Observable<User> {
    const data = {
      name: user.name,
      image: user.image
    }
    return this.http.post<User>(`${this.apiUrl}/update-profile`, data);
  }

  updatePassword(passwordActual: string, passwordNew: string, passwordNewConfirm: string): Observable<boolean> {
    const data = {
      current_password: passwordActual,
      new_password: passwordNew,
      new_password_confirmation: passwordNewConfirm
    };
    return this.http.post<boolean>(`${this.apiUrl}/update-password`, data);
  }
}
