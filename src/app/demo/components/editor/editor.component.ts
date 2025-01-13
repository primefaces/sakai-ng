import { EditorCalendarComponent } from "./editor-calendar/editor-calendar.component";
import { LayoutService } from "../../../layout/service/app.layout.service";
import { TimeTable } from "../../../../assets/models/dto/time-table";
import { CourseHandlerService } from "./api/course-handler.service";
import { RoomTable } from "../../../../assets/models/room-table";
import { Component, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { ContextMenu } from "primeng/contextmenu";

@Component({
  templateUrl: './editor.component.html',
})
export class EditorComponent{
    @ViewChild('cm') contextMenu!: ContextMenu;
    @ViewChild('cd') calendar: EditorCalendarComponent;

    timeTable!: TimeTable;
    protected selectedRoom: BehaviorSubject<RoomTable>;
    protected selectedRoom$: Observable<RoomTable>;
    private _dirtyData: boolean = false;

    constructor(
        private layoutService: LayoutService,
        private courseHandlerService: CourseHandlerService,
    ) {
        this.layoutService.changeStyle(false);
        this.timeTable = EditorComponent.getTimeTable();
        this.courseHandlerService.courseSessions = this.timeTable.courseSessions; //copy sessions instead

        this.selectedRoom = new BehaviorSubject<RoomTable>(this.timeTable.roomTables[0]);
        this.selectedRoom$ = this.selectedRoom.asObservable();
    }

    private static getTimeTable() {
        return JSON.parse(localStorage.getItem('current-table'));
    }

    protected setNewRoom(newRoom: RoomTable){
        this.selectedRoom.next(newRoom);
    }

    protected setDirtyDataBit(bit: boolean){
        this._dirtyData = bit;
    }

    protected saveData(){
        this._dirtyData = false;
    }

    canDeactivate(){
        return this._dirtyData;
    }
}
