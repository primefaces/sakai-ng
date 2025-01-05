import {Injectable} from '@angular/core';
import {ItemService} from "../../../../../../assets/models/interfaces/ItemServiceInterface";
import {Room} from "../../../../../../assets/models/room";
import {RoomDialog} from "../../../dialogs/room-dialog/room-dialog.component";
import {firstValueFrom, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RoomService implements ItemService<Room> {
    static roomApiPath = `${environment.baseUrl}/api/rooms`;

    constructor(
        private http: HttpClient,
    ) {
    }

    public getItemDialog(): any {
        return RoomDialog;
    }

    public getGlobalFilterFields(): string[] {
        return Room.getFilterFields();
    }

    public getTableHeader(): any[] {
        return Room.getTableColumns();
    }

    public getAllItems(): Observable<Room[]> {
        return this.http.get<Room[]>(RoomService.roomApiPath);
    }

    public async createSingeItem(newRoom: Room): Promise<Room> {
       return firstValueFrom(this.http.post<Room>(RoomService.roomApiPath, newRoom));
    }

    public async updateSingeItem(updatedRoom: Room): Promise<Room> {
        let newUrl = `${RoomService.roomApiPath}/${updatedRoom.id}`;
        return firstValueFrom(this.http.put<Room>(newUrl, updatedRoom));
    }

    public deleteSingleItem(room: Room): Promise<any> {
        const newUrl = `${RoomService.roomApiPath}/${room.id}`;
        return firstValueFrom(this.http.delete(newUrl));
    }

    public deleteMultipleItem(rooms: Room[]): Promise<any> {
        return firstValueFrom(this.http.delete(RoomService.roomApiPath));
    }
}


