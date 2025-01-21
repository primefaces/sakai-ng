import { Injectable } from '@angular/core';
import {EventMountArg} from "@fullcalendar/core";
import {DialogService} from "primeng/dynamicdialog";
import {CourseSession} from "../../../../../assets/models/dto/course-session-dto";
import {CourseAddDialog} from "../../dialogs/course-add-dialog/course-add-dialog.component";
import {BehaviorSubject} from "rxjs";
import {Timing} from "../../../../../assets/models/timing";
import {Assignment} from "../editor-calendar/editor-calendar.component";

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

    public changeAssignment(courseTitle: string, assign: boolean, assignment?:Assignment){
        this._courseSessions.next(
            this.courseSessions.map(
                (session: CourseSession, idx:number) => {
                    if(session.name === courseTitle)
                        return assign ? this.assignData(idx, assignment): this.unassignData(idx)

                    return session
                }
            ))
    }

    private assignData(idx: number, assignment: Assignment):CourseSession{
        const session = this.courseSessions.at(idx);
        session.roomTable = assignment.roomTable;
        session.assigned = true;
        session.timing = new Timing();
        session!.timing!.startTime = this.convertLocalDateToString(assignment.start);
        session!.timing!.endTime = this.convertLocalDateToString(assignment.end);
        session!.timing!.day = this.weekNumberToDay(assignment.start.getDay() || 1);
        return session
    }

    private unassignData(idx: number):CourseSession{
        const session = this.courseSessions.at(idx);
        session.timing = null;
        session.roomTable = null;
        session.assigned = false;
        session.fixed = false;
        return session
    }

    public deleteCourse(el: EventMountArg){
        const idx = this.getSessionIndex(el.event.title);
        if (idx > -1) {
            this.courseSessions.splice(idx, 1);
            el.event.remove();
        }
    }

    public addGroup(el: EventMountArg, groupsToAdd: number){
        //TODO implement methods to add N Groups
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

    convertLocalDateToString(date: Date):string{
        const hours: number = date.getHours();
        const minutes: number = date.getMinutes();
        const seconds: number = date.getSeconds();

        const formattedHours: string = hours < 10 ? '0' + hours : hours.toString();
        const formattedMinutes: string = minutes < 10 ? '0' + minutes : minutes.toString();
        const formattedSeconds: string = seconds < 10 ? '0' + seconds : seconds.toString();

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    weekNumberToDay(day: number):string {
        switch (day) {
            case 0: return 'SUNDAY';
            case 1: return 'MONDAY';
            case 2: return 'TUESDAY';
            case 3: return 'WEDNESDAY';
            case 4: return 'THURSDAY';
            case 5: return 'FRIDAY';
            case 6: return 'SATURDAY';
            default: return 'ERR';
        }
    }
}
