import {Component, OnInit } from '@angular/core';
import {AppComponent} from './app.component';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <ul class="layout-menu">
                <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true">
                    <div class="layout-menuitem-root-text">{{item.label}}</div>
                    <ul>
                        <li app-menuitem *ngFor="let child of item.items" [item]="child" [index]="i"></li>
                    </ul>
                </li>
                <a href="https://www.primefaces.org/primeblocks-ng/#/">
                    <img src="assets/layout/images/{{app.darkMode ? 'banner-primeblocks-dark' : 'banner-primeblocks'}}.png" alt="Prime Blocks" class="w-full mt-3"/>
                </a>
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];
    
    constructor(public app: AppComponent){}

    ngOnInit() {
        
        this.model = [
            {
                label: 'Home',
                items:[{
                    label: 'Dashboard',
                    icon: 'pi pi-fw pi-home', routerLink: ['/']
                }]
            },
            {
                label: 'UI Kit',
                items: [
                    {label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout']},
                    {label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input']},
                    {label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel']},
                    {label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate']},
                    {label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon'},
                    {label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table']},
                    {label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list']},
                    {label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree']},
                    {label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel']},
                    {label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay']},
                    {label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu']},
                    {label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message']},
                    {label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file']},
                    {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts']},
                    {label: 'Misc', icon: 'pi pi-fw pi-circle-off', routerLink: ['/uikit/misc']}
                ]
            },
            {
                label: 'Pages',
                items: [
                    {label: 'Crud', icon: 'pi pi-fw pi-user-edit', routerLink: ['/pages/crud']},
                    {label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/pages/timeline']},
                    {label: 'Empty', icon: 'pi pi-fw pi-circle-off', routerLink: ['/pages/empty']}
                ]
            },
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark'},
                                    {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark'},
                                    {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark'},
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark'}
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark'},
                                    {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark'},
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark'},
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                label:'Get Started',
                items:[
                    {
                        label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
                    },
                    {
                        label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-angular']
                    }
                ]
            }
        ];
    }
}