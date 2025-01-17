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

    constructor(private http: HttpClient) { }

    getWorkoutTypes(): Observable<string[]> {
        return this.http
            .get<string[]>(`${this.apiUrl}/workout-types`)
            .pipe(
                catchError((error) => {
                    console.error('Error fetching workout types:', error);
                    return of([]); // Return an empty array if there's an error
                })
            );
    }
}
