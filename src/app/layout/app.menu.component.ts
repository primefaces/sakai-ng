import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Editor',
                items: [
                    {
                        label: 'Edit Mode',
                        icon: 'pi pi-pencil',
                        routerLink: 'user/editor'
                        //command: () => this.redirectToSelection('/user/editor')
                    },
                    {
                        label: 'Auto Fill',
                        icon: 'pi pi-microchip',
                        //command: () => this.applyAlgorithm(),
                    },
                    {
                        label: 'Semi-Automatic Assignment',
                        icon: 'pi pi-cog',
                        //command: () => this.openSemiAutoDialog(),
                    },
                    {
                        label: 'Remove All',
                        icon: 'pi pi-delete-left',
                        //command: () => this.removeAll()
                    },
                    {
                        label: 'Collision Check',
                        icon: 'pi pi-check-circle',
                        //command: () => this.applyCollisionCheck()
                    },
                    {
                        label: 'Remove Collisions',
                        icon: 'pi pi-eraser',
                        //command: () => this.removeCollisions()
                    },
                ]
            },
            {
                label: 'Scheduling',
                items: [
                    {
                        label: 'Last Changes',
                        icon: 'pi pi-comments',
                        //command: () => { this.loadChanges() }
                    }
                ]
            },
            {
                label: 'Print',
                items: [
                    {
                        label: 'Export Plan (Current)',
                        icon: 'pi pi-folder-open',
                        //command: () => this.promptTitleAndExport()
                    },
                    {
                        label: 'Export Plan (Rooms)',
                        icon: 'pi pi-folder',
                        //command: () => this.exportCalendarPerRoom()
                    }
                ]
            },
        ];
    }
}
