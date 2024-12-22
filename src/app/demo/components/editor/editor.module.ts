import { NgModule } from '@angular/core';
import {EditorComponent} from "./editor.component";
import {EditorsRoutingModule} from "./editor-routing.module";
import {FullCalendarModule} from "@fullcalendar/angular";
import {NgForOf} from "@angular/common";
import {ToolbarModule} from "primeng/toolbar";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {EditorSelectionComponent} from "./editor-selection/editor-selection.component";
import {EditorHeaderComponent} from "./editor-header/editor-header.component";
import {EditorCalendarComponent} from "./editor-calendar/editor-calendar.component";
import {SharedModule} from "primeng/api";
import {ContextMenuModule} from "primeng/contextmenu";

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
    ],
    declarations: [EditorComponent, EditorSelectionComponent, EditorHeaderComponent, EditorCalendarComponent],
})
export class EditorModule { }
