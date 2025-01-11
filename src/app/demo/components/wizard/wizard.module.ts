import {NgModule} from "@angular/core";
import {WizardComponent} from "./wizard.component";
import {WizardRoutingModule} from "./wizard.routing.module";
import {CourseDetailComponent} from "./course-detail/course-detail.component";
import {ItemSelectionComponent} from "./item-selection/item-selection.component";
import {RoomTimesComponent} from "./room-times/room-times.component";
import {PreWizardComponent} from "./pre-wizard/pre-wizard.component";
import {FullCalendarModule} from "@fullcalendar/angular";
import {NgClass, NgForOf} from "@angular/common";
import {Button, ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {StepperModule} from "primeng/stepper";

@NgModule({
    declarations: [
        WizardComponent, CourseDetailComponent, PreWizardComponent,
        ItemSelectionComponent, RoomTimesComponent],
    imports: [WizardRoutingModule, FullCalendarModule, NgForOf, NgClass, ButtonDirective, Ripple, StepperModule, Button],
})
export class WizardModule {}
