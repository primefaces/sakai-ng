import { inject, Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environment/environment';
import { from, Observable, switchMap } from 'rxjs';
import { Exercise } from '../models/exercises/Exercise';
import { map } from 'rxjs/operators';
import { Database } from '../models/supabase';
import { Workout } from '../models/workout/Workout';
import { WorkoutExercise } from '../models/workout/WorkoutExercise';
import { AuthService } from '../../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    supabase = createClient<Database>(environment.supabaseUrl, environment.supabaseKey);
    authService = inject(AuthService);

    getExercises(): Observable<Exercise[]> {
        const promise = this.supabase.from('exercises').select('*');
        return from(promise).pipe(
            map((response) => {
                return response.data ?? [];
            })
        );
    }

    getWorkouts(): Observable<{ workout: Workout; exercises: (WorkoutExercise & { exercise_name: string })[] }[]> {
        const user = this.authService.currentUser();
        if (!user) {
            throw new Error('User not authenticated');
        }

        const workoutsPromise = this.supabase
            .from('workouts')
            .select('*')
            .eq('user_id', user.id); // Fetch workouts for the logged-in user

        return from(workoutsPromise).pipe(
            switchMap(async (workoutsResponse) => {
                if (workoutsResponse.error) {
                    throw new Error('Error fetching workouts: ' + workoutsResponse.error.message);
                }

                const workouts = workoutsResponse.data ?? [];
                const enrichedWorkouts = await Promise.all(
                    workouts.map(async (workout) => {
                        const exercisesResponse = await this.supabase
                            .from('workout_exercises')
                            .select(`*, exercises(name)`) // Join with "exercises" to get the name
                            .eq('workout_id', workout.id);

                        return {
                            workout: workout as Workout,
                            exercises: exercisesResponse.data?.map((exercise) => ({
                                id: exercise.id,
                                workout_id: exercise.workout_id,
                                exercise_id: exercise.exercise_id,
                                reps: exercise.reps,
                                weight: exercise.weight,
                                duration: exercise.duration,
                                exercise_name: exercise.exercises.name, // Keep only the name from the "exercises" table
                            })) ?? [],
                        };
                    })
                );
                return enrichedWorkouts;
            })
        );
    }


    getWorkoutExercises(id: string): Observable<WorkoutExercise[]> {
        const promise = this.supabase.from('workout_exercises').select('*').eq('workout_id', id);
        return from(promise).pipe(
            map((response) => {
                return response.data ?? [];
            })
        )
    }

    // Get a single workout with its associated exercises
    getWorkoutWithExercises(workoutId: string): Observable<{ workout: Workout; exercises: WorkoutExercise[] } | null> {
        const workoutPromise = this.supabase.from('workouts').select('*').eq('id', workoutId).single();
        const exercisesPromise = this.supabase.from('workout_exercises').select('*').eq('workout_id', workoutId);

        return from(
            Promise.all([workoutPromise, exercisesPromise]).then(([workoutResponse, exercisesResponse]) => {
                if (workoutResponse.error || exercisesResponse.error) {
                    console.error('Error fetching workout or exercises:', workoutResponse.error, exercisesResponse.error);
                    return null;
                }
                return {
                    workout: workoutResponse.data,
                    exercises: exercisesResponse.data ?? [],
                };
            })
        );
    }

    // Get workouts along with exercises for all workouts
    getAllWorkoutsWithExercises(): Observable<{ workout: Workout; exercises: WorkoutExercise[] }[]> {
        const promise = this.supabase.from('workouts').select('*');

        return from(promise).pipe(
            map((response) => {
                if (response.error) {
                    console.error('Error fetching workouts:', response.error);
                    return [];
                }

                const workouts = response.data ?? [];
                return Promise.all(
                    workouts.map(async (workout) => {
                        const exercisesResponse = await this.supabase
                            .from('workout_exercises')
                            .select('*')
                            .eq('workout_id', workout.id);

                        return {
                            workout: workout as Workout,
                            exercises: exercisesResponse.data as WorkoutExercise[],
                        };
                    })
                );
            }),
            // Use `switchMap` to flatten the `Promise` returned by `Promise.all`
            switchMap((promiseResult) => from(promiseResult))
        );
    }

    addWorkout(workout: Workout, exercises: WorkoutExercise[]): Observable<void> {
        const user = this.authService.currentUser();
        if (!user) {
            throw new Error('User not authenticated');
        }

        // Add user_id to the workout object
        const workoutWithUserId = { ...workout, user_id: user.id };
        const promise = this.supabase
            .from('workouts')
            .insert(workoutWithUserId)
            .select('*') // Ensure the inserted row is returned
            .then(async (workoutResponse) => {
                if (workoutResponse.error) {
                    throw new Error('Error adding workout: ' + workoutResponse.error.message);
                }

                // Type assertion for workoutResponse.data
                const insertedWorkout = (workoutResponse.data as Workout[])[0]; // Explicitly cast data as Workout[]
                const workoutId = insertedWorkout.id; // Access the ID of the inserted workout

                // Insert exercises for the workout
                await this.supabase.from('workout_exercises').insert(
                    exercises.map((exercise) => ({
                        ...exercise,
                        workout_id: workoutId, // Use the retrieved workout ID
                    }))
                );
            });

        return from(promise).pipe(map(() => {}));
    }

    updateWorkout(workout: Workout, exercises: WorkoutExercise[]): Observable<void> {
        const workoutUpdatePromise = this.supabase
            .from('workouts')
            .update(workout)
            .eq('id', workout.id);

        const exercisesUpdatePromises = exercises.map((exercise) => {
            if (!exercise.id) {
                return Promise.reject(new Error('Exercise ID is missing.'));
            }
            return this.supabase
                .from('workout_exercises')
                .update({
                    reps: exercise.reps,
                    weight: exercise.weight,
                    duration: exercise.duration,
                })
                .eq('id', exercise.id);
        });

        return from(
            Promise.all([workoutUpdatePromise, ...exercisesUpdatePromises])
                .then(() => {})
                .catch((error) => {
                    throw new Error('Error updating workout or exercises: ' + error.message);
                })
        );
    }

    removeWorkout(workoutId: string): Observable<void> {
        const deleteWorkoutPromise = this.supabase.from('workouts').delete().eq('id', workoutId);
        const deleteExercisesPromise = this.supabase.from('workout_exercises').delete().eq('workout_id', workoutId);

        return from(
            Promise.all([deleteWorkoutPromise, deleteExercisesPromise])
                .then(() => {})
                .catch((error) => {
                    throw new Error(`Error deleting workout or exercises: ${error.message}`);
                })
        );
    }

    // Exercise progress logic

    getProgressOverTime(exerciseId: string, category: string): Observable<{ metric: number | null; date: string }[]> {

        const user = this.authService.currentUser();
        if (!user) {
            throw new Error('User not authenticated');
        }

        const query = this.supabase
            .from('workout_exercises')
            .select('weight, reps, duration, workout:workouts(workout_date)')
            .eq('exercise_id', exerciseId)
            .eq('workouts.user_id', user.id)

        return from(query).pipe(
            map((response) => {
                if (response.error) {
                    throw new Error('Error fetching progress over time: ' + response.error.message);
                }

                // Type assertion to ensure data is correctly typed
                const data = response.data ?? [];
                console.log('data: ', data);

                return data.map((item) => ({
                    metric:
                        category === 'Strength'
                            ? item.weight
                            : category === 'Bodyweight'
                                ? item.reps
                                : item.duration,
                    date: item.workout.workout_date,
                }));
            })
        );
    }




}
