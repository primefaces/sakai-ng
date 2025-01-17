export interface WorkoutExercise {
    exerciseName: string;
    category: string;
    isStrength: boolean;
    reps?: number;
    weight?: number;
    duration?: number;
}
