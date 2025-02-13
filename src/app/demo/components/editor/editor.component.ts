import { EditorCalendarComponent } from "./editor-calendar/editor-calendar.component";
import { LayoutService } from "../../../layout/service/app.layout.service";
import { TimeTable } from "../../../../assets/models/dto/time-table";
import { CourseHandlerService } from "./api/course-handler.service";
import { RoomTable } from "../../../../assets/models/room-table";
import {Component, ViewChild} from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { ContextMenu } from "primeng/contextmenu";
import {EditorRequestService} from "./api/editor-request.service";
import {CourseSession} from "../../../../assets/models/dto/course-session-dto";

@Component({
  templateUrl: './editor.component.html',
})
export class EditorComponent{
    @ViewChild('cm') contextMenu!: ContextMenu;
    @ViewChild('cd') calendar: EditorCalendarComponent;

    timeTable!: TimeTable;
    private readonly courseSessions: BehaviorSubject<CourseSession[]>;
    protected sessions$: Observable<CourseSession[]>;

    protected selectedRoom: BehaviorSubject<RoomTable>;
    protected selectedRoom$: Observable<RoomTable>;
    private _dirtyData: boolean = false;

    constructor(
        private layoutService: LayoutService,
        private courseHandlerService: CourseHandlerService,
        private editorRequest: EditorRequestService
    ) {
        this.layoutService.changeStyle(false);
        this.timeTable = EditorComponent.getTimeTable();

        this.courseSessions = new BehaviorSubject<CourseSession[]>(this.timeTable.courseSessions);
        this.courseHandlerService.courseSessions = this.courseSessions;
        this.sessions$ = this.courseSessions.asObservable();
        this.courseHandlerService.tableID = this.timeTable.id;

        this.selectedRoom = new BehaviorSubject<RoomTable>(this.timeTable.roomTables[0]);
        this.selectedRoom$ = this.selectedRoom.asObservable();
    }

    private static getTimeTable() {
        return JSON.parse(localStorage.getItem('current-table'));
    }

    async saveChanges(){
        this._dirtyData = false;
        this.editorRequest.pushSessionChanges(this.timeTable.id, this.courseHandlerService.courseSessions).subscribe();
        //TODO show updated array on home page
    }

    protected setNewRoom(newRoom: RoomTable){
        this.selectedRoom.next(newRoom);
    }

    protected setDirtyDataBit(bit: boolean){
        this._dirtyData = bit;
    }

    canDeactivate(){
        return this._dirtyData;
    }
}
