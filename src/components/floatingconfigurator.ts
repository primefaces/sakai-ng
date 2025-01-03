import { Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from '@/src/layout/appconfigurator';
import { LayoutService } from '@/src/service/layout.service';

@Component({
  selector: 'floating-configurator',
  imports: [ButtonModule, StyleClassModule, AppConfigurator],
  template: `
      <div class="fixed flex gap-4 top-8 right-8">
          <p-button type="button" (onClick)="toggleDarkMode()" [rounded]="true" [icon]="isDarkTheme() ? 'pi pi-moon' : 'pi pi-sun'" severity="secondary" />
          <div class="relative">
              <p-button
                  icon="pi pi-palette"
                  pStyleClass="@next"
                  enterFromClass="hidden"
                  enterActiveClass="animate-scalein"
                  leaveToClass="hidden"
                  leaveActiveClass="animate-scalein"
                  [hideOnOutsideClick]="true"
                  type="button"
                  rounded
              />
              <app-configurator />
          </div>
      </div>
  `,
})
export class FloatingConfigurator {
    LayoutService = inject(LayoutService);

    isDarkTheme = computed(() => this.LayoutService.layoutConfig().darkTheme);

    toggleDarkMode() {
        this.LayoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}
