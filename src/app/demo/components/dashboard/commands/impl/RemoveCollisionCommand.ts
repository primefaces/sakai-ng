import {TimeTable} from "../../../../../../assets/models/dto/time-table";
import {GlobalTableService} from "../../api/global-table.service";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {Command} from "../CommandInterface";

export class SimpleRemoveCollision implements Command {
    constructor(
        private http: HttpClient
    ) {}

    async execute(tableID: string): Promise<TimeTable> {
        const newUrl = `${GlobalTableService.API_PATH}/assignment/removeCollisions/${tableID}`;
        return firstValueFrom(this.http.post<TimeTable>(newUrl, {}));
    }
}
