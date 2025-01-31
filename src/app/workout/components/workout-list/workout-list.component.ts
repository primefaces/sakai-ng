import { Component, inject, OnInit } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { Button, ButtonDirective } from 'primeng/button';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { WorkoutCreateComponent } from '../workout-create/workout-create.component';
import { WorkoutService } from '../../service/workout.service';
import { TableModule } from 'primeng/table';
import { Ripple } from 'primeng/ripple';
import { DataService } from '../../../core/services/data.service';
import { DatePipe } from '@angular/common';
import { WorkoutDetailComponent } from '../workout-detail/workout-detail.component';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';


@Component({
    selector: 'app-workout-list',
    imports: [InputTextModule, Toolbar, Button, ReactiveFormsModule, FormsModule, WorkoutCreateComponent, TableModule, ButtonDirective, Ripple, DatePipe, WorkoutDetailComponent, Toast],
    templateUrl: './workout-list.component.html',
    styleUrl: './workout-list.component.scss',
})
export class WorkoutListComponent implements OnInit {
    workoutService = inject(WorkoutService);
    dataService = inject(DataService);
    messageService = inject(MessageService);
    createWorkoutDialog = false;
    detailWorkoutDialog = false;
    selectedWorkout: any = null; // Stores the workout to show in the dialog

    ngOnInit() {
        // Fetch workouts with their exercises
        this.dataService.getWorkouts().subscribe(
            (workouts) => {
                this.workoutService.workouts.set(workouts);
            },
            (error) => {
                console.error('Error fetching workouts:', error);
            }
        );
    }

    deleteWorkout(workoutId: string): void {
        if (confirm('Are you sure you want to delete this workout?')) {
            this.dataService.removeWorkout(workoutId).subscribe(
                () => {
                    console.log(`Workout with ID ${workoutId} successfully deleted.`);
                    this.workoutService.removeWorkout(workoutId);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Workout gelöscht.' });
                },
                (error) => {
                    console.error(`Error deleting workout with ID ${workoutId}:`, error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Etwas ist schiefgelaufen.' });
                }
            );
        }
    }

    getExerciseNames(exercises: { exercise_name: string }[]): string {
        return exercises.map((e) => e.exercise_name).join(', ');
    }

    openNewWorkoutDialog(): void {
        this.createWorkoutDialog = true;
    }

    closeNewWorkoutDialog(): void {
        this.createWorkoutDialog = false;
    }

    openWorkoutDetailsDialog(workout: any) {
        console.log('Opening workout details for:', workout); // Debug
        this.selectedWorkout = workout; // Set the selected workout
        this.detailWorkoutDialog = true;
    }

    closeWorkoutDetailDialog() {
        this.detailWorkoutDialog = false;
    }

    saveWorkout(workout: { workout: any; exercises: any[] }): void {
        this.workoutService.addWorkout(workout); // Add workout to the state
        this.createWorkoutDialog = false;
    }
}
