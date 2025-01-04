import {Injectable} from '@angular/core';
import {ItemService} from "../../../../../../assets/models/interfaces/ItemServiceInterface";
import {Room} from "../../../../../../assets/models/room";
import {RoomDialog} from "../../../dialogs/room-dialog/room-dialog.component";
import {delay, firstValueFrom, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RoomService implements ItemService<Room> {
    static roomsApiPath = `${environment.baseUrl}/api/rooms`;

    constructor(
        private http: HttpClient,
    ) {
    }

    public getItemDialog(): any {
        return RoomDialog;
    }

    public getTableHeader(): any[] {
        return Room.getTableColumns();
    }

    public getAllItems(): Observable<Room[]> {
        return this.http.get<Room[]>(RoomService.roomsApiPath);
    }

    public async createSingeItem(newRoom: Room): Promise<Room> {
       return firstValueFrom(this.http.post<Room>(RoomService.roomsApiPath, newRoom));
    }

    public updateSingeItem(): Room {
        throw new Error('Method not implemented.');
    }

    public deleteSingleItem(): boolean {
        throw new Error('Method not implemented.');
    }

    public deleteMultipleItem(): boolean {
        throw new Error('Method not implemented.');
    }
}


