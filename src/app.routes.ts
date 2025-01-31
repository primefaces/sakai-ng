import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/_archiv/notfound/notfound';
import { DashboardOld } from './app/pages/_archiv/dashboard/dashboard';
import { WorkoutListComponent } from './app/workout/components/workout-list/workout-list.component';
import { ProfileComponent } from './app/profile/profile/profile.component';
import { authGuard } from './app/auth/service/auth.guard';
import { ExerciseListComponent } from './app/exercise/exercise-list/exercise-list.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard, canActivate: [authGuard] },
            { path: 'workouts', component: WorkoutListComponent, canActivate: [authGuard]},
            { path: 'exercises', component: ExerciseListComponent, canActivate: [authGuard]},
            { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
            { path: 'old', component: DashboardOld },
            { path: 'uikit', loadChildren: () => import('./app/pages/_archiv/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/auth/components/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
