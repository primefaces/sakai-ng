import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';



@Component({
    templateUrl: './workspace.component.html',
})
export class WorkspaceComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    textInput: any;
    textOutput: any;
    textPrompt: any;

    textAreaContent: string;

    display: boolean = false;


    constructor( public layoutService: LayoutService) {

    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }

    onEditorTextChange() {
        this.textAreaContent = this.textInput ;
    }
}
