import {Component, ViewChild} from '@angular/core';
import {LayoutService} from "../../../layout/service/app.layout.service";
import {ContextMenu} from "primeng/contextmenu";
import {MenuItem} from "primeng/api";
import {EventMountArg} from "@fullcalendar/core";
import {TimeTable} from "../../../../assets/models/dto/time-table";
import {CourseSession} from "../../../../assets/models/dto/course-session-dto";
import {TableShareService} from "../share services/table-share.service";
import {EditorCalendarComponent} from "./editor-calendar/editor-calendar.component";
import {EditorSelectionComponent} from "./editor-selection/editor-selection.component";
import {RoomTable} from "../../../../assets/models/room-table";

@Component({
  templateUrl: './editor.component.html',
})
export class EditorComponent{
    @ViewChild('cm') contextMenu!: ContextMenu;
    @ViewChild('cd') calendar: EditorCalendarComponent;
    @ViewChild('st') selection: EditorSelectionComponent;

    timeTable!: TimeTable;
    items: MenuItem[] = [];
    rightClickEvent: EventMountArg | null = null;
    protected selectedRoom: RoomTable;
    private _dirtyData: boolean = false;

    constructor(
        private layoutService: LayoutService,
        private shareService: TableShareService
    ) {
        this.layoutService.changeStyle(false);
        this.timeTable = this.shareService.sharedTable;
        this.selectedRoom = this.timeTable.roomTables.find(r => r.roomId == 'HS F');
    }

    getItemMenuOptions() : void {
        this.items = [{label: 'add new Course', icon: 'pi pi-book', command: () => {} /* this.addNewCourse()*/ }];
        if(!this.rightClickEvent?.event.id){
            return;
        }

        const session = this.findSession()
        this.items.push(
            { label: session!.fixed ? 'free Course' : 'fix Course', icon: session!.fixed ? 'pi pi-unlock':'pi pi-lock', command: () => { /*this.changeSessionBlockState()*/ }},
            { label: 'unassign Course', icon: 'pi pi-reply', command: () => { /*this.unassignCourse()*/ } },
            { label: 'remove Group', icon: 'pi pi-delete-left', command: ()=> { /*this.deleteCourse()*/ } }
        )

        const tmp = session!.name.slice(0, 2);
        this.items.push((tmp == 'PS' || tmp == 'SL') ?
            { label: 'add Group', icon: 'pi pi-plus-circle', command: ()=> { /*this.addCourseWithPsCharacter()*/ } }
            : { label: 'split Course', icon: 'pi pi-arrow-up-right-and-arrow-down-left-from-center', disabled: true }
        )
    }

    private findSession():CourseSession  | undefined{
        return this.timeTable.courseSessions.find(s => s.id.toString() === this.rightClickEvent!.event.id.toString());
    }

    protected setDirtyDataBit(bit: boolean){
        this._dirtyData = bit;
    }

    protected saveData(){
        this._dirtyData = false;
    }

    protected setNewRoom(newID: number){
        this.calendar.selectedRoom = this.timeTable.roomTables.find(r => r.id = newID);
    }

    canDeactivate(){
        return this._dirtyData;
    }
}
