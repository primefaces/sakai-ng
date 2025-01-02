import {Component} from '@angular/core';
import {TimeTableName} from "../../../../../assets/models/time-table-names";
import {Status} from "../../../../../assets/models/enums/status";
import {Semester} from "../../../../../assets/models/enums/semester";

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
})
export class DashboardHeaderComponent {
    protected availableTables: TimeTableName[] = [
        {id:123, name: 'eli', status: Status.NEW, semester: Semester.SS} as TimeTableName,
    ];
    protected shownTableDD: TimeTableName | null = null;

    constructor(
    ) {
        this.shownTableDD = this.availableTables[0];
    }
}
