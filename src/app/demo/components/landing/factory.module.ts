import { NgModule } from '@angular/core';
import { LandingRoutingModule } from './landing-routing.module';
import {GenericViewComponent} from "./entries/user-view/generic-view.component";
import {DialogService} from "primeng/dynamicdialog";
import {ButtonModule} from "primeng/button";
import {AsyncPipe, CurrencyPipe, DatePipe, NgForOf} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {MultiSelectModule} from "primeng/multiselect";
import {ProgressBarModule} from "primeng/progressbar";
import {SharedModule} from "primeng/api";
import {SliderModule} from "primeng/slider";
import {TableModule} from "primeng/table";
import {RippleModule} from "primeng/ripple";

@NgModule({
    imports: [LandingRoutingModule, ButtonModule, CurrencyPipe, DatePipe, DropdownModule, InputTextModule, MultiSelectModule, ProgressBarModule, SharedModule, SliderModule, TableModule, NgForOf, AsyncPipe, RippleModule,],
    declarations: [GenericViewComponent],
    providers: [DialogService]
})
export class FactoryModule {

}
