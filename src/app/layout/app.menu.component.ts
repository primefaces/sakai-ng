import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {PrimeIcons} from "primeng/api";
import {LocalStorageService} from "ngx-webstorage";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    options: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private localStorage: LocalStorageService,
    ) { }

    showTableDialog() {}

    loadTmpTable() {}

    deleteUnfinishedTable(){}

    isTmpTableAvailable(): boolean {
        return true;
    }

    ngOnInit() {
        this.options = [
            {
                label: 'Editor',
                items: [
                    {
                        label: 'Edit Mode',
                        icon: PrimeIcons.FILE_EDIT,
                        routerLink: 'user/editor'
                        //command: () => this.redirectToSelection('/user/editor')
                    },
                    {
                        label: 'Auto Fill',
                        icon: PrimeIcons.CALCULATOR,
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
