import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {PrimeIcons} from "primeng/api";
import {InvokerService} from "../demo/components/dashboard/commands/invoker.service";
import {ComplexInvokerService} from "../demo/components/dashboard/commands/complex-invoker.service";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    options: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private invoker: InvokerService,
        private complexInvoker: ComplexInvokerService
) { }

    ngOnInit() {
        this.options = [
            {
                label: 'Editor',
                items: [
                    {
                        label: 'Edit Mode',
                        icon: PrimeIcons.FILE_EDIT,
                        routerLink: '/editor'
                    },
                    {
                        label: 'Auto Fill',
                        icon: PrimeIcons.CALCULATOR,
                        command: () => this.invoker.applyAlgorithm(),
                    },
                    {
                        label: 'Semi-Automatic Assignment',
                        icon: 'pi pi-cog',
                        //command: () => this.openSemiAutoDialog(),
                    },
                    {
                        label: 'Remove All',
                        icon: 'pi pi-delete-left',
                        command: () => this.invoker.removeAll(),
                    },
                    {
                        label: 'Collision Check',
                        icon: 'pi pi-check-circle',
                        command: () => this.complexInvoker.applyCollisionCheck()
                    },
                    {
                        label: 'Remove Collisions',
                        icon: 'pi pi-eraser',
                        command: () => this.invoker.removeCollisions()
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
