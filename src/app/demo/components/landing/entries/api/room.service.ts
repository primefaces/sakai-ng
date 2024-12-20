import {Injectable} from '@angular/core';
import {ItemService} from "../../../../../../assets/models/interfaces/ItemServiceInterface";
import {Room} from "../../../../../../assets/models/room";
import {RoomDialog} from "../../../dialogs/room-dialog/room-dialog.component";

@Injectable({
    providedIn: 'root'
})
export class RoomService implements ItemService<Room> {

    constructor() {
    }

    getItemDialog(): any {
        return RoomDialog;
    }

    getTableHeader(): any[] {
        return Room.getTableColumns();
    }

    getAllItems(): Room[] {
        return [{id: '3W05', capacity: 45, computersAvailable: false} as Room]
    }
    createSingeItem(): Room {
        throw new Error('Method not implemented.');
    }
    updateSingeItem(): Room {
        throw new Error('Method not implemented.');
    }
    deleteSingleItem(): boolean {
        throw new Error('Method not implemented.');
    }
    deleteMultipleItem(): boolean {
        throw new Error('Method not implemented.');
    }
}


