import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-footer',
    imports: [RouterLink],
    template: ` <div class="layout-footer">
        Crossfit Tracker by
        <a href="https://github.com/ChristopherBlume" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">CB</a>
        <span routerLink="/old">old dashboard</span>
    </div>`
})
export class AppFooter {}
