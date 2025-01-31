import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import { Exercise } from '../../../core/models/exercises/Exercise';
import { Dialog } from 'primeng/dialog';
import { DatePicker } from 'primeng/datepicker';
import { InputText } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { Button } from 'primeng/button';
import { AutoComplete } from 'primeng/autocomplete';
import { Textarea } from 'primeng/textarea';
import { NgForOf } from '@angular/common';
import { DataService } from '../../../core/services/data.service';
import { ExerciseService } from '../../../exercise/services/exercise.service';

@Component({
    selector: 'app-workout-create',
    imports: [Accordion, Dialog, ReactiveFormsModule, DatePicker, InputText, InputNumber, Button, AccordionPanel, AccordionHeader, AccordionContent, AutoComplete, Textarea, NgForOf],
    templateUrl: './workout-create.component.html',
    styleUrl: './workout-create.component.scss'
})
export class WorkoutCreateComponent implements OnInit{
    @Input() visible = false;
    @Output() closeDialog = new EventEmitter<void>(); // Notify parent to close dialog
    @Output() saveWorkout = new EventEmitter<any>(); // Emit the workout to save

    fb = inject(FormBuilder);
    dataService = inject(DataService);
    exerciseService = inject(ExerciseService);

    workoutForm = this.fb.nonNullable.group({
        date: ['', Validators.required],
        workoutType: ['', Validators.required],
        totalTime: ['', this.timeFormatValidator()],
        totalRounds: [null],
        notes: [''],
        exercises: this.fb.array([])
    });

    autoFilteredWorkoutType: { label: string }[] = [];
    autoFilteredExercises: Exercise[] = [];
    workoutTypes = [
        { label: 'AMRAP' },
        { label: 'FOR_TIME' },
        { label: 'X_ROUNDS_FOR_TIME' },
        { label: 'X_ROUNDS_FOR_REPS' },
        { label: 'STRENGTH' },
        { label: 'EMOM' },
        { label: 'PARTNER_WOD' },
        { label: 'GYM' },
    ];
    exercises: Exercise[] = []; // Populate with actual data

    ngOnInit(): void {
        // Fetch all exercises for the dropdown
/*        this.dataService.getExercises().subscribe((exercises) => {
            this.exercises = exercises;
        });*/

        this.exercises = this.exerciseService.exercises();
    }

    get exercisesArray(): FormArray {
        return this.workoutForm.get('exercises') as FormArray;
    }

    addExerciseGroup(): void {
        const exerciseGroup = this.fb.group({
            exercise: [null, Validators.required],
            reps: [null],
            weight: [null],
            duration: [null]
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

    hideDialog(): void {
        this.closeDialog.emit(); // Notify parent to close the dialog
        this.workoutForm.reset();
    }

    save(): void {
        const formattedWorkout = this.mapWorkoutToBackendFormat(this.workoutForm.value);
        console.log('formatted workout: ', formattedWorkout)
        this.saveWorkout.emit(formattedWorkout); // Emit the formatted workout to the parent
        this.hideDialog(); // Close the dialog after saving
    }

    private mapWorkoutToBackendFormat(formData: any): any {
        const convertTimeToSeconds = (time: string): number | null => {
            if (!time) return null;
            const [minutes, seconds] = time.split(':').map(Number);
            return minutes * 60 + seconds;
        };

        const formatDate = (date: Date): string => {
            if (!date) return '';
            return date.toISOString().split('T')[0]; // Extract 'YYYY-MM-DD'
        };

        return {
            workout: {
                workout_date: formatDate(formData.date), // Format the date correctly
                workout_type: formData.workoutType.label, // Get the label from the workout type object
                total_time: convertTimeToSeconds(formData.totalTime),
                total_rounds: formData.totalRounds || null,
                notes: formData.notes || '',
            },
            exercises: formData.exercises.map((exercise: any) => ({
                exercise_id: exercise.exercise.id, // Ensure ID is passed
                reps: exercise.reps || null,
                weight: exercise.weight || null,
                duration: exercise.duration || null,
            })),
        };
    }

    private timeFormatValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            const timeRegex = /^[0-5]?[0-9]:[0-5][0-9]$/; // Matches MM:SS
            return value && !timeRegex.test(value) ? { invalidTimeFormat: true } : null;
        };
    }
}
