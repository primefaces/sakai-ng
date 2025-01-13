import { Injectable } from '@angular/core';
import {CourseSession} from "../../../../../assets/models/dto/course-session-dto";
import {EventMountArg} from "@fullcalendar/core";
import {DialogService} from "primeng/dynamicdialog";
import {CourseAddDialog} from "../../dialogs/course-add-dialog/course-add-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class CourseHandlerService {
    private _courseSessions: CourseSession[] = [];
    private _tableID: number | null = null;

    constructor(
        private dialogService: DialogService,
    ) {}

    findSessionsByName(sessionId: string):CourseSession {
        return this.courseSessions.find(s => s.name === sessionId);
    }

    getSessionIndex(sessionId: string): number{
        return this.courseSessions.findIndex(s => s.name === sessionId);
    }

    public addNewSession(){
        this.dialogService.open(CourseAddDialog, {
            width: '50rem', height: '650px',
            position: 'center',
            baseZIndex: 10000,
            modal: false,
            draggable: true,
            showHeader: false,
            data: {'tableID': this.tableID}
        })
    }

    public fixSession(el: EventMountArg){
        const session: CourseSession = this.findSessionsByName(el.event.title);
        if(session){
            el.event.setProp('editable', session.fixed);
            session.fixed = !session.fixed

            const newColor = session.fixed ? '#7a4444' : '#666666';
            el.event.setProp('backgroundColor', newColor);
        }
    }

    public unassignCourse(el: EventMountArg){

    }

    public deleteCourse(el: EventMountArg){
        const idx = this.getSessionIndex(el.event.title);
        if (idx > -1) {
            this.courseSessions.splice(idx, 1);
            el.event.remove();
        }
    }

    public addGroup(el: EventMountArg, groupsToAdd: number){

    }

    get courseSessions(): CourseSession[] {
        return this._courseSessions;
    }

    set courseSessions(value: CourseSession[]) {
        this._courseSessions = value;
    }

    get tableID(): number | null {
        return this._tableID;
    }

    set tableID(value: number | null) {
        this._tableID = value;
    }
}
