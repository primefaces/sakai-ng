import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import {FullCalendarModule} from "@fullcalendar/angular";
import {DashboardHeaderComponent} from "./dashboard-header/dashboard-header.component";
import {DropdownModule} from "primeng/dropdown";
import {ToolbarModule} from "primeng/toolbar";
import {CalendarEventPipe} from "./api/calendar-event.pipe";
import {CalendarContextMenuComponent} from "./calendar-context-menu/calendar-context-menu.component";
import {ContextMenuModule} from "primeng/contextmenu";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        DashboardsRoutingModule,
        FullCalendarModule,
        DropdownModule,
        ToolbarModule,
        CalendarEventPipe,
        ContextMenuModule
    ],
    declarations: [
        DashboardComponent,
        DashboardHeaderComponent,
        CalendarContextMenuComponent,
    ]
})
export class DashboardModule { }
