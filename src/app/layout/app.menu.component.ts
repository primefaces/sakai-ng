import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {PrimeIcons} from "primeng/api";
import {LocalStorageService} from "ngx-webstorage";
import {DialogService} from "primeng/dynamicdialog";
import {TableDialogComponent} from "../demo/components/dialogs/table-dialog/table-dialog.component";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    options: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private dialogService: DialogService,
        private localStorage: LocalStorageService
    ) { }

    showTableDialog(){
        const ref = this.dialogService.open(TableDialogComponent, {
            header: `Create new Table`,
            contentStyle: { overflow: 'auto' },
            width: '30%',
            baseZIndex: 10000,
            maximizable: false,
            position: 'topleft'
        })

        ref.onClose.subscribe((result) => {
            this.localStorage.store('wizard-table', result);
        });
    }

    loadTmpTable(){}

    deleteUnfinishedTable(){
        this.localStorage.clear('wizard-table');
    }

    isTmpTableAvailable(): boolean {
        return true;
    }

    loadSpecificTable(){

    }

    unselectTable(){

    }

    ngOnInit() {
        this.options = [
            {
                label: 'Editor',
                items: [
                    {
                        label: 'Edit Mode',
                        icon: PrimeIcons.FILE_EDIT,
                        routerLink: '/editor'
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
