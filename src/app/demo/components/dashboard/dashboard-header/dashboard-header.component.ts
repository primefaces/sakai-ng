import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {TimeTableName} from "../../../../../assets/models/time-table-names";
import {GlobalTableService} from "../api/global-table.service";
import {CollisionService} from "../api/collision.service";
import {ChangeService} from "../api/change.service";
import {TimeTable} from "../../../../../assets/models/dto/time-table";
import {TableDialogComponent} from "../../dialogs/table-dialog/table-dialog.component";
import {TmpTimeTable} from "../../../../../assets/models/tmp-time-table";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {DropdownChangeEvent} from "primeng/dropdown";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
})
export class DashboardHeaderComponent implements OnInit, OnDestroy{
    @Output() setNewTimeTable = new EventEmitter<TimeTable>();

    protected availableTables: TimeTableName[] = [];
    protected shownTableDD: TimeTableName | null = null;

    private querySub: Subscription = null;

    constructor(
        private confirmationService: ConfirmationService,
        private globalTableService: GlobalTableService,
        private collisionService: CollisionService, //TODO implement service
        private messageService: MessageService,
        private changeService: ChangeService,  //TODO implement service
        private dialogService: DialogService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.initializeTables()
            .finally(() => {
                this.shownTableDD = this.availableTables[0];
                this.handleTableChange({value: this.availableTables[0]} as DropdownChangeEvent).finally()
            })
    }

    ngOnDestroy(): void {
        if(this.querySub) this.querySub.unsubscribe();
    }

    private async initializeTables(): Promise<void>{
        this.availableTables = await this.globalTableService.getTimeTableByNames();

        this.querySub = this.route.queryParams.subscribe(params => {
            const selectedTable = this.availableTables.find(t => t.id === params['tableID']);
            if (selectedTable) this.shownTableDD = selectedTable;
        });
    }

    protected async handleTableChange(change: DropdownChangeEvent) {
        //this.collisionService.clearCollisions();
        //this.changeService.clearChanges();
        if(!this.shownTableDD!.id) return;

        const newTable = await this.loadNewTable();
        if(newTable) {
            this.setHeaderParameter(change.value.id);
            this.setNewTimeTable.emit(newTable);
        }
    }

    private setHeaderParameter(newID: number): void{
        this.router.navigate([], {
            queryParams: { tableID: newID }
        }).finally();
    }

    private async loadNewTable(){
        return await this.globalTableService.getSpecificTimeTable(this.shownTableDD!.id);

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

    deleteUnfinishedTable(event: MouseEvent){
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
}
