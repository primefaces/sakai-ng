import { Injectable } from '@angular/core';
import {firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Course} from "../../../../../assets/models/course";
import {CourseSession} from "../../../../../assets/models/dto/course-session-dto";

@Injectable({
  providedIn: 'root'
})
export class EditorRequestService {
  constructor(
      private http: HttpClient
  ) { }

    public async getUnassignedCourses(tableID: number):Promise<Course[]>{
        let newUrl = `/proxy/api/global/courses/${tableID}`;
        return firstValueFrom(this.http.get<Course[]>(newUrl));
    }

    public async getNewSession(tableID: number, newCourse: Course): Promise<CourseSession> {
        const newUrl = `/proxy/api/global/add-courses-to-timetable/${tableID}`;
        //TODO fix request due to a current 500 error
        return firstValueFrom(this.http.post<CourseSession>(newUrl, newCourse));
    }
}
