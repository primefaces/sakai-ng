import {Injectable} from '@angular/core';
import { ItemService } from 'src/assets/models/interfaces/ItemServiceInterface';
import {Userx} from "../../../../../../assets/models/userx";
import {UserDialog} from "../../../dialogs/user-dialog/user-dialog.component";

@Injectable({
    providedIn: 'root'
})
export class UserService implements ItemService<Userx> {

    constructor() {
    }

    getItemDialog(): any {
        return UserDialog;
    }

    getTableHeader(): any[] {
        return Userx.getTableColumns();
    }

    getAllItems(): Userx[] {
        return [{id: '1', username: 'Woida', email: 'w.e@g.c',
            firstName: 'Elias', lastName: 'Walder', enabled: true,
            new: true, role: ['ADMIN', 'USER']} as Userx]
    }
    createSingeItem(): Userx {
        throw new Error('Method not implemented.');
    }
    updateSingeItem(): Userx {
        throw new Error('Method not implemented.');
    }
    deleteSingleItem(): boolean {
        throw new Error('Method not implemented.');
    }
    deleteMultipleItem(): boolean {
        throw new Error('Method not implemented.');
    }
}
