import { Injectable } from '@angular/core';
import {EventMountArg} from "@fullcalendar/core";
import {DialogService} from "primeng/dynamicdialog";
import {CourseSession} from "../../../../../assets/models/dto/course-session-dto";
import {CourseAddDialog} from "../../dialogs/course-add-dialog/course-add-dialog.component";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourseHandlerService {
    private _courseSessions: BehaviorSubject<CourseSession[]> = new BehaviorSubject<CourseSession[]>([]);
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
        const ref = this.dialogService.open(CourseAddDialog, {
            width: '50rem', height: '650px',
            position: 'center',
            baseZIndex: 10000,
            modal: true,
            draggable: true,
            showHeader: false,
            data: {'tableID': this.tableID}
        })

        ref.onClose.subscribe((result) => {
            if (result) this.addSessions(result);
        });
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
        const title = el.event.title;
        const session = this._courseSessions.value.find(s => s.name == title);
        if(session) {
            session.timing = null;
            session.roomTable = null;
            session.assigned = false;
        }
        console.log(session);
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
        return this._courseSessions.value;
    }

    set courseSessions(value: BehaviorSubject<CourseSession[]>) {
        this._courseSessions = value;
    }

    private addSessions(newSessions: CourseSession[]){
        this._courseSessions.next(this.courseSessions.concat(newSessions));
    }

    get tableID(): number | null {
        return this._tableID;
    }

    set tableID(value: number | null) {
        this._tableID = value;
    }
}
