import { NgModule } from '@angular/core';
import {EditorComponent} from "./editor.component";
import {EditorsRoutingModule} from "./editor-routing.module";
import {FullCalendarModule} from "@fullcalendar/angular";
import {NgForOf} from "@angular/common";
@NgModule({
    imports: [
        EditorsRoutingModule,
        FullCalendarModule,
        NgForOf
    ],
    declarations: [EditorComponent]
})
export class EditorModule { }
