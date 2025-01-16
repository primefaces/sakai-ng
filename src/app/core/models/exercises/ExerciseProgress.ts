export interface ExerciseProgress {
    id: string;
    userId: string;
    exerciseId: string;
    maxWeight?: number;
    bestReps?: number;
}
