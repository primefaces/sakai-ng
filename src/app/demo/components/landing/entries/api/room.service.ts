import {Injectable} from '@angular/core';
import {ItemService} from "../../../../../../assets/models/interfaces/ItemServiceInterface";
import {Room} from "../../../../../../assets/models/room";
import {RoomDialog} from "../../../dialogs/room-dialog/room-dialog.component";
import {delay, Observable, of} from "rxjs";

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

    getAllItems(): Observable<Room[]> {
        const rooms: Room[] = [
            { id: '3W05', capacity: 45, computersAvailable: false },
            { id: '3W06', capacity: 50, computersAvailable: true },
            { id: '3W07', capacity: 30, computersAvailable: false },
            { id: '3W08', capacity: 60, computersAvailable: true },
            { id: '3W09', capacity: 25, computersAvailable: false },
        ];

        // Simulate a 2-second delay
        return of(rooms).pipe(delay(2000));
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


