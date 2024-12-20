
export interface ItemService <T>{
    getTableHeader(): any[];
    getItemDialog(): any;

    getAllItems(): T[];
    createSingeItem(item: T): T;
    updateSingeItem(item: T): T;
    deleteSingleItem(item: T):boolean;
    deleteMultipleItem(items: T[]):boolean;
}
