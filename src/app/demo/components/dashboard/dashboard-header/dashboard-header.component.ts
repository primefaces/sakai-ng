import {Component, OnInit} from '@angular/core';
import {TimeTableName} from "../../../../../assets/models/time-table-names";
import {GlobalTableService} from "../api/global-table.service";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
})
export class DashboardHeaderComponent implements OnInit{
    protected availableTables: Observable<TimeTableName[]> = of([]);
    protected shownTableDD: TimeTableName | null = null;

    constructor(
        private globalTableService: GlobalTableService,
    ) {}

    ngOnInit(): void {
        this.availableTables = this.globalTableService.getTimeTableByNames();
        this.shownTableDD = this.availableTables[0];
    }
}
