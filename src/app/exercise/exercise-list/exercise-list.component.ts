import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ExerciseService } from '../services/exercise.service';
import { Button, ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { Table, TableModule } from 'primeng/table';
import { Exercise } from '../../core/models/exercises/Exercise';
import { ExerciseDetailComponent } from '../exercise-detail/exercise-detail.component';
import { Toolbar } from 'primeng/toolbar';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';

@Component({
    selector: 'app-exercise-list',
    imports: [ButtonDirective, Ripple, TableModule, ExerciseDetailComponent, Button, Toolbar, IconField, InputIcon, InputText],
    templateUrl: './exercise-list.component.html',
    styleUrl: './exercise-list.component.scss'
})
export class ExerciseListComponent implements OnInit {
    dataService = inject(DataService);
    exerciseService = inject(ExerciseService);

    selectedExercise: any = null;
    exerciseDialogVisible: boolean = false;

    ngOnInit() {
        this.dataService.getExercises().subscribe((exercises) => {
            this.exerciseService.exercises.set(exercises);
        });
    }

    openExerciseDetailsDialog(exercise: Exercise) {
        this.selectedExercise = exercise;
        this.exerciseDialogVisible = true;

        // Fetch exercise progress data
        this.dataService.getProgressOverTime(exercise.id, exercise.category).subscribe(
            (result) => {
                // Determine the best metric based on category
                const bestMetric = result.reduce(
                    (currentBest, entry) =>
                        exercise.category === 'Strength'
                            ? Math.max(currentBest, entry.metric ?? 0) // Strength: Max weight
                            : exercise.category === 'Bodyweight'
                              ? Math.max(currentBest, entry.metric ?? 0) // Bodyweight: Max reps
                              : exercise.category === 'Cardio'
                                ? Math.min(currentBest, entry.metric ?? Number.MAX_SAFE_INTEGER) // Cardio: Min duration
                                : currentBest,
                    exercise.category === 'Cardio' ? Number.MAX_SAFE_INTEGER : 0
                );

                // Find the entry with the best metric
                const bestPerformance = result.find((entry) => entry.metric === bestMetric);

                this.selectedExercise = {
                    ...exercise,
                    progress: result, // Attach progress data to the exercise object
                    bestPerformance: {
                        metric: bestMetric,
                        date: bestPerformance?.date || null // Attach the date of the best performance
                    }
                };
                console.log(this.selectedExercise);
            },
            (error) => {
                console.error('Error fetching exercise progress:', error);
            }
        );
    }

    closeExerciseDialog() {
        this.exerciseDialogVisible = false;
        this.selectedExercise = null; // Reset the state
    }

    test() {}

    onGlobalFilter(table: Table, $event: Event) {
        table.filterGlobal((event?.target as HTMLInputElement).value, 'contains');
    }
}
