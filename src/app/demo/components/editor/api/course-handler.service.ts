import { Injectable } from '@angular/core';
import {CourseSession} from "../../../../../assets/models/dto/course-session-dto";

@Injectable({
  providedIn: 'root'
})
export class CourseHandlerService {
    private _courseSessions: CourseSession[] = [];

    constructor() {}

    findSessionsByName(sessionId: string):CourseSession {
        return this.courseSessions.find(s => s.name === sessionId);
    }

    get courseSessions(): CourseSession[] {
        return this._courseSessions;
    }

    set courseSessions(value: CourseSession[]) {
        this._courseSessions = value;
    }
}
