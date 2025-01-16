import { WorkoutExercise } from './WorkoutExercise';

export interface WorkoutRequest {
    workoutDate: string;
    workoutType: string;
    totalRounds?: number;
    totalTimeInSeconds?: number;
    notes?: string;
    exercises: WorkoutExercise[];
}
