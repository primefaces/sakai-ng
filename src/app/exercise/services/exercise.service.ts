import { inject, Injectable, signal } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Exercise } from '../../core/models/exercises/Exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
    dataService = inject(DataService);
    exercises = signal<Exercise[]>([]);

}
