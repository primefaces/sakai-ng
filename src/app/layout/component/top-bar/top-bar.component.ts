import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from '../app.configurator';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../service/layout.service';

@Component({
    selector: 'app-topbar',
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator],
    templateUrl: './top-bar.component.html',
    styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
    items!: MenuItem[];

    constructor(public layoutService: LayoutService) {}

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}
