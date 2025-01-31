import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { AuthService } from '../../auth/service/auth.service';
import { Tooltip } from 'primeng/tooltip';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, Tooltip],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <a class="layout-topbar-logo" routerLink="/">
                <span>Crossfit Tracker</span>
            </a>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>
                <div class="relative">
                    <button
                        class="layout-topbar-action layout-topbar-action-highlight"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <app-configurator />
                </div>
            </div>

            <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    @if (authService.currentUser()) {
                        <button type="button" class="layout-topbar-action" pTooltip="Meine Workouts" showDelay="300" hideDelay="300" tooltipPosition="bottom" routerLink="/workouts">
                            <i class="fas fa-scroll"></i>
                            <span>Meine Workouts</span>
                        </button>
                        <button type="button" class="layout-topbar-action" pTooltip="Zu den Übungen" showDelay="300" hideDelay="300" tooltipPosition="bottom" routerLink="/exercises">
                            <i class="fas fa-dumbbell"></i>
                            <span>Übungen</span>
                        </button>
                        <button type="button" class="layout-topbar-action" pTooltip="Mein Profil" showDelay="300" hideDelay="300" tooltipPosition="bottom">
                            <i class="pi pi-user"></i>
                            <span>Profil</span>
                        </button>
                        <button type="button" class="layout-topbar-action" (click)="logout()" routerLink="/auth/login" pTooltip="Ausloggen" showDelay="300" hideDelay="300" tooltipPosition="bottom">
                            <i class="pi pi-sign-out"></i>
                            <span>Abmelden</span>
                        </button>
                    } @if (authService.currentUser() === null) {
                        <button type="button" class="layout-topbar-action" routerLink="/auth/login" pTooltip="Einloggen" showDelay="300" hideDelay="300" tooltipPosition="bottom">
                            <i class="pi pi-sign-in"></i>
                            <span>Anmelden</span>
                        </button>
                    }
                </div>
            </div>
        </div>
    </div>`
})
export class AppTopbar {
    items!: MenuItem[];
    layoutService = inject(LayoutService);
    authService = inject(AuthService);

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    logout() {
        this.authService.logout();
    }
}
