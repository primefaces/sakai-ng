import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PreWizardComponent} from "./pre-wizard/pre-wizard.component";
import {WizardComponent} from "./wizard.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: 'pre-selection', component: PreWizardComponent},
            {
                path: '', component: WizardComponent,
                children: [
                    { path: 'selection', loadChildren: () => import('../wizard/item-selection/item-selection.component').then(m => m.ItemSelectionComponent) },
                    { path: 'detail', loadChildren: () => import('../wizard/course-detail/course-detail.component').then(m => m.CourseDetailComponent) },
                    { path: 'times', loadChildren: () => import('../wizard/room-times/room-times.component').then(m => m.RoomTimesComponent) }
                ]
            },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class WizardRoutingModule {
}
