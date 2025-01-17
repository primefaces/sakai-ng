import { Component, OnInit } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { FloatLabel } from 'primeng/floatlabel';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { JsonPipe, NgIf } from '@angular/common';
import { RadioButton } from 'primeng/radiobutton';
import { Select } from 'primeng/select';
import { CountryService } from '../../pages/service/country.service';
import { WorkoutService } from '../service/workout.service';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';

@Component({
    selector: 'app-workout-list',
    imports: [Toolbar, Button, Dialog, ReactiveFormsModule, DatePicker, FormsModule, AutoComplete, InputNumber, NgIf, InputText, Textarea, Accordion, AccordionContent, AccordionHeader, AccordionPanel],
    templateUrl: './workout-list.component.html',
    styleUrl: './workout-list.component.scss',
    providers: [CountryService]
})
export class WorkoutListComponent implements OnInit {
    newDialogVisible!: boolean;
    calendarValue: any;
    totalTime: any;
    totalRounds: any;
    notes: any;

    workoutForm!: FormGroup;
    workoutTypes: any[] | undefined;
    selectedWorkoutType: any = null;
    autoFilteredWorkoutType: any[] = [];

    constructor(
        private workoutService: WorkoutService,
        private fb: FormBuilder,
    ) {}

    ngOnInit() {
        this.initializeForm()
        this.fetchWorkoutTypes();
        this.selectedWorkoutType = null;
    }

    openNew() {
        this.newDialogVisible = true;
    }

    saveWorkout() {}

    hideDialog() {
        this.newDialogVisible = false;
    }

    filterWorkoutTypes(event: AutoCompleteCompleteEvent) {
        const query = event.query.toLowerCase(); // Convert query to lowercase for comparison
        this.autoFilteredWorkoutType = this.workoutTypes?.filter((type) => type.label.toLowerCase().includes(query)) || [];
        console.log('Filtered Workout Types:', this.autoFilteredWorkoutType);
        console.log('Selected Workout Type:', this.selectedWorkoutType);
    }

    createExerciseGroup(): FormGroup {
        return this.fb.group({
            exercise: this.fb.group({
                name: ['', Validators.required],
            }),
            reps: [null],
            weight: [null],
            duration: [null],
        });
    }

    removeExerciseGroup() {

    }

    private initializeForm(): void {
        this.workoutForm = this.fb.group({
            date: ['', Validators.required],
            workoutType: ['', Validators.required],
            totalTime: [null],
            totalRounds: [null],
            notes: [''],
            exercises: this.fb.array([this.createExerciseGroup()]),
        });
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

}
