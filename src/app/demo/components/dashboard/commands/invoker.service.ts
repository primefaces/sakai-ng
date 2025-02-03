import { Injectable } from '@angular/core';
import {Command} from "./CommandInterface";
import {DashboardComponent} from "../dashboard.component";
import {SetTable} from "./impl/SetTableCommand";
import {TimeTable} from "../../../../../assets/models/dto/time-table";
import {SimpleApply} from "./impl/ApplyCommand";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {SimpleRemoveAll} from "./impl/RemoveAllCommand";
import {SimpleRemoveCollision} from "./impl/RemoveCollisionCommand";

@Injectable({
  providedIn: 'root'
})
export class InvokerService {
    private command: Command;
    private onFinish: Command;

    private _receiver: DashboardComponent;

    constructor(
        private httpClient: HttpClient,
        private messageService: MessageService
    ) {
    }

    private async applyCommand(){
        if(this.receiver.selectedTimeTable === null){
            this.messageService.add({
                severity: 'warn', summary: 'MISSING TABLE', detail: 'unable to perform with no selected table'
            });
            throw "no table selected";
        }

        const tableID = this.receiver.selectedTimeTable.id.toString();
        this.receiver.isLoading.next(true);

        this.command.execute(tableID)
            .then((newTable:TimeTable) => this.setOnFinish(newTable))
            .catch( err => {
                this.messageService.add({severity: 'error', summary: 'ERROR', detail: err.error});
            })
            .finally( () => this.receiver.isLoading.next(false));
    }

    public applyAlgorithm(){
        this.command = new SimpleApply(this.httpClient);
        this.applyCommand().then(() => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'UPDATED TABLE',
                    detail: 'removed free courses'
                });
            }
        );
    }

    public removeCollisions(){
        this.command = new SimpleRemoveCollision(this.httpClient);
        this.applyCommand().then(() => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'UPDATED TABLE',
                    detail: 'removed colliding courses'
                });
            }
        );
    }

    public applyCollisionCheck(){

    }

    public removeAll(){
        this.command = new SimpleRemoveAll(this.httpClient);
        this.applyCommand()
            .then(() => {
                this.messageService.add({
                    severity: 'info', summary: 'UPDATED TABLE', detail: 'removed free courses'
                });
            })
    }

    private setOnFinish(newTable: TimeTable){
        this.onFinish = new SetTable(this.receiver, newTable);
        this.onFinish.execute();
    }

    get receiver(): DashboardComponent {
        return this._receiver;
    }

    set receiver(value: DashboardComponent) {
        this._receiver = value;
    }
}
