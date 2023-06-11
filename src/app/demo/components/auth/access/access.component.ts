import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-access',
    templateUrl: './access.component.html',
    standalone: true,
    imports: [ButtonModule, RouterLink],
})
export class AccessComponent { }
