import { Route } from '@angular/router';
import { MenusComponent } from './menus.component';
import { PersonalComponent } from './personal.component';
import { ConfirmationComponent } from './confirmation.component';
import { SeatComponent } from './seat.component';
import { PaymentComponent } from './payment.component';

export const MENUS_ROUTES: Route[] = [
    {
        path: '',
        component: MenusComponent,
        children: [
            { path: '', redirectTo: 'personal', pathMatch: 'full' },
            { path: 'personal', component: PersonalComponent },
            { path: 'confirmation', component: ConfirmationComponent },
            { path: 'seat', component: SeatComponent },
            { path: 'payment', component: PaymentComponent },
        ],
    },
];
