import { Injectable } from '@angular/core';
import { catchError, Observable, of, pipe, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { Workout } from '../../core/models/workout/Workout';
import { Exercise } from '../../core/models/exercises/Exercise';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
    private apiUrlWorkout = `${environment.apiUrl}/workouts`;
    private apiUrlExercises = `${environment.apiUrl}/exercises`;

    constructor(private http: HttpClient) { }

    getWorkoutTypes(): Observable<string[]> {
        return this.http
            .get<string[]>(`${this.apiUrlWorkout}/workout-types`)
            .pipe(
                catchError((error) => {
                    console.error('Error fetching workout types:', error);
                    return of([]); // Return an empty array if there's an error
                })
            );
    }

    getExercises(): Observable<Exercise[]> {
        return this.http.get<Exercise[]>(`${this.apiUrlExercises}`).pipe(
            catchError((error) => {
                console.error('Error fetching exercises:', error);
                return of([]); // Return an empty array in case of error
            })
        );
    }

    saveWorkout(workout: any): Observable<any> {
        return this.http.post(`${this.apiUrlWorkout}`, workout).pipe(
            catchError((error) => {
                console.error('Error saving workout:', error);
                return throwError(error);
            })
        );
    }
}
