import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
    private apiUrl = `${environment.apiUrl}/workouts`;

    constructor(private http: HttpClient,private authService: AuthService) { }

    getWorkoutTypes(): Observable<string[]> {
        return this.http
            .get<string[]>(`${this.apiUrl}/workout-types`, {
                headers: this.getHeaders(),
            })
            .pipe(
                catchError((error) => {
                    console.error('Error fetching workout types:', error);
                    return of([]); // Return an empty array if there's an error
                })
            );
    }

    private getHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        if (!token) {
            throw new Error('User is not authenticated.');
        }
        return new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
    }
}
