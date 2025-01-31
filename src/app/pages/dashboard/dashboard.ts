import { Component, inject } from '@angular/core';
import { Contentwidget } from './components/contentwidget';
import { AuthService } from '../../auth/service/auth.service';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    imports: [Contentwidget, Button, RouterLink],
    template: `
        @if (authService.currentUser()) {
            <div class="grid grid-cols-6 gap-8">
                <app-content-widget class="contents" />
            </div>
        }
        @if (authService.currentUser() === null) {
            <div>
                <span>Nicht eingeloggt! Hier gehts zum Login: </span>
                <p-button routerLink="/auth/login" icon="pi pi-sign-in" text raised rounded class="ml-1" />
            </div>
        }
    `
})
export class Dashboard {
    authService = inject(AuthService);
}
