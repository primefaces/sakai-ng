import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TimeTableName} from "../../../../../assets/models/time-table-names";
import {GlobalTableService} from "../api/global-table.service";
import {Observable, of} from "rxjs";
import {CollisionService} from "../api/collision.service";
import {ChangeService} from "../api/change.service";
import {TimeTable} from "../../../../../assets/models/dto/time-table";

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
})
export class DashboardHeaderComponent implements OnInit{
    @Output() setNewTimeTable = new EventEmitter<TimeTable>();

    protected availableTables: Observable<TimeTableName[]> = of([]);
    protected shownTableDD: TimeTableName | null = null;

    constructor(
        private globalTableService: GlobalTableService,
        private collisionService: CollisionService,
        private changeService: ChangeService
    ) {}

    protected async handleTableChange() {
        //this.collisionService.clearCollisions();
        //this.changeService.clearChanges();
        if(!this.shownTableDD!.id) return;

        const newTable = await this.globalTableService.getSpecificTimeTable(this.shownTableDD!.id);
        this.setNewTimeTable.emit(newTable);
    }

    protected unselectTable(){
        //this.collisionService.clearCollisions();
        //this.changeService.clearChanges();
        //this.globalTableService.unselectTable();
        this.shownTableDD = null;
        //this.clearCalendar();
    }

    ngOnInit(): void {
        this.availableTables = this.globalTableService.getTimeTableByNames();
    }
}
