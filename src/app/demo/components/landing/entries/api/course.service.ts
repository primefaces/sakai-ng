import {Injectable} from '@angular/core';
import {ItemService} from "../../../../../../assets/models/interfaces/ItemServiceInterface";
import {Course} from "../../../../../../assets/models/course";
import {CourseDialog} from "../../../dialogs/course-dialog/course-dialog.component";
import {firstValueFrom, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CourseService implements ItemService<Course> {
    static courseApiPath = `${environment.baseUrl}/api/courses`;

    constructor(
        private http: HttpClient,
    ) {
    }

    public getItemDialog(): any {
        return CourseDialog;
    }

    public getGlobalFilterFields(): string[] {
        return Course.getFilterFields();
    }

    public getTableHeader(): any[] {
        return Course.getTableColumns();
    }

    public getAllItems(): Observable<Course[]> {
        return this.http.get<Course[]>(CourseService.courseApiPath);
    }

    public async createSingeItem(newCourse: Course): Promise<Course> {
        return firstValueFrom(this.http.post<Course>(CourseService.courseApiPath, newCourse));
    }

    public async updateSingeItem(updatedCourse: Course): Promise<Course> {
        let newUrl = `${CourseService.courseApiPath}/${updatedCourse.id}`;
        return firstValueFrom(this.http.put<Course>(newUrl, updatedCourse));
    }

    public deleteSingleItem(item: Course): boolean {
        return true;
    }

    public deleteMultipleItem(items: Course[]): boolean {
        return true;
    }
}
