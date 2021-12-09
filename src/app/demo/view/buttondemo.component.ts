import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
    templateUrl: './buttondemo.component.html'
})
export class ButtonDemoComponent implements OnInit {

    items: MenuItem[];

    ngOnInit() {
        this.items = [
            {label: 'Update', icon: 'pi pi-refresh'},
            {label: 'Delete', icon: 'pi pi-times'},
            {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
            {separator: true},
            {label: 'Setup', icon: 'pi pi-cog'}
        ];
    }
}
