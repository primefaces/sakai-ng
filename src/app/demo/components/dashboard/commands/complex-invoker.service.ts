import { Injectable } from '@angular/core';
import {DashboardComponent} from "../dashboard.component";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {ComplexCommand} from "./ComplexCommandInterface";
import {SimpleCalculateCollision} from "./impl/CalculateCollisionCommand";

@Injectable({
  providedIn: 'root'
})
export class ComplexInvokerService {
    private command: ComplexCommand;
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
            .catch( err => {
                this.messageService.add({severity: 'error', summary: 'ERROR', detail: err.error});
            })
            .finally( () => this.receiver.isLoading.next(false));
    }


    public applyCollisionCheck(){
        this.command = new SimpleCalculateCollision(this.httpClient);
        this.applyCommand().then(() => {})
    }

    get receiver(): DashboardComponent {
        return this._receiver;
    }

    set receiver(value: DashboardComponent) {
        this._receiver = value;
    }
}
