import { WorkoutExerciseResponse } from './WorkoutExerciseResponse';

export interface Workout {
    id: string;
    date: string;
    workoutType: string;
    totalTime?: number;
    totalRounds?: number;
    notes?: string;
    exercises: WorkoutExerciseResponse[];
}
