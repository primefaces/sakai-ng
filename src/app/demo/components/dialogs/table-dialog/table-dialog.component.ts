import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {TmpTimeTable} from "../../../../../assets/models/tmp-time-table";
import {InputTextModule} from "primeng/inputtext";
import {RouterLink} from "@angular/router";
import {SharedModule} from "primeng/api";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {getSemesterOptions, Semester} from "../../../../../assets/models/enums/semester";
import {NgIf} from "@angular/common";
import {FloatLabelModule} from "primeng/floatlabel";
import {ButtonDirective} from "primeng/button";
import {Status} from "../../../../../assets/models/enums/status";

@Component({
  selector: 'app-user-dialog',
  standalone: true,
    imports: [
        InputTextModule,
        RouterLink,
        SharedModule,
        DropdownModule,
        PaginatorModule,
        NgIf,
        FloatLabelModule,
        ButtonDirective
    ],
  templateUrl: './table-dialog.component.html'
})
export class TableDialogComponent {
    protected creationTable: TmpTimeTable;
    protected semesterOptions: Semester[] = getSemesterOptions();

    constructor(
        public config: DynamicDialogConfig,
        public ref: DynamicDialogRef
    ) {
        this.creationTable = new TmpTimeTable();
        this.creationTable.currentPageIndex = 0;
        this.creationTable.status = Status.NEW;
    }

    save() {
        this.ref.close(this.creationTable);
    }
}
