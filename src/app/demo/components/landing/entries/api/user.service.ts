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
        const newUrl = `${UserService.userApiPath}/${updatedUser.id}`;
        return firstValueFrom(this.http.put<Userx>(newUrl, updatedUser));
    }

    public deleteSingleItem(user: Userx): Promise<any> {
        const newUrl = `${UserService.userApiPath}/${user.id}`;
        return firstValueFrom(this.http.delete(newUrl));
    }

    public deleteMultipleItem(users: Userx[]): Promise<any> {
        //TODO implement logic to add the list of users to the header
        return firstValueFrom(this.http.delete(UserService.userApiPath));
    }
}
