import {Component, OnDestroy, OnInit} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {TableModule} from "primeng/table";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {getChangeTypes} from "../../../../../../assets/models/enums/change-type";
import {GlobalTableChangeDTO} from "../../../../../../assets/models/dto/global-table-change-dto";

@Component({
  selector: 'app-user-dialog',
  standalone: true,
    imports: [
        TableModule,
        DropdownModule,
        NgForOf,
        FormsModule,
        KeyValuePipe,
        NgIf
    ],
  templateUrl: './changes-dialog.component.html'
})
export class ChangesDialog implements OnInit, OnDestroy{
    protected changes: GlobalTableChangeDTO[] = [];
    protected cols: any[] = [];

    constructor(
        public config: DynamicDialogConfig,
        public ref: DynamicDialogRef
    ) {
        this.initData();
    }

    private initData():void {
        this.changes = this.config.data['changes'];
    }

    closeDialog(){
        if (this.ref) this.ref.close();
    }

    ngOnInit(): void {
        this.cols = [
            {field: 'changeType', header: 'Type'},
            {field: 'description', header: 'Description'},
            {field: 'changeUser', header: 'Made by'},
            {field: 'date', header: 'Date'}
        ];
    }

    ngOnDestroy(): void {
        this.closeDialog();
    }

    protected readonly getChangeTypes = getChangeTypes;
}
