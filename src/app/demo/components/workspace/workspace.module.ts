import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkspaceComponent } from './workspace.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import {NgModule} from "@angular/core";
import {EditorModule} from "primeng/editor";
import {RippleModule} from "primeng/ripple";
import {InputTextareaModule} from "primeng/inputtextarea";
import { DialogModule } from 'primeng/dialog';




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
        WorkspaceRoutingModule,
        EditorModule,
        RippleModule,
        InputTextareaModule,
        DialogModule
    ],
    declarations: [WorkspaceComponent]
})
export class WorkspaceModule { }

