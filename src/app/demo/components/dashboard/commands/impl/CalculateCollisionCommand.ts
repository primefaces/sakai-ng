import {GlobalTableService} from "../../api/global-table.service";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {ComplexCommand} from "../ComplexCommandInterface";
import {CollisionType} from "../../../../../../assets/models/enums/collision-type";
import {DialogService} from "primeng/dynamicdialog";
import {inject} from "@angular/core";
import {CollisionInfoDialog} from "../../../dialogs/HomeDialogs/collision-info-dialog/course-info-dialog.component";

export class SimpleCalculateCollision implements ComplexCommand {
    constructor(
        private http: HttpClient
    ) {}

    async execute(tableID: string): Promise<void> {
        const newUrl = `${GlobalTableService.API_PATH}/collision/${tableID}`;
        const data = firstValueFrom(this.http.post<Record<string, CollisionType[]>>(newUrl, {}));
        this.showDialog(data);
    }

    showDialog(data: any): void {
        const dialogService: DialogService = inject(DialogService);
        dialogService.open(CollisionInfoDialog, {
            header: `Create new Table`,
            contentStyle: { overflow: 'auto' },
            width: '550px', height: '370px',
            baseZIndex: 10000,
            maximizable: false,
            showHeader: false,
            position: 'left',
            data: {'collisions': data}
        })
    }
}
