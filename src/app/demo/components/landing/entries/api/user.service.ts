import {Injectable, Type} from '@angular/core';
import { ItemService } from 'src/assets/models/interfaces/ItemServiceInterface';
import {Userx} from "../../../../../../assets/models/userx";

@Injectable({
    providedIn: 'root'
})
export class UserService implements ItemService<Userx> {

    constructor() {
    }

    getItemDialog(): Type<Userx> {
        throw new Error('Method not implemented.');
    }

    getTableHeader(): any[] {
        return Userx.getTableColumns();
    }

    getAllItems(): Userx[] {
        throw new Error('Method not implemented.');
    }
    createSingeItem(): Userx {
        throw new Error('Method not implemented.');
    }
    updateSingeItem(): Userx {
        throw new Error('Method not implemented.');
    }
    deleteSingleItem(): void {
        throw new Error('Method not implemented.');
    }
    deleteMultipleItem(): void {
        throw new Error('Method not implemented.');
    }
}
