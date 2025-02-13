import { Injectable } from '@angular/core';
import {firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Course} from "../../../../../assets/models/course";
import {CourseSession} from "../../../../../assets/models/dto/course-session-dto";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EditorRequestService {
    static API_PATH = `${environment.baseUrl}/api/global`;

    constructor(
      private http: HttpClient
  ) { }

    public async getUnassignedCourses(tableID: number):Promise<Course[]>{
        let newUrl = `${EditorRequestService.API_PATH}/courses/${tableID}`;
        return firstValueFrom(this.http.get<Course[]>(newUrl));
    }

    public async getNewSession(tableID: number, newCourse: Course): Promise<CourseSession[]> {
        const newUrl = `${EditorRequestService.API_PATH}/add-courses-to-timetable/${tableID}`;
        return firstValueFrom(this.http.post<CourseSession[]>(newUrl, [newCourse]));
    }

    public pushSessionChanges(tableID : number, changedSessions: CourseSession[]) {
        const newUrl = `${EditorRequestService.API_PATH}/update-course-sessions/${tableID}`;
        return this.http.put<CourseSession[]>(newUrl, changedSessions);
    }
}
