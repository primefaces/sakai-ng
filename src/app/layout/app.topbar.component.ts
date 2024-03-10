import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    items!: MenuItem[];


    menuItem: MenuItem[] = [];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;




    constructor(public layoutService: LayoutService) {}

    ngOnInit (){
        this.menuItem = [
            {
                label: 'Profile', icon: 'pi pi-fw pi-check'
            },
            {
                label: 'Billing', icon: 'pi pi-fw pi-refresh'
            },
            {
                separator: true
            },
            {
                label: 'Logout', icon: 'pi pi-fw pi-home'
            },
        ];

    }

}
