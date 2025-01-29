import { Component, computed, inject } from '@angular/core';
import { LayoutService } from '../../service/layout.service';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { ConfiguratorComponent } from '../configurator/configurator.component';

@Component({
    selector: 'app-floating-configurator',
    imports: [ButtonModule, StyleClassModule, ConfiguratorComponent],
    templateUrl: './floating-configurator.component.html',
    styleUrl: './floating-configurator.component.scss'
})
export class FloatingConfiguratorComponent {
    LayoutService = inject(LayoutService);

    isDarkTheme = computed(() => this.LayoutService.layoutConfig().darkTheme);

    toggleDarkMode() {
        this.LayoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}
