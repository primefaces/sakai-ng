import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {EditorComponent} from "./editor.component";
import {AuthGuardEditorClose} from "../../guards/close-guards";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EditorComponent, canDeactivate:[AuthGuardEditorClose]}
    ])],
    exports: [RouterModule]
})
export class EditorsRoutingModule { }
