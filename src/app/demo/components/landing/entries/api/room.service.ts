import {Injectable, Type} from '@angular/core';
import {ItemService} from "../../../../../../assets/models/interfaces/ItemServiceInterface";
import {Room} from "../../../../../../assets/models/room";

@Injectable({
    providedIn: 'root'
})
export class RoomService implements ItemService<Room> {

    constructor() {
    }

    getItemDialog(): Type<Room> {
        throw new Error('Method not implemented.');
    }

    getTableHeader(): any[] {
        return Room.getTableColumns();
    }

    getAllItems(): Room[] {
        throw new Error('Method not implemented.');
    }
    createSingeItem(): Room {
        throw new Error('Method not implemented.');
    }
    updateSingeItem(): Room {
        throw new Error('Method not implemented.');
    }
    deleteSingleItem(): void {
        throw new Error('Method not implemented.');
    }
    deleteMultipleItem(): void {
        throw new Error('Method not implemented.');
    }
}


