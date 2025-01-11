import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TimeTableName} from "../../../../../assets/models/time-table-names";
import {GlobalTableService} from "../api/global-table.service";
import {Observable, of} from "rxjs";
import {CollisionService} from "../api/collision.service";
import {ChangeService} from "../api/change.service";
import {TimeTable} from "../../../../../assets/models/dto/time-table";
import {TableDialogComponent} from "../../dialogs/table-dialog/table-dialog.component";
import {TmpTimeTable} from "../../../../../assets/models/tmp-time-table";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
})
export class DashboardHeaderComponent implements OnInit{
    @Output() setNewTimeTable = new EventEmitter<TimeTable>();

    protected availableTables: Observable<TimeTableName[]> = of([]);
    protected shownTableDD: TimeTableName | null = null;

    constructor(
        private confirmationService: ConfirmationService,
        private globalTableService: GlobalTableService,
        private collisionService: CollisionService,
        private messageService: MessageService,
        private changeService: ChangeService,
        private dialogService: DialogService,
) {}

    protected async handleTableChange() {
        //this.collisionService.clearCollisions();
        //this.changeService.clearChanges();
        if(!this.shownTableDD!.id) return;

        const newTable = await this.globalTableService.getSpecificTimeTable(this.shownTableDD!.id);
        this.setNewTimeTable.emit(newTable);
    }

    showTableDialog(){
        const ref = this.dialogService.open(TableDialogComponent, {
            header: `Create new Table`,
            contentStyle: { overflow: 'auto' },
            width: '550px', height: '370px',
            baseZIndex: 10000,
            maximizable: false,
            position: 'topleft'
        })

        ref.onClose.subscribe((result: TmpTimeTable) => {
            localStorage.setItem('wizard-table', JSON.stringify(result));
        });
    }

    protected unselectTable(){
        //this.collisionService.clearCollisions();
        //this.changeService.clearChanges();
        //this.globalTableService.unselectTable();
        this.shownTableDD = null;
        //this.clearCalendar();
        this.setNewTimeTable.emit(null);
    }

    loadTmpTable(){}

    deleteUnfinishedTable(event: Event){
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure you want to delete the unfinished table?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                localStorage.removeItem('wizard-table');
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }

    isTmpTableAvailable(): boolean {
        return !!localStorage.getItem('wizard-table');
    }

    loadSpecificTable(){

    }

    ngOnInit(): void {
        this.availableTables = this.globalTableService.getTimeTableByNames();
    }
}
