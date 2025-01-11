import {Component, ViewChild} from '@angular/core';
import {LayoutService} from "../../../layout/service/app.layout.service";
import {ContextMenu} from "primeng/contextmenu";
import {TimeTable} from "../../../../assets/models/dto/time-table";
import {EditorCalendarComponent} from "./editor-calendar/editor-calendar.component";
import {EditorSelectionComponent} from "./editor-selection/editor-selection.component";
import {RoomTable} from "../../../../assets/models/room-table";
import {BehaviorSubject, Observable} from "rxjs";
import {CourseSession} from "../../../../assets/models/dto/course-session-dto";

@Component({
  templateUrl: './editor.component.html',
})
export class EditorComponent{
    @ViewChild('cm') contextMenu!: ContextMenu;
    @ViewChild('cd') calendar: EditorCalendarComponent;
    @ViewChild('st') selection: EditorSelectionComponent;

    timeTable!: TimeTable;
    protected selectedRoom: BehaviorSubject<RoomTable>;
    protected selectedRoom$: Observable<RoomTable>;
    private _dirtyData: boolean = false;

    constructor(
        private layoutService: LayoutService,
    ) {
        this.layoutService.changeStyle(false);
        this.timeTable = EditorComponent.getTimeTable();
        this.selectedRoom = new BehaviorSubject<RoomTable>(this.timeTable.roomTables[0]);
        this.selectedRoom$ = this.selectedRoom.asObservable();
    }

    private static getTimeTable() {
        return JSON.parse(localStorage.getItem('current-table'));
    }

    protected getSpecificSession(callback: string):CourseSession{
        return this.timeTable.courseSessions.find(s => s.name === callback);
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
