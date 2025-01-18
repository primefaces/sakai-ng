import { Component, OnInit } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule, ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { AutoComplete } from 'primeng/autocomplete';
import { InputNumber } from 'primeng/inputnumber';
import { Textarea } from 'primeng/textarea';
import { NgForOf } from '@angular/common';
import { CountryService } from '../../pages/service/country.service';
import { WorkoutService } from '../service/workout.service';
import { Exercise } from '../../core/models/exercises/Exercise';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { Workout } from '../../core/models/workout/Workout';

@Component({
    selector: 'app-workout-list',
    imports: [InputTextModule, Toolbar, Button, Dialog, ReactiveFormsModule, DatePicker, FormsModule, AutoComplete, InputNumber, Textarea, NgForOf, Accordion, AccordionPanel, AccordionHeader, AccordionContent],
    templateUrl: './workout-list.component.html',
    styleUrl: './workout-list.component.scss',
    providers: [CountryService]
})
export class WorkoutListComponent implements OnInit {
    newDialogVisible = false;
    workoutForm!: FormGroup;
    workoutTypes: any[] = [];
    autoFilteredWorkoutType: any[] = [];
    exercises: Exercise[] = [];
    autoFilteredExercises: Exercise[] = [];
    workouts: Workout[] = [];

    constructor(
        private fb: FormBuilder,
        private workoutService: WorkoutService
    ) {}

    ngOnInit() {
        this.initializeForm();
        this.fetchExercises();
        this.fetchWorkoutTypes();
        this.fetchWorkouts();
    }

    openNew() {
        this.newDialogVisible = true;
    }

    get exercisesArray(): FormArray {
        return this.workoutForm.get('exercises') as FormArray;
    }

    addExerciseGroup(): void {
        const exerciseGroup = this.fb.group({
            exercise: [null, Validators.required], // Default value is null
            reps: [null],
            weight: [null],
            duration: [null],
        });
        this.exercisesArray.push(exerciseGroup);
    }

    removeExerciseGroup(index: number): void {
        this.exercisesArray.removeAt(index);
    }

    filterWorkoutTypes(event: any): void {
        const query = event.query.toLowerCase();
        this.autoFilteredWorkoutType = this.workoutTypes.filter((type) => type.label.toLowerCase().includes(query));
    }

    filterExercises(event: any): void {
        const query = event.query.toLowerCase();
        this.autoFilteredExercises = this.exercises.filter((exercise) => exercise.name.toLowerCase().includes(query));
    }

    saveWorkout(): void {
        if (this.workoutForm.valid) {
            const workout = this.mapWorkoutToBackendFormat(this.workoutForm.value);
            this.workoutService.saveWorkout(workout).subscribe({
                next: (response) => {
                    console.log('Workout saved successfully:', response);
                    this.hideDialog(); // Close the dialog after saving
                },
                error: (err) => {
                    console.error('Error saving workout:', err);
                },
            });
        } else {
            console.error('Workout form is invalid');
        }
    }

    fetchWorkouts(): void {
        this.workoutService.getWorkouts().subscribe({
            next: (data) => {
                this.workouts = data;
            },
            error: (err) => {
                console.error('Failed to fetch workouts:', err);
            },
        });
    }

    hideDialog(): void {
        this.newDialogVisible = false;
        this.workoutForm.reset();
    }

    onTotalTimeInput(event: Event): void {
        const input = (event.target as HTMLInputElement).value;
        const sanitizedInput = input.replace(/[^0-9:]/g, ''); // Allow only numbers and colon
        this.workoutForm.get('totalTime')?.setValue(sanitizedInput);
    }

    private timeFormatValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            const timeRegex = /^[0-5]?[0-9]:[0-5][0-9]$/; // Matches MM:SS
            return value && !timeRegex.test(value) ? { invalidTimeFormat: true } : null;
        };
    }

    private fetchWorkoutTypes(): void {
        this.workoutService.getWorkoutTypes().subscribe({
            next: (types) => {
                this.workoutTypes = types.map((type) => ({
                    label: type.replace('_', ' '),
                    value: type
                }));
            },
            error: (err) => {
                console.error('Failed to fetch workout types:', err);
            }
        });
    }

    private fetchExercises(): void {
        this.workoutService.getExercises().subscribe((exercises) => {
            this.exercises = exercises;
        });
    }

    private initializeForm(): void {
        this.workoutForm = this.fb.group({
            date: ['', Validators.required],
            workoutType: ['', Validators.required],
            totalTime: ['', this.timeFormatValidator()],
            totalRounds: [null],
            notes: [''],
            exercises: this.fb.array([])
        });
    }

    private mapWorkoutToBackendFormat(formData: any): any {
        const convertTimeToSeconds = (time: string): number | null => {
            if (!time) return null;
            console.log(time);
            const [minutes, seconds] = time.split(':').map(Number);
            return minutes * 60 + seconds;
        };

        return {
            workoutDate: formData.date,
            workoutType: formData.workoutType,
            totalRounds: formData.totalRounds || null,
            totalTimeInSeconds: convertTimeToSeconds(formData.totalTime),
            notes: formData.notes || '',
            exercises: formData.exercises.map((exercise: any) => ({
                exerciseName: exercise.exercise.name,
                reps: exercise.reps || null,
                weight: exercise.weight || null,
            })),
        };
    }
}
