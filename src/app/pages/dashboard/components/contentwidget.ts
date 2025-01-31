import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-content-widget',
    imports: [CommonModule, RouterLink],
    template: `
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0" routerLink="/workouts">
                <div class="flex justify-between mb-4">
                    <div>
                        <i class="fas fa-scroll"></i>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">Workouts</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0" routerLink="/exercises">
                <div class="flex justify-between mb-4">
                    <div>
                        <i class="fas fa-dumbbell"></i>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">Übungen</div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Contentwidget {}
