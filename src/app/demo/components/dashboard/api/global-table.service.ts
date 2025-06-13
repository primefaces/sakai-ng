import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {TimeTable} from "../../../../../assets/models/dto/time-table";
import {TimeTableName} from "../../../../../assets/models/time-table-names";
import {TmpTimeTable} from "../../../../../assets/models/dto/tmp-time-table";

@Injectable({
  providedIn: 'root'
})
export class GlobalTableService {
    static API_PATH = `${environment.baseUrl}/api/global`;

    constructor(
        private http: HttpClient,
    ) {
    }

    async getTimeTableByNames() {
        const newUrl = `${GlobalTableService.API_PATH}/names`;
        return firstValueFrom(this.http.get<TimeTableName[]>(newUrl));
    }

    async getSpecificTimeTable(id: number):Promise<TimeTable> {
        const newUrl = `${GlobalTableService.API_PATH}/${id}`;
        return firstValueFrom(this.http.get<TimeTable>(newUrl));
    }

    pushTmpTableObject(table: TmpTimeTable): Promise<string> {
        const newUrl = `${GlobalTableService.API_PATH}/create`;
        return firstValueFrom(this.http.post<any>(newUrl, table));
    }

    deleteTable(id: number){
        const newUrl = `${GlobalTableService.API_PATH}/${id}`;
        return this.http.delete(newUrl);
    }
}
