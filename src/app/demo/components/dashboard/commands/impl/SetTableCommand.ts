import {TimeTable} from "../../../../../../assets/models/dto/time-table";
import {Command} from "../CommandInterface";
import {DashboardComponent} from "../../dashboard.component";

export class SetTable implements Command {
    private readonly receiver: DashboardComponent;
    private readonly newTable: TimeTable;

    constructor(
        component: DashboardComponent,
        newTable: TimeTable,
    ) {
        this.receiver = component;
        this.newTable = newTable;
    }

    execute(): any {
        this.receiver.setNewTable(this.newTable);
    }
}
