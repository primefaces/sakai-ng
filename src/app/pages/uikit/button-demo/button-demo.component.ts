import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
    selector: 'app-button-demo',
    imports: [ButtonModule, ButtonGroupModule, SplitButtonModule],
    templateUrl: './button-demo.component.html',
    styleUrl: './button-demo.component.scss'
})
export class ButtonDemoComponent {
    items: MenuItem[] = [];

    loading = [false, false, false, false];

    ngOnInit() {
        this.items = [{ label: 'Update', icon: 'pi pi-refresh' }, { label: 'Delete', icon: 'pi pi-times' }, { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' }, { separator: true }, { label: 'Setup', icon: 'pi pi-cog' }];
    }

    load(index: number) {
        this.loading[index] = true;
        setTimeout(() => (this.loading[index] = false), 1000);
    }
}
