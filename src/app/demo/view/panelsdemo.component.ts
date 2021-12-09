import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
    templateUrl: './panelsdemo.component.html',
    styles: [`
        :host ::ng-deep button {
            margin-right: .25em;
            margin-left: .25em;
        }

        :host ::ng-deep .p-splitbutton button {
            margin-right: 0;
            margin-left: 0;
        }

        :host ::ng-deep .p-splitter-panel-nested {
            overflow: auto;
        }

        @media screen and (max-width: 960px) {
            .card.toolbar-demo {
                overflow: auto;
            }
        }
    `]
})
export class PanelsDemoComponent implements OnInit {

    items: MenuItem[];

    cardMenu: MenuItem[];

    ngOnInit() {
        this.items = [
            {label: 'Angular.io', icon: 'pi pi-external-link', url: 'http://angular.io'},
            {label: 'Theming', icon: 'pi pi-bookmark', routerLink: ['/theming']}
        ];

        this.cardMenu = [
            {
                label: 'Save', icon: 'pi pi-fw pi-check'
            },
            {
                label: 'Update', icon: 'pi pi-fw pi-refresh'
            },
            {
                label: 'Delete', icon: 'pi pi-fw pi-trash'
            },
        ];
    }
}
