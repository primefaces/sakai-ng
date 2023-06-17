import { Route } from '@angular/router';
import { IconsComponent } from './icons/icons.component';

export const UTILTIES_ROUTES: Route[] = [
    { path: 'icons', data: { breadcrumb: 'Prime Icons' }, component: IconsComponent },
    { path: '**', redirectTo: '/notfound' }
];
