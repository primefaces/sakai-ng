import { NgModule } from '@angular/core';
import {EditorComponent} from "./editor.component";
import {EditorsRoutingModule} from "./editor-routing.module";
import {FullCalendarModule} from "@fullcalendar/angular";
import {AsyncPipe, NgForOf} from "@angular/common";
import {ToolbarModule} from "primeng/toolbar";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {EditorSelectionComponent} from "./editor-selection/editor-selection.component";
import {EditorHeaderComponent} from "./editor-header/editor-header.component";
import {EditorCalendarComponent} from "./editor-calendar/editor-calendar.component";
import {ConfirmationService, SharedModule} from "primeng/api";
import {ContextMenuModule} from "primeng/contextmenu";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {CalendarEventPipe} from "../dashboard/api/calendar-event.pipe";
import {EventFilterPipe} from "./api/event-filter.pipe";
import {RoomFilterPipe} from "./api/room-filter.pipe";
import {TimingToEventPipe} from "./api/timing-to-event.pipe";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
    imports: [
        EditorsRoutingModule,
        FullCalendarModule,
        NgForOf,
        ToolbarModule,
        DropdownModule,
        FormsModule,
        ButtonModule,
        SharedModule,
        ContextMenuModule,
        ConfirmDialogModule,
        CalendarEventPipe,
        EventFilterPipe,
        RoomFilterPipe,
        TimingToEventPipe,
        InputSwitchModule,
        AsyncPipe,
        InputTextModule,
    ],
    declarations: [EditorComponent, EditorSelectionComponent, EditorHeaderComponent, EditorCalendarComponent],
    providers: [ConfirmationService]
})
export class EditorModule { }
