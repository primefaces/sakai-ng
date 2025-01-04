import {Injectable} from '@angular/core';
import { ItemService } from 'src/assets/models/interfaces/ItemServiceInterface';
import {Userx} from "../../../../../../assets/models/userx";
import {UserDialog} from "../../../dialogs/user-dialog/user-dialog.component";
import {firstValueFrom, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService implements ItemService<Userx> {
    static userApiPath = `${environment.baseUrl}/api/users`;

    constructor(
        private http: HttpClient,
    ) {
    }

    public getItemDialog(): any {
        return UserDialog;
    }

    public getGlobalFilterFields(): string[] {
        return Userx.getFilterFields();
    }

    public getTableHeader(): any[] {
        return Userx.getTableColumns();
    }

    public getAllItems(): Observable<Userx[]> {
        return this.http.get<Userx[]>(UserService.userApiPath);
    }

    public async createSingeItem(newUser: Userx): Promise<Userx> {
        return firstValueFrom(this.http.post<Userx>(UserService.userApiPath, newUser));
    }

    public updateSingeItem(updatedUser: Userx): Promise<Userx> {
        let newUrl = `${UserService.userApiPath}/${updatedUser.id}`;
        return firstValueFrom(this.http.put<Userx>(newUrl, updatedUser));
    }

    public deleteSingleItem(): boolean {
        return true;
    }

    public deleteMultipleItem(): boolean {
        return true;
    }
}
