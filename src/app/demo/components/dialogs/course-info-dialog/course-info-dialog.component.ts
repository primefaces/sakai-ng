import {Component, OnDestroy} from '@angular/core';
import {ChipModule} from "primeng/chip";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MultiSelectModule} from "primeng/multiselect";
import {EventClickArg} from "@fullcalendar/core";
import {EventImpl} from "@fullcalendar/core/internal";
import {FullCalendarComponent} from "@fullcalendar/angular";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'app-user-dialog',
  standalone: true,
    imports: [
        ChipModule,
        ButtonModule,
        RippleModule,
        DropdownModule,
        InputTextModule,
        FormsModule,
        MultiSelectModule,
        TooltipModule
    ],
  templateUrl: './course-info.component.html'
})
export class CourseInfoDialog implements OnDestroy{
    protected hoverEventInfo: EventClickArg | null = null;
    private tmpPartners : EventImpl[] = [];
    private calendar: FullCalendarComponent;

    constructor(
        public config: DynamicDialogConfig,
        public ref: DynamicDialogRef
    ) {
        this.initData();
        this.initColoring();
    }

    private initData():void {
        this.hoverEventInfo = this.config.data['event'];
        this.calendar = this.config.data['calendar'];
    }

    private initColoring() {
        this.tmpPartners = this.colorPartnerEvents(this.hoverEventInfo.event, '#ad7353');
        this.hoverEventInfo.event.setProp("backgroundColor", 'var(--sys-color-primary-red)');
    }

    colorPartnerEvents(event: EventImpl, color: string): EventImpl[]{
        const key = event.extendedProps['groupId'];
        const partner = this.calendar.getApi().getEvents().filter(e => e.extendedProps['groupId'] == key);

        partner.forEach(e => e.setProp('backgroundColor', color));
        return partner;
    }

    closeDialog(){
        if (this.ref) this.ref.close();
    }

    ngOnDestroy(): void {
        if (this.hoverEventInfo) this.hoverEventInfo.event.setProp("backgroundColor", '#666666');
        this.tmpPartners.forEach(e => e.setProp('backgroundColor', '#666666'));

        this.hoverEventInfo = null;
        this.tmpPartners = [];

        this.closeDialog();
    }
}
