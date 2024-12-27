import {NgModule} from "@angular/core";
import {LocationStrategy, PathLocationStrategy} from "@angular/common";
import {WizardComponent} from "./wizard.component";
import {WizardRoutingModule} from "./wizard.routing.module";
import {CourseDetailComponent} from "./course-detail/course-detail.component";
import {ItemSelectionComponent} from "./item-selection/item-selection.component";
import {RoomTimesComponent} from "./room-times/room-times.component";
import {PreWizardComponent} from "./pre-wizard/pre-wizard.component";

@NgModule({
    declarations: [
        WizardComponent, CourseDetailComponent, PreWizardComponent,
        ItemSelectionComponent, RoomTimesComponent],
    imports: [WizardRoutingModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
    ],
})
export class WizardModule {}
