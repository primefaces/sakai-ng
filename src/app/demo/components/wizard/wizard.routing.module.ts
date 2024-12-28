import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PreWizardComponent} from "./pre-wizard/pre-wizard.component";
import {WizardComponent} from "./wizard.component";
import {ItemSelectionComponent} from "./item-selection/item-selection.component";
import {CourseDetailComponent} from "./course-detail/course-detail.component";
import {RoomTimesComponent} from "./room-times/room-times.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: WizardComponent,
                children: [
                    { path: 'selection', component: ItemSelectionComponent },
                    { path: 'detail', component: CourseDetailComponent },
                    { path: 'times', component: RoomTimesComponent }
                ]
            },
            {path: 'pre-selection', component: PreWizardComponent},
        ],)
    ],
    exports: [RouterModule]
})
export class WizardRoutingModule {
}
