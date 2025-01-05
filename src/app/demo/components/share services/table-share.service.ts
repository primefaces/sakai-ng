import { Injectable } from '@angular/core';
import {TimeTable} from "../../../../assets/models/dto/time-table";

@Injectable({
  providedIn: 'root'
})
export class TableShareService {
    private _sharedTable: TimeTable | null = null;

    constructor() { }

    get sharedTable(): TimeTable | null {
        return this._sharedTable;
    }

    set sharedTable(value: TimeTable | null) {
        this._sharedTable = value;
    }
}
