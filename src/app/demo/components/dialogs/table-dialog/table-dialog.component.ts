import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {TmpTimeTable} from "../../../../../assets/models/tmp-time-table";
import {InputTextModule} from "primeng/inputtext";
import {RouterLink} from "@angular/router";
import {SharedModule} from "primeng/api";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {Semester} from "../../../../../assets/models/enums/semester";

@Component({
  selector: 'app-user-dialog',
  standalone: true,
    imports: [
        InputTextModule,
        RouterLink,
        SharedModule,
        DropdownModule,
        PaginatorModule
    ],
  templateUrl: './table-dialog.component.html'
})
export class TableDialogComponent {
    protected creationTable: TmpTimeTable;
    protected semesterOptions: Semester[];

    constructor(
        public config: DynamicDialogConfig,
        public ref: DynamicDialogRef
    ) {
        this.creationTable = new TmpTimeTable();
        this.semesterOptions = [Semester.WS, Semester.SS];
    }

    save() {
        this.ref.close(this.creationTable);
    }
}
