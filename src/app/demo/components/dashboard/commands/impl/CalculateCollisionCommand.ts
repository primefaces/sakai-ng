import {GlobalTableService} from "../../api/global-table.service";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {ComplexCommand} from "../ComplexCommandInterface";
import {CollisionType} from "../../../../../../assets/models/enums/collision-type";
import {DialogService} from "primeng/dynamicdialog";
import {CollisionInfoDialog} from "../../../dialogs/HomeDialogs/collision-info-dialog/course-info-dialog.component";

export class SimpleCalculateCollision implements ComplexCommand {

    constructor(
        private http: HttpClient,
        private dialogService: DialogService,
        ) {}

    public async execute(tableID: string): Promise<void> {
        const newUrl = `${GlobalTableService.API_PATH}/collision/${tableID}`;
        const data = await firstValueFrom(this.http.post<Record<string, CollisionType[]>>(newUrl, {}));

        if (Object.keys(data).length === 0)
            throw "no collisions found";
        else
            this.showDialog(data);
    }

    showDialog(data: any): void {
        this.dialogService.open(CollisionInfoDialog, {
            header: `Create new Table`,
            contentStyle: { overflow: 'auto' },
            width: '550px',
            baseZIndex: 10000,
            maximizable: false,
            showHeader: false,
            position: 'left',
            data: {'collisions': data}
        })
    }
}
