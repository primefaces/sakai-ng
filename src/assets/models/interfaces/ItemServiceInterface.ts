import {Type} from "@angular/core";

export interface ItemService <T>{
    getTableHeader(): any[];
    getItemDialog(): Type<T>;

    getAllItems(): T[];
    createSingeItem(): T;
    updateSingeItem(): T;
    deleteSingleItem():void;
    deleteMultipleItem():void;
}
