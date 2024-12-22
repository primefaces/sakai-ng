import {Component, OnInit} from '@angular/core';
import {LayoutService} from "../../../../layout/service/app.layout.service";
import {LocalStorageService} from "ngx-webstorage";
import {PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-menu-dash',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit{
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
