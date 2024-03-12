import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { signOut } from "@aws-amplify/auth"

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

    ngOnInit() {
        this.menuItem = [
            {
                label: 'Profile', icon: 'pi pi-fw pi-user'
            },
            {
                label: 'Billing', icon: 'pi pi-fw pi-credit-card'
            },
            {
                separator: true
            },
            {
                label: 'Logout', icon: 'pi pi-fw pi-power-off', command: async () => {
                    await signOut();
                }
            },
        ];
    }


    logout (){
        signOut();
    }



}
