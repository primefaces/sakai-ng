import {Injectable} from '@angular/core';
import { ItemService } from 'src/assets/models/interfaces/ItemServiceInterface';
import {Userx} from "../../../../../../assets/models/userx";
import {UserDialog} from "../../../dialogs/user-dialog/user-dialog.component";
import {delay, Observable, of} from "rxjs";

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

    getAllItems(): Observable<Userx[]> {
        return of([{id: '1', username: 'Woida', email: 'w.e@g.c',
            firstName: 'Elias', lastName: 'Walder', enabled: true,
            new: true, role: ['ADMIN', 'USER']} as Userx,{id: '2', username: 'Woida', email: 'w.e@g.c',
            firstName: 'Elias', lastName: 'Walder', enabled: true,
            new: true, role: ['ADMIN', 'USER']} as Userx]).pipe(delay(2000));
    }

    createSingeItem(): Userx {
        throw new Error('Method not implemented.');
    }

    updateSingeItem(): Userx {
        throw new Error('Method not implemented.');
    }

    deleteSingleItem(): boolean {
        return true;
    }

    deleteMultipleItem(): boolean {
        return true;
    }
}
