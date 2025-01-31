export interface Workout {
    id: string;
    user_id: string,
    workout_date: string;
    workout_type: string;
    total_time: number | null;
    total_rounds: number | null;
    notes: string | null;
}
