import {GlobalTableService} from "../../api/global-table.service";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {ComplexCommand} from "../ComplexCommandInterface";
import {DialogService} from "primeng/dynamicdialog";
import {GlobalTableChangeDTO} from "../../../../../../assets/models/dto/global-table-change-dto";
import {ChangesDialog} from "../../../dialogs/HomeDialogs/changes-dialog/changes-dialog.component";

export class SimpleChanges implements ComplexCommand {
    constructor(
        private http: HttpClient,
        private dialogService: DialogService,
        ) {}

    public async execute(tableID: string): Promise<void> {
        const newUrl = `${GlobalTableService.API_PATH}/changes/${tableID}`;
        const data = await firstValueFrom(this.http.get<GlobalTableChangeDTO[]>(newUrl));

        if (data.length !== 0)
            this.showDialog(data);
        else
            throw "no changes so far";
    }

    showDialog(data: any): void {
        this.dialogService.open(ChangesDialog, {
            header: `Create new Table`,
            contentStyle: { overflow: 'auto' },
            width: '700px',
            baseZIndex: 10000,
            maximizable: false,
            showHeader: false,
            position: 'left',
            data: {'changes' : data}
        })
    }
}
