import { Component } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {getRoleOptions} from "../../../../../assets/models/enums/role";
import {TmpTimeTable} from "../../../../../assets/models/tmp-time-table";
import {InputTextModule} from "primeng/inputtext";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-user-dialog',
  standalone: true,
    imports: [
        InputTextModule,
        RouterLink
    ],
  templateUrl: './table-dialog.component.html'
})
export class TableDialogComponent {
    protected tmpTimeTable: TmpTimeTable;
    roleOptions = getRoleOptions();

    constructor(
        public config: DynamicDialogConfig,
        public ref: DynamicDialogRef
    ) {
        this.tmpTimeTable = new TmpTimeTable();
    }

    save() {
        this.ref.close(this.tmpTimeTable);
    }
}
