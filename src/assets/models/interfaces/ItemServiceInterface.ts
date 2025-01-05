import {Observable} from "rxjs";

export interface ItemService <T>{
    getTableHeader(): any[];
    getItemDialog(): any;

    getGlobalFilterFields(): string[];
    getAllItems(): Observable<T[]>;
    createSingeItem(item: T): Promise<T>;
    updateSingeItem(item: T): Promise<T>;
    deleteSingleItem(item: T): Promise<T>;
    deleteMultipleItem(items: T[]): Promise<T>;
}
