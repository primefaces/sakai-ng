import { Component, OnInit } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { FloatLabel } from 'primeng/floatlabel';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { NgIf } from '@angular/common';
import { RadioButton } from 'primeng/radiobutton';
import { Select } from 'primeng/select';
import { CountryService } from '../../pages/service/country.service';
import { WorkoutService } from '../service/workout.service';

@Component({
    selector: 'app-workout-list',
    imports: [Toolbar, Button, Dialog, ReactiveFormsModule, DatePicker, FormsModule, AutoComplete, FloatLabel, IconField, InputIcon, InputNumber, InputText, Textarea, NgIf, RadioButton, Select],
    templateUrl: './workout-list.component.html',
    styleUrl: './workout-list.component.scss',
    providers: [CountryService]
})
export class WorkoutListComponent implements OnInit {
    newDialogVisible!: boolean;
    calendarValue: any;

    workoutTypes: any[] | undefined;
    autoFilteredWorkoutType: any[] = [];
    selectedWorkoutType: any = null;

    constructor(private workoutService: WorkoutService) {}

    ngOnInit() {
        this.fetchWorkoutTypes();
    }

    openNew() {
        this.newDialogVisible = true;
    }

    saveWorkout() {}

    hideDialog() {
        this.newDialogVisible = false;
    }

    filterWorkoutTypes(event: AutoCompleteCompleteEvent) {
        const filteredWorkoutTypes: any[] = [];
        const query = event.query;

        for (let i = 0; i < (this.workoutTypes as any[]).length; i++) {
            const workoutType = (this.workoutTypes as any[])[i];
            if (workoutType.label.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
                filteredWorkoutTypes.push(workoutType);
            }
        }
        this.autoFilteredWorkoutType = filteredWorkoutTypes;
    }

    private fetchWorkoutTypes(): void {
        this.workoutService.getWorkoutTypes().subscribe({
            next: (types) => {
                this.workoutTypes = types.map((type) => ({
                    label: type.replace('_', ' '),
                    value: type,
                }));
            },
            error: (err) => {
                console.error('Failed to fetch workout types:', err);
            },
        });
    }
}
