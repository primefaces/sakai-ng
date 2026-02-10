import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutService } from './app/layout/service/layout.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
    private layoutService = inject(LayoutService);

    ngOnInit() {
        // Force initialization of LayoutService to load theme from storage
        // This ensures the theme is applied before any components render
        const config = this.layoutService.layoutConfig();
        console.log('App initialized with theme config:', config);
    }
}
