import {AfterViewInit, Component, signal, ViewChild, WritableSignal} from '@angular/core';
import {FullCalendarComponent, FullCalendarModule} from "@fullcalendar/angular";
import {Subscription} from "rxjs";
import {CalendarOptions} from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import {LayoutService} from "../../../../layout/service/app.layout.service";

@Component({
  selector: 'app-editor-calendar',
  templateUrl: './editor-calendar.component.html',
})
export class EditorCalendarComponent implements AfterViewInit{
    @ViewChild("cal") calendar!: FullCalendarComponent;
    menuToggleSub!: Subscription;

    protected calendarOptions: WritableSignal<CalendarOptions> = signal({
        plugins: [
            interactionPlugin,
            dayGridPlugin,
            timeGridPlugin,
        ],
        headerToolbar: {
            left: '',
            center: '',
            right: ''
        },
        initialView: 'timeGridWeek',
        weekends: false,
        editable: false,
        selectable: false,
        selectMirror: true,
        dayMaxEvents: true,
        allDaySlot: false,
        dragScroll: true,
        height: '70vh',
        eventBackgroundColor: '#666666',
        eventBorderColor: '#050505',
        eventTextColor: 'var(--sys-color-primary-white)',
        slotMinTime: '08:00:00',
        slotMaxTime: '22:00:00',
        slotDuration: '00:15:00',
        slotLabelInterval: '00:30:00',
        dayHeaderFormat: {weekday: 'long'},
        eventOverlap: true,
        slotEventOverlap: true,
        nowIndicator: false,
        //drop: this.drop.bind(this),
        //eventReceive: this.eventReceive.bind(this),
        //eventChange: this.eventChange.bind(this),
        //eventDidMount: this.eventDidMount.bind(this),
        //eventAllow: this.eventAllow.bind(this),
    });

    constructor(
        private layoutService: LayoutService
    ) {}

    protected updateCalendarSize(){
        this.calendar.getApi().updateSize();
    }

    ngAfterViewInit(): void {
        this.menuToggleSub = this.layoutService.updateSize$
            .asObservable().subscribe(() => {
                this.updateCalendarSize();
            });
    }
}
