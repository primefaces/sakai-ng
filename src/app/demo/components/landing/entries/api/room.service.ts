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
    static roomsApiPath = `${environment.baseUrl}/api/rooms`;

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
        return this.http.get<Room[]>(RoomService.roomsApiPath);
    }

    public async createSingeItem(newRoom: Room): Promise<Room> {
       return firstValueFrom(this.http.post<Room>(RoomService.roomsApiPath, newRoom));
    }

    public async updateSingeItem(updatedRoom: Room): Promise<Room> {
        let newUrl = `${RoomService.roomsApiPath}/${updatedRoom.id}`;
        return firstValueFrom(this.http.put<Room>(newUrl, updatedRoom));
    }

    public deleteSingleItem(): boolean {
        throw new Error('Method not implemented.');
    }

    public deleteMultipleItem(): boolean {
        throw new Error('Method not implemented.');
    }
}


