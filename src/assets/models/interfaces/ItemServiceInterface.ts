import {Observable} from "rxjs";

export interface ItemService <T>{
    getTableHeader(): any[];
    getItemDialog(): any;

    getAllItems(): Observable<T[]>;
    createSingeItem(item: T): Promise<T>;
    updateSingeItem(item: T): T;
    deleteSingleItem(item: T):boolean;
    deleteMultipleItem(items: T[]):boolean;
}
