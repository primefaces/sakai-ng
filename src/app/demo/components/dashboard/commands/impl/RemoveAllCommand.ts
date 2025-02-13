import {TimeTable} from "../../../../../../assets/models/dto/time-table";
import {GlobalTableService} from "../../api/global-table.service";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {Command} from "../CommandInterface";

export class SimpleRemoveAll implements Command {
    constructor(
        private http: HttpClient
    ) {}

    async execute(tableID: string): Promise<TimeTable> {
        const newUrl = `${GlobalTableService.API_PATH}/assignment/remove/${tableID}`;
        return firstValueFrom(this.http.post<TimeTable>(newUrl, {}));
    }
}
